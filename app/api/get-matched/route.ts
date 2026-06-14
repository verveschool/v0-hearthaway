import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
    
    if (!webhookUrl) {
      return NextResponse.json({ error: 'sheet webhook configuration missing' }, { status: 500 })
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      throw new Error('failed to log data to google sheets')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('api execution error', error)
    return NextResponse.json({ error: 'internal operations failure' }, { status: 500 })
  }
}
