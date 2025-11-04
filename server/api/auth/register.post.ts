import { eq } from 'drizzle-orm'
import { db, schema } from '~~/server/database'
import { registerSchema } from '~~/server/utils/validation'
import { hashPassword, generateAccessToken, generateRefreshToken, setAuthCookies } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    // Parse and validate request body
    const body = await readBody(event)
    const validationResult = registerSchema.safeParse(body)

    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        message: 'Validation failed',
        data: validationResult.error.errors
      })
    }

    const { name, email, password } = validationResult.data

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(schema.users.email, email)
    })

    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: 'An account with this email already exists'
      })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const [newUser] = await db
      .insert(schema.users)
      .values({
        name,
        email,
        password: hashedPassword,
        role: 'sales_rep',
        subscriptionTier: 'basic'
      })
      .returning({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        role: schema.users.role,
        subscriptionTier: schema.users.subscriptionTier,
        createdAt: schema.users.createdAt
      })

    // Create initial subscription (14-day trial)
    const trialEndsAt = new Date()
    trialEndsAt.setDate(trialEndsAt.getDate() + 14)

    await db.insert(schema.subscriptions).values({
      userId: newUser.id,
      plan: 'basic',
      billingCycle: 'monthly',
      price: '0.00',
      status: 'trial',
      trialEndsAt,
      autoRenew: true
    })

    // Generate JWT tokens
    const tokenPayload = {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role
    }

    const accessToken = generateAccessToken(tokenPayload)
    const refreshToken = generateRefreshToken(tokenPayload, false)

    // Store refresh token in database
    const refreshExpiresAt = new Date()
    refreshExpiresAt.setDate(refreshExpiresAt.getDate() + 7)

    await db.insert(schema.sessions).values({
      userId: newUser.id,
      refreshToken,
      expiresAt: refreshExpiresAt
    })

    // Set authentication cookies
    setAuthCookies(event, accessToken, refreshToken)

    // TODO: Send welcome email (implement in later sprint)
    // await sendWelcomeEmail(email, name)

    // Return success response
    return {
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        subscriptionTier: newUser.subscriptionTier
      }
    }
  } catch (error: any) {
    // Log error for debugging
    console.error('Registration error:', error)

    // Return appropriate error
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred during registration'
    })
  }
})
