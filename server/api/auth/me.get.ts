import { eq } from 'drizzle-orm'
import { db, schema } from '~~/server/database'
import { requireAuth } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const authUser = requireAuth(event)

    // Fetch full user data
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, authUser.userId),
      columns: {
        password: false // Exclude password
      }
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }

    // Fetch subscription info
    const subscription = await db.query.subscriptions.findFirst({
      where: eq(schema.subscriptions.userId, user.id)
    })

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        subscriptionTier: user.subscriptionTier,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      },
      subscription: subscription
        ? {
            plan: subscription.plan,
            status: subscription.status,
            billingCycle: subscription.billingCycle,
            trialEndsAt: subscription.trialEndsAt,
            autoRenew: subscription.autoRenew
          }
        : null
    }
  } catch (error: any) {
    console.error('Get user error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching user data'
    })
  }
})
