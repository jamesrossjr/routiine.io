import { z } from 'zod'
import { requireAuth } from '~~/server/utils/auth'
import { db, schema } from '~~/server/database'

/**
 * Upload a document for tracking
 * Creates a trackable document link
 * POST /api/documents
 */

const uploadDocumentSchema = z.object({
  fileName: z.string().min(1).max(255),
  originalName: z.string().min(1).max(255),
  documentType: z.enum(['pdf', 'proposal', 'presentation', 'contract', 'other']),
  mimeType: z.string().min(1).max(100),
  fileSize: z.number().int().positive(),
  filePath: z.string().min(1), // URL or storage path
  clientId: z.string().uuid().optional(),
  opportunityId: z.string().uuid().optional(),
  metadata: z.record(z.any()).optional(),
})

export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Parse and validate request body
    const body = await readBody(event)
    const validationResult = uploadDocumentSchema.safeParse(body)

    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        message: 'Validation failed',
        data: validationResult.error.errors,
      })
    }

    const documentData = validationResult.data

    // Generate unique tracking ID
    // Format: base64(userId:documentId:timestamp)
    const documentId = crypto.randomUUID()
    const timestamp = Date.now()
    const trackingData = `${user.userId}:${documentId}:${timestamp}`
    const trackingId = Buffer.from(trackingData).toString('base64')

    // Create document record
    const [newDocument] = await db
      .insert(schema.documents)
      .values({
        id: documentId,
        userId: user.userId,
        clientId: documentData.clientId || null,
        opportunityId: documentData.opportunityId || null,
        fileName: documentData.fileName,
        originalName: documentData.originalName,
        documentType: documentData.documentType,
        mimeType: documentData.mimeType,
        fileSize: documentData.fileSize,
        filePath: documentData.filePath,
        trackingId,
        metadata: documentData.metadata,
      })
      .returning()

    // Build trackable document URL
    const trackableUrl = `${process.env.APP_URL}/api/documents/view/${trackingId}`

    console.log(`Document uploaded: ${documentData.originalName}`)
    console.log(`Tracking URL: ${trackableUrl}`)

    return {
      success: true,
      message: 'Document uploaded successfully',
      document: {
        id: newDocument.id,
        fileName: newDocument.fileName,
        originalName: newDocument.originalName,
        documentType: newDocument.documentType,
        trackingId: newDocument.trackingId,
        trackableUrl,
        createdAt: newDocument.createdAt,
      },
    }
  } catch (error: any) {
    console.error('Document upload error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while uploading document',
    })
  }
})
