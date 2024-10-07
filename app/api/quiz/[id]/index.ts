import Quiz from '@/Models/Quiz'
import dbConnect from '@/utils/mongoose'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const body = await req.json()
    const updatedQuiz = await Quiz.findByIdAndUpdate(params.id, body, {
      new: true,
    })
    if (!updatedQuiz) {
      return NextResponse.json({ message: 'Quiz not found' }, { status: 404 })
    }
    return NextResponse.json(updatedQuiz)
  } catch (error) {
    const message = (error as Error).message || 'Error updating quiz'
    return NextResponse.json({ message }, { status: 400 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const deletedQuiz = await Quiz.findByIdAndDelete(params.id)
    if (!deletedQuiz) {
      return NextResponse.json({ message: 'Quiz not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Quiz deleted successfully' })
  } catch (error) {
    const message = (error as Error).message || 'Error deleting quiz'
    return NextResponse.json({ message }, { status: 400 })
  }
}
