/**
 * GitHub OAuth Initiation
 * Redirects user to GitHub authorization screen
 */
export default defineEventHandler(async (event) => {
  const clientId = process.env.GITHUB_CLIENT_ID
  const redirectUri = `${process.env.APP_URL}/api/auth/oauth/github/callback`

  if (!clientId) {
    throw createError({
      statusCode: 500,
      message: 'GitHub OAuth not configured'
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

  // Build GitHub OAuth URL
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'user:email read:user',
    state,
    allow_signup: 'true'
  })

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`

  // Redirect to GitHub
  return sendRedirect(event, authUrl, 302)
})
