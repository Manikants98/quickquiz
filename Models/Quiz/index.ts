// models/Quiz.js
import mongoose from 'mongoose'

const AnswerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
})

const QuizSchema = new mongoose.Schema({
  text: { type: String, required: true },
  answers: [AnswerSchema],
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  competitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: true,
  },
})

export default mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema)
