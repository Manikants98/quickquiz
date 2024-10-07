import Users from '@/Models/Users'
import dbConnect from '@/utils/mongoose'
import { NextResponse } from 'next/server'

export async function GET() {
  await dbConnect()
  try {
    const users = await Users.find({})
    return NextResponse.json({ success: true, data: users }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 })
  }
}

export async function POST(req: Request) {
  await dbConnect()
  try {
    const body = await req.json()
    const user = await Users.create(body)
    return NextResponse.json({ success: true, data: user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 })
  }
}
