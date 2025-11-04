import { z } from 'zod'
import { requireAuth } from '~~/server/utils/auth'

/**
 * Send tracked email
 * Embeds tracking pixel to monitor email opens
 * POST /api/emails/send
 */

const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1).max(255),
  body: z.string().min(1),
  bodyHtml: z.string().optional(),
  clientId: z.string().uuid().optional(),
})

export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Parse and validate request body
    const body = await readBody(event)
    const validationResult = sendEmailSchema.safeParse(body)

    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        message: 'Validation failed',
        data: validationResult.error.errors,
      })
    }

    const emailData = validationResult.data

    // Generate unique tracking ID
    // Format: base64(userId:emailId:timestamp)
    const emailId = crypto.randomUUID()
    const timestamp = Date.now()
    const trackingData = `${user.userId}:${emailId}:${timestamp}`
    const trackingId = Buffer.from(trackingData).toString('base64')

    // Build tracking pixel URL
    const trackingPixelUrl = `${process.env.APP_URL}/api/track/email/${trackingId}`

    // Embed tracking pixel in HTML email
    let htmlBody = emailData.bodyHtml || `<html><body>${emailData.body.replace(/\n/g, '<br>')}</body></html>`

    // Add tracking pixel at the end of the email
    htmlBody += `<img src="${trackingPixelUrl}" width="1" height="1" alt="" style="display:none;" />`

    // In production, integrate with email service (SendGrid, Mailgun, AWS SES)
    // For now, log the email details

    console.log('='.repeat(80))
    console.log('EMAIL SENT (Development Mode)')
    console.log('='.repeat(80))
    console.log(`From: ${user.email}`)
    console.log(`To: ${emailData.to}`)
    console.log(`Subject: ${emailData.subject}`)
    console.log(`Email ID: ${emailId}`)
    console.log(`Tracking Pixel: ${trackingPixelUrl}`)
    console.log('='.repeat(80))
    console.log('HTML Body:')
    console.log(htmlBody)
    console.log('='.repeat(80))

    // TODO: In production, send via email service:
    // await sendgrid.send({
    //   from: process.env.EMAIL_FROM,
    //   to: emailData.to,
    //   subject: emailData.subject,
    //   html: htmlBody,
    //   text: emailData.body,
    // })

    // Store sent email record (optional - you might want to track sent emails)
    // This would go in an "sent_emails" table

    return {
      success: true,
      message: 'Email sent successfully',
      emailId,
      // In development, return the tracking URL for testing
      ...(process.env.NODE_ENV === 'development' && {
        trackingPixelUrl,
        testInstructions: 'Open the tracking pixel URL in a browser to simulate email open',
      }),
    }
  } catch (error: any) {
    console.error('Send email error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while sending email',
    })
  }
})
