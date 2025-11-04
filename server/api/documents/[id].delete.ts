import { requireAuth } from '~~/server/utils/auth'
import { db, schema } from '~~/server/database'
import { eq, and } from 'drizzle-orm'

/**
 * Delete document
 * Removes document record from database
 * DELETE /api/documents/:id
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
        message: 'Document ID is required',
      })
    }

    // Verify document exists and belongs to user
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
        message: 'Document not found',
      })
    }

    // Delete document record
    await db
      .delete(schema.documents)
      .where(eq(schema.documents.id, documentId))

    console.log(`Document deleted: ${document.originalName}`)

    // TODO: In production, also delete the physical file from storage
    // if (document.filePath) {
    //   await deleteFileFromStorage(document.filePath)
    // }

    return {
      success: true,
      message: 'Document deleted successfully',
    }
  } catch (error: any) {
    console.error('Delete document error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while deleting document',
    })
  }
})
