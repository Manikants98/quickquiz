import mongoose, { Schema, model, models } from 'mongoose'

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  competition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: true,
  },
})

const Subject = models.Subject || model('Subject', subjectSchema)

export default Subject
