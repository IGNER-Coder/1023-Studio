import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, inquiryType, message, recipientEmail } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: '1023 Studios <onboarding@resend.dev>',
      to: recipientEmail,
      replyTo: email,
      subject: `[${inquiryType}] New inquiry from ${name}`,
      text: `From: ${name} <${email}>\nType: ${inquiryType}\n\n${message}`.trim(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
