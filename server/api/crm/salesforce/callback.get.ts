import { db, schema } from '~~/server/database'

/**
 * Salesforce OAuth callback
 * Handles the OAuth redirect from Salesforce
 * GET /api/crm/salesforce/callback
 */
export default defineEventHandler(async (event) => {
  try {
    // Get query parameters
    const query = getQuery(event)
    const code = query.code as string
    const state = query.state as string
    const error = query.error as string

    // Check for OAuth errors
    if (error) {
      console.error('Salesforce OAuth error:', error)
      throw createError({
        statusCode: 400,
        message: `Salesforce authorization failed: ${error}`,
      })
    }

    if (!code || !state) {
      throw createError({
        statusCode: 400,
        message: 'Missing authorization code or state',
      })
    }

    // Verify state parameter (CSRF protection)
    const storedState = getCookie(event, 'sf_oauth_state')

    if (!storedState || storedState !== state) {
      throw createError({
        statusCode: 400,
        message: 'Invalid state parameter',
      })
    }

    // Parse state to get user ID
    const stateData = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'))
    const userId = stateData.userId

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: 'Invalid state data',
      })
    }

    // Exchange authorization code for access token
    const clientId = process.env.SALESFORCE_CLIENT_ID
    const clientSecret = process.env.SALESFORCE_CLIENT_SECRET
    const redirectUri = `${process.env.APP_URL}/api/crm/salesforce/callback`

    if (!clientId || !clientSecret) {
      throw createError({
        statusCode: 500,
        message: 'Salesforce OAuth not configured',
      })
    }

    // Token exchange request
    const tokenUrl = 'https://login.salesforce.com/services/oauth2/token'
    const tokenParams = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    })

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenParams.toString(),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error('Salesforce token exchange error:', errorData)
      throw createError({
        statusCode: 500,
        message: 'Failed to exchange authorization code for access token',
      })
    }

    const tokenData = await tokenResponse.json()

    // Get user info from Salesforce
    const userInfoResponse = await fetch(tokenData.id, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userInfoResponse.ok) {
      throw createError({
        statusCode: 500,
        message: 'Failed to fetch Salesforce user info',
      })
    }

    const userInfo = await userInfoResponse.json()

    // Store connection in database
    // Note: In production, tokens should be encrypted before storage
    await db.insert(schema.crmConnections).values({
      userId,
      platform: 'salesforce',
      connectionToken: tokenData.access_token, // Should be encrypted
      refreshToken: tokenData.refresh_token, // Should be encrypted
      connectionStatus: 'connected',
      connectedUserName: userInfo.display_name || userInfo.username,
      connectedOrgName: userInfo.organization_id,
      settings: {
        instanceUrl: tokenData.instance_url,
        userId: userInfo.user_id,
        orgId: userInfo.organization_id,
      },
    })

    console.log(`Salesforce connected successfully for user ${userId}`)
    console.log(`Organization: ${userInfo.organization_id}`)

    // Clear OAuth state cookie
    deleteCookie(event, 'sf_oauth_state')

    // Redirect to success page
    // In production, redirect to frontend with success message
    return sendRedirect(event, `${process.env.APP_URL}/settings/crm?connected=salesforce`, 302)
  } catch (error: any) {
    console.error('Salesforce callback error:', error)

    // Redirect to error page
    const errorMessage = encodeURIComponent(error.message || 'Connection failed')
    return sendRedirect(
      event,
      `${process.env.APP_URL}/settings/crm?error=${errorMessage}`,
      302
    )
  }
})
