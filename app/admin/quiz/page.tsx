'use client'
import { Add, Close, Delete, Edit, Visibility } from '@mui/icons-material'
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  MenuItem,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'

interface Answer {
  id: string
  text: string
  isCorrect: boolean
}

interface Quiz {
  _id?: string
  text: string
  answers: Answer[]
  subjectId: { _id: string }
  competitionId: { _id: string }
}

const QuizPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [subjects, setSubjects] = useState<
    { _id: string; name: string; competition: { _id: string } }[]
  >([])
  const [filteredSubjects, setFilteredSubjects] = useState<{ _id: string; name: string }[]>([])
  const [competitions, setCompetitions] = useState<{ _id: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [currentQuizId, setCurrentQuizId] = useState<string | null>(null)
  const [selectedCompetition, setSelectedCompetition] = useState<string>('')
  const [answersDialogOpen, setAnswersDialogOpen] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([])

  const handleClose = () => {
    setOpen(false)
    setIsEdit(false)
    formik.resetForm()
  }

  const fetchQuizzes = async () => {
    const res = await axios.get('/api/quiz')
    setQuizzes(res.data)
    setLoading(false)
  }

  const fetchSubjects = async () => {
    const res = await axios.get('/api/subject')
    setSubjects(res.data)
  }

  const fetchCompetitions = async () => {
    const res = await axios.get('/api/competition')
    setCompetitions(res.data)
  }

  useEffect(() => {
    fetchQuizzes()
    fetchSubjects()
    fetchCompetitions()
  }, [])

  useEffect(() => {
    if (selectedCompetition) {
      const filtered = subjects.filter(
        (subject) => subject.competition?._id === selectedCompetition
      )
      setFilteredSubjects(filtered)
    } else {
      setFilteredSubjects([])
    }
  }, [selectedCompetition, subjects])

  const handleEdit = (quiz: Quiz) => {
    setIsEdit(true)
    setCurrentQuizId(quiz._id || null)
    formik.setValues({
      text: quiz.text,
      answers: quiz.answers,
      subjectId: quiz.subjectId?._id as string,
      competitionId: quiz.competitionId?._id,
    })
    setSelectedCompetition(quiz.competitionId?._id as string)
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/quiz/${id}`)
    fetchQuizzes()
  }

  const handleViewAnswers = (answers: Answer[]) => {
    setSelectedAnswers(answers)
    setAnswersDialogOpen(true)
  }

  const formik = useFormik({
    initialValues: {
      text: '',
      answers: [
        { id: '', text: '', isCorrect: false },
        { id: '', text: '', isCorrect: false },
        { id: '', text: '', isCorrect: false },
        { id: '', text: '', isCorrect: false },
      ],
      subjectId: '',
      competitionId: '',
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (isEdit && currentQuizId) {
        await axios.put(`/api/quiz/${currentQuizId}`, values)
      } else {
        await axios.post('/api/quiz', values)
      }
      fetchQuizzes()
      handleClose()
    },
  })

  return (
    <div className="w-full bg-white">
      <div className="flex justify-between items-center p-3">
        <h1 className="text-xl font-semibold">Quizzes</h1>
        <Button
          variant="contained"
          disableElevation
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Create
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="!bg-red-100">
              <TableCell className="!font-bold">Quiz Prompt</TableCell>
              <TableCell className="!font-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <>
                {[1, 2, 3].map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-1 items-center">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              quizzes.map((quiz) => (
                <TableRow key={quiz._id}>
                  <TableCell className="!py-2">{quiz.text}</TableCell>
                  <TableCell className="!py-2">
                    <div className="flex justify-center gap-1 items-center">
                      <IconButton
                        className="!bg-red-100"
                        color="success"
                        onClick={() => handleEdit(quiz)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        className="!bg-red-100"
                        color="error"
                        onClick={() => handleDelete(quiz._id!)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        className="!bg-red-100"
                        color="primary"
                        onClick={() => handleViewAnswers(quiz.answers)}
                      >
                        <Visibility />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={answersDialogOpen}
        onClose={() => setAnswersDialogOpen(false)}
        className="flex flex-col"
        PaperProps={{ className: 'w-96' }}
      >
        <div className="flex items-center justify-between p-2">
          <p>Quiz Answers</p>
          <IconButton onClick={() => setAnswersDialogOpen(false)}>
            <Close />
          </IconButton>
        </div>
        <Divider className="!my-0" />
        <div className="px-4 py-2">
          {selectedAnswers.map((answer, idx) => (
            <div
              key={answer.id}
              className={`my-2 p-2 ${answer.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
            >
              <span className="font-semibold">{`Answer ${idx + 1}:`}</span> {answer.text}
              {answer.isCorrect && <span className="ml-2 text-green-700">(Correct)</span>}
            </div>
          ))}
        </div>
      </Dialog>

      <Dialog open={open} className="flex flex-col" PaperProps={{ className: 'w-96' }}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-between p-2">
            <p>{isEdit ? 'Edit Quiz' : 'New Quiz'}</p>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
          <Divider />
          <div className="flex flex-col gap-4 p-4">
            <TextField
              size="small"
              label="Competition"
              select
              onChange={(e) => {
                const value = e.target.value
                setSelectedCompetition(value)
                formik.setFieldValue('competitionId', value)
              }}
              value={selectedCompetition || ''}
            >
              {competitions.map((competition) => (
                <MenuItem key={competition._id} value={competition._id}>
                  {competition.name}
                </MenuItem>
              ))}
            </TextField>
            {selectedCompetition && (
              <TextField
                size="small"
                label="Subject"
                select
                onChange={formik.handleChange}
                name="subjectId"
                value={formik.values.subjectId}
              >
                {filteredSubjects.map((subject) => (
                  <MenuItem key={subject._id} value={subject._id}>
                    {subject.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <TextField
              size="small"
              label="Quiz Prompt"
              onChange={formik.handleChange}
              name="text"
              value={formik.values.text}
            />
            {formik.values.answers.map((answer, index) => (
              <TextField
                key={index}
                size="small"
                label={`Answer ${index + 1}`}
                onChange={(e) => {
                  const updatedAnswers = [...formik.values.answers]
                  updatedAnswers[index] = {
                    ...updatedAnswers[index],
                    text: e.target.value,
                  }
                  formik.setFieldValue('answers', updatedAnswers)
                }}
                value={answer.text}
              />
            ))}
            <TextField
              size="small"
              label="Correct Answer Index (1-4)"
              onChange={(e) => {
                const correctIndex = parseInt(e.target.value) - 1
                const updatedAnswers = [...formik.values.answers]
                updatedAnswers.forEach((ans, idx) => (ans.isCorrect = idx === correctIndex))
                formik.setFieldValue('answers', updatedAnswers)
              }}
            />
          </div>
          <Divider />
          <div className="flex px-4 py-2 gap-2 justify-end">
            <Button
              onClick={handleClose}
              disableElevation
              variant="contained"
              color="inherit"
              type="button"
            >
              Cancel
            </Button>
            <Button disableElevation variant="contained" type="submit">
              {isEdit ? 'Update' : 'Submit'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}

export default QuizPage
