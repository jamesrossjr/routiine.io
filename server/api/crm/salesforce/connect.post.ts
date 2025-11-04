import { requireAuth } from '~~/server/utils/auth'

/**
 * Initiate Salesforce OAuth connection
 * Starts the OAuth 2.0 flow to connect to Salesforce
 * POST /api/crm/salesforce/connect
 */
export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Salesforce OAuth configuration
    const clientId = process.env.SALESFORCE_CLIENT_ID
    const redirectUri = `${process.env.APP_URL}/api/crm/salesforce/callback`

    if (!clientId) {
      throw createError({
        statusCode: 500,
        message: 'Salesforce OAuth not configured'
      })
    }

    // Generate state parameter for CSRF protection
    const state = Buffer.from(
      JSON.stringify({
        userId: user.userId,
        timestamp: Date.now()
      })
    ).toString('base64')

    // Store state in session/cookie for verification in callback
    setCookie(event, 'sf_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600 // 10 minutes
    })

    // Build Salesforce OAuth URL
    const authUrl = new URL('https://login.salesforce.com/services/oauth2/authorize')
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('state', state)
    authUrl.searchParams.set('scope', 'api refresh_token')

    console.log(`Salesforce OAuth initiated for user ${user.userId}`)

    return {
      success: true,
      authUrl: authUrl.toString(),
      message: 'Redirect user to authUrl to authorize'
    }
  } catch (error: any) {
    console.error('Salesforce connect error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while initiating Salesforce connection'
    })
  }
})
