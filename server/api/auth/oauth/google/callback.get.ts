import { eq } from 'drizzle-orm'
import { db, schema } from '~~/server/database'
import { generateAccessToken, generateRefreshToken, setAuthCookies } from '~~/server/utils/auth'

/**
 * Google OAuth Callback Handler
 * Exchanges authorization code for tokens and creates/logs in user
 */
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const code = query.code as string
    const state = query.state as string
    const error = query.error as string

    // Check for OAuth errors
    if (error) {
      console.error('OAuth error:', error)
      return sendRedirect(event, '/login?error=oauth_failed', 302)
    }

    // Validate state for CSRF protection
    const savedState = getCookie(event, 'oauth_state')
    if (!state || state !== savedState) {
      console.error('OAuth state mismatch')
      return sendRedirect(event, '/login?error=invalid_state', 302)
    }

    // Clear state cookie
    deleteCookie(event, 'oauth_state')

    if (!code) {
      return sendRedirect(event, '/login?error=no_code', 302)
    }

    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const redirectUri = `${process.env.APP_URL}/api/auth/oauth/google/callback`

    if (!clientId || !clientSecret) {
      throw createError({
        statusCode: 500,
        message: 'Google OAuth not configured',
      })
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error('Token exchange failed:', errorData)
      return sendRedirect(event, '/login?error=token_exchange_failed', 302)
    }

    const tokens = await tokenResponse.json()
    const { access_token, refresh_token, expires_in } = tokens

    // Fetch user profile from Google
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!profileResponse.ok) {
      console.error('Failed to fetch Google profile')
      return sendRedirect(event, '/login?error=profile_fetch_failed', 302)
    }

    const profile = await profileResponse.json()
    const { id: googleId, email, name, picture } = profile

    // Check if user exists
    let user = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    })

    if (!user) {
      // Create new user
      const [newUser] = await db
        .insert(schema.users)
        .values({
          name,
          email,
          password: null, // OAuth users don't have passwords
          role: 'sales_rep',
          subscriptionTier: 'basic',
          avatar: picture,
        })
        .returning()

      user = newUser

      // Create initial subscription (14-day trial)
      const trialEndsAt = new Date()
      trialEndsAt.setDate(trialEndsAt.getDate() + 14)

      await db.insert(schema.subscriptions).values({
        userId: user.id,
        plan: 'basic',
        billingCycle: 'monthly',
        price: '0.00',
        status: 'trial',
        trialEndsAt,
        autoRenew: true,
      })
    }

    // Check if OAuth connection exists
    const existingConnection = await db.query.oauthConnections.findFirst({
      where: and(
        eq(schema.oauthConnections.userId, user.id),
        eq(schema.oauthConnections.provider, 'google'),
      ),
    })

    const tokenExpiry = new Date()
    tokenExpiry.setSeconds(tokenExpiry.getSeconds() + expires_in)

    if (existingConnection) {
      // Update existing connection
      await db
        .update(schema.oauthConnections)
        .set({
          accessToken: access_token,
          refreshToken: refresh_token || existingConnection.refreshToken,
          tokenExpiry,
        })
        .where(eq(schema.oauthConnections.id, existingConnection.id))
    } else {
      // Create new OAuth connection
      await db.insert(schema.oauthConnections).values({
        userId: user.id,
        provider: 'google',
        providerId: googleId,
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiry,
      })
    }

    // Update last login
    await db
      .update(schema.users)
      .set({ lastLogin: new Date() })
      .where(eq(schema.users.id, user.id))

    // Generate JWT tokens for our application
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    }

    const jwtAccessToken = generateAccessToken(tokenPayload)
    const jwtRefreshToken = generateRefreshToken(tokenPayload, false)

    // Store refresh token in database
    const refreshExpiresAt = new Date()
    refreshExpiresAt.setDate(refreshExpiresAt.getDate() + 7)

    await db.insert(schema.sessions).values({
      userId: user.id,
      refreshToken: jwtRefreshToken,
      expiresAt: refreshExpiresAt,
    })

    // Set authentication cookies
    setAuthCookies(event, jwtAccessToken, jwtRefreshToken)

    // Redirect to dashboard
    return sendRedirect(event, '/dashboard', 302)
  } catch (error: any) {
    console.error('Google OAuth callback error:', error)
    return sendRedirect(event, '/login?error=oauth_error', 302)
  }
})
