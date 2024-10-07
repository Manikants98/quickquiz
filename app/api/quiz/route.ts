// app/api/quiz/route.ts
import Quiz from '@/Models/Quiz'
import dbConnect from '@/utils/mongoose'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await dbConnect()
    const quizzes = await Quiz.find().populate('subjectId competitionId')
    return NextResponse.json(quizzes)
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching quizzes', error }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect()
    const body = await req.json()
    const newQuiz = await Quiz.create(body)
    return NextResponse.json(newQuiz, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error creating quiz', error }, { status: 400 })
  }
}
