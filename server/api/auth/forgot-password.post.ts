import { eq } from 'drizzle-orm'
import { db, schema } from '~~/server/database'
import { forgotPasswordSchema } from '~~/server/utils/validation'
import { generateRandomToken } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    // Parse and validate request body
    const body = await readBody(event)
    const validationResult = forgotPasswordSchema.safeParse(body)

    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        message: 'Validation failed',
        data: validationResult.error.errors,
      })
    }

    const { email } = validationResult.data

    // Find user by email
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    })

    // For security, always return success even if user doesn't exist
    // This prevents email enumeration attacks
    if (!user) {
      console.log(`Password reset requested for non-existent email: ${email}`)
      return {
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.',
      }
    }

    // Check if user has a password (not OAuth-only user)
    if (!user.password) {
      console.log(`Password reset requested for OAuth-only user: ${email}`)
      // Still return success to prevent enumeration
      return {
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.',
      }
    }

    // Generate reset token
    const resetToken = generateRandomToken(32)

    // Set expiry to 1 hour from now
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1)

    // Store reset token in database
    await db.insert(schema.passwordResetTokens).values({
      userId: user.id,
      token: resetToken,
      expiresAt,
    })

    // TODO: Send password reset email
    // For now, just log the reset link (in production, send via email service)
    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`

    console.log('='.repeat(80))
    console.log('PASSWORD RESET LINK (Development Only)')
    console.log('='.repeat(80))
    console.log(`Email: ${email}`)
    console.log(`Reset Link: ${resetLink}`)
    console.log(`Expires: ${expiresAt.toISOString()}`)
    console.log('='.repeat(80))

    // In production, call email service here:
    // await sendPasswordResetEmail(email, user.name, resetLink)

    return {
      success: true,
      message: 'If an account exists with this email, a password reset link has been sent.',
      // In development, include the link for testing
      ...(process.env.NODE_ENV === 'development' && { resetLink }),
    }
  } catch (error: any) {
    console.error('Forgot password error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while processing your request',
    })
  }
})
