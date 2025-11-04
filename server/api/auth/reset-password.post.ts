import { eq, and, isNull, gt } from 'drizzle-orm'
import { db, schema } from '~~/server/database'
import { resetPasswordSchema } from '~~/server/utils/validation'
import { hashPassword } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    // Parse and validate request body
    const body = await readBody(event)
    const validationResult = resetPasswordSchema.safeParse(body)

    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        message: 'Validation failed',
        data: validationResult.error.errors
      })
    }

    const { token, password } = validationResult.data

    // Find valid reset token
    const resetTokenRecord = await db.query.passwordResetTokens.findFirst({
      where: and(
        eq(schema.passwordResetTokens.token, token),
        isNull(schema.passwordResetTokens.usedAt),
        gt(schema.passwordResetTokens.expiresAt, new Date())
      ),
      with: {
        user: true
      }
    })

    if (!resetTokenRecord) {
      throw createError({
        statusCode: 400,
        message: 'Invalid or expired reset token'
      })
    }

    // Hash new password
    const hashedPassword = await hashPassword(password)

    // Update user password
    await db
      .update(schema.users)
      .set({ password: hashedPassword })
      .where(eq(schema.users.id, resetTokenRecord.userId))

    // Mark token as used
    await db
      .update(schema.passwordResetTokens)
      .set({ usedAt: new Date() })
      .where(eq(schema.passwordResetTokens.id, resetTokenRecord.id))

    // Invalidate all user sessions (force re-login with new password)
    await db
      .delete(schema.sessions)
      .where(eq(schema.sessions.userId, resetTokenRecord.userId))

    console.log(`Password reset successful for user: ${resetTokenRecord.userId}`)

    // TODO: Send password changed notification email
    // await sendPasswordChangedEmail(user.email, user.name)

    return {
      success: true,
      message: 'Password has been reset successfully. Please log in with your new password.'
    }
  } catch (error: unknown) {
    console.error('Reset password error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while resetting your password'
    })
  }
})
