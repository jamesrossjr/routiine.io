import { eq } from 'drizzle-orm'
import { db, schema } from '~~/server/database'
import { loginSchema } from '~~/server/utils/validation'
import { verifyPassword, generateAccessToken, generateRefreshToken, setAuthCookies } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    // Parse and validate request body
    const body = await readBody(event)
    const validationResult = loginSchema.safeParse(body)

    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        message: 'Validation failed',
        data: validationResult.error.errors
      })
    }

    const { email, password, rememberMe } = validationResult.data

    // Find user by email
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, email)
    })

    if (!user || !user.password) {
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    // Update last login timestamp
    await db
      .update(schema.users)
      .set({ lastLogin: new Date() })
      .where(eq(schema.users.id, user.id))

    // Generate JWT tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    }

    const accessToken = generateAccessToken(tokenPayload)
    const refreshToken = generateRefreshToken(tokenPayload, rememberMe)

    // Store refresh token in database
    const refreshExpiresAt = new Date()
    refreshExpiresAt.setDate(refreshExpiresAt.getDate() + (rememberMe ? 30 : 7))

    await db.insert(schema.sessions).values({
      userId: user.id,
      refreshToken,
      expiresAt: refreshExpiresAt
    })

    // Set authentication cookies
    setAuthCookies(event, accessToken, refreshToken)

    // Return success response
    return {
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        subscriptionTier: user.subscriptionTier
      }
    }
  } catch (error: any) {
    // Log error for debugging
    console.error('Login error:', error)

    // Return appropriate error
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred during login'
    })
  }
})
