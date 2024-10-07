import Subject from '@/Models/Subject'
import dbConnect from '@/utils/mongoose'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const body = await req.json()
    const updatedSubject = await Subject.findByIdAndUpdate(params.id, body, {
      new: true,
    })
    if (!updatedSubject) {
      return NextResponse.json({ message: 'Subject not found' }, { status: 404 })
    }
    return NextResponse.json(updatedSubject)
  } catch (error) {
    return NextResponse.json({ message: 'Error updating subject', error }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const { id } = params
    const deletedSubject = await Subject.findByIdAndDelete(id)
    if (!deletedSubject) {
      return NextResponse.json({ message: 'Subject not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Subject deleted successfully' })
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting subject', error: error }, { status: 400 })
  }
}
