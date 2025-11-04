import { eq, and } from 'drizzle-orm'
import { requireAuth } from '~~/server/utils/auth'
import { db, schema } from '~~/server/database'

/**
 * Get specific document by ID
 * Returns document details for authenticated user's document
 * GET /api/documents/:id
 */
export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Get document ID from route params
    const documentId = getRouterParam(event, 'id')

    if (!documentId) {
      throw createError({
        statusCode: 400,
        message: 'Document ID is required'
      })
    }

    // Get document
    const [document] = await db
      .select()
      .from(schema.documents)
      .where(
        and(
          eq(schema.documents.id, documentId),
          eq(schema.documents.userId, user.userId)
        )
      )
      .limit(1)

    if (!document) {
      throw createError({
        statusCode: 404,
        message: 'Document not found'
      })
    }

    return {
      success: true,
      document: {
        ...document,
        trackableUrl: `${process.env.APP_URL}/api/documents/view/${document.trackingId}`
      }
    }
  } catch (error: unknown) {
    console.error('Get document error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching document'
    })
  }
})
