/**
 * Google OAuth Initiation
 * Redirects user to Google consent screen
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const clientId = process.env.GOOGLE_CLIENT_ID
  const redirectUri = `${process.env.APP_URL}/api/auth/oauth/google/callback`

  if (!clientId) {
    throw createError({
      statusCode: 500,
      message: 'Google OAuth not configured'
    })
  }

  // Generate state for CSRF protection
  const state = Buffer.from(crypto.randomUUID()).toString('base64')

  // Store state in cookie for validation
  setCookie(event, 'oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600, // 10 minutes
    path: '/'
  })

  // Build Google OAuth URL
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    state,
    prompt: 'select_account'
  })

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`

  // Redirect to Google
  return sendRedirect(event, authUrl, 302)
})
