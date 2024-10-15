import { NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import dbConnect from '../../../../lib/mongodb'
import { Form } from '../../../../models/Form'

export async function POST(req: Request) {
  const { userId } = getAuth(req)
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await dbConnect()
    const { title, fields } = await req.json()
    const form = new Form({ userId, title, fields })
    await form.save()
    return NextResponse.json(form, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating form' }, { status: 500 })
  }
}