'use client';
import { Add, Close, Delete, Edit } from '@mui/icons-material';
import { Button, Dialog, Divider, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface Quiz {
    _id?: string;
    text: string;  // The quiz prompt
    answers: Answer[];
    subjectId: { _id: string };  // Added for subject selection
    competitionId: { _id: string };  // Added for competition selection
}

const QuizPage: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [subjects, setSubjects] = useState<{ _id: string, name: string, competition: { _id: string } }[]>([]);
    const [filteredSubjects, setFilteredSubjects] = useState<{ _id: string, name: string }[]>([]); // For filtering subjects
    const [competitions, setCompetitions] = useState<{ _id: string, name: string }[]>([]);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentQuizId, setCurrentQuizId] = useState<string | null>(null);
    const [selectedCompetition, setSelectedCompetition] = useState<string>(''); // Track selected competition

    const handleClose = () => {
        setOpen(false);
        setIsEdit(false);
        formik.resetForm();
    };

    const fetchQuizzes = async () => {
        const res = await axios.get('/api/quiz');  // Adjust API endpoint accordingly
        setQuizzes(res.data);
    };

    const fetchSubjects = async () => {
        const res = await axios.get('/api/subject'); // Adjust API endpoint accordingly
        setSubjects(res.data);
    };

    const fetchCompetitions = async () => {
        const res = await axios.get('/api/competition'); // Adjust API endpoint accordingly
        setCompetitions(res.data);
    };

    useEffect(() => {
        fetchQuizzes();
        fetchSubjects();
        fetchCompetitions();
    }, []);

    useEffect(() => {
        // Filter subjects based on the selected competition
        if (selectedCompetition) {
            const filtered = subjects.filter(subject => subject.competition?._id === selectedCompetition);
            setFilteredSubjects(filtered);
        } else {
            setFilteredSubjects([]);
        }
    }, [selectedCompetition, subjects]);

    const handleEdit = (quiz: Quiz) => {
        setIsEdit(true);
        setCurrentQuizId(quiz._id || null);
        formik.setValues({
            text: quiz.text,
            answers: quiz.answers,
            subjectId: quiz.subjectId?._id as string,
            competitionId: quiz.competitionId?._id,
        });
        setSelectedCompetition(quiz.competitionId?._id as string);
        setOpen(true);
    };

    const handleDelete = async (id: string) => {
        await axios.delete(`/api/quiz/${id}`);
        fetchQuizzes();
    };

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
                await axios.put(`/api/quiz/${currentQuizId}`, values);
            } else {
                await axios.post('/api/quiz', values);
            }
            fetchQuizzes();
            handleClose();
        },
    });

    console.log(selectedCompetition, 'mkx');
    console.log(competitions, 'mkx');

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center p-3'>
                <h1 className='text-xl font-semibold'>Quizzes</h1>
                <Button variant='contained' disableElevation startIcon={<Add />} onClick={() => setOpen(true)}>
                    Create
                </Button>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow className='!bg-red-100'>
                            <TableCell className='!font-bold'>Quiz Prompt</TableCell>
                            <TableCell className='!font-bold'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quizzes.map((quiz) => (
                            <TableRow key={quiz._id}>
                                <TableCell className='!py-2'>{quiz.text}</TableCell>
                                <TableCell className='!py-2'>
                                    <div className='flex justify-center gap-1 items-center'>
                                        <IconButton color='success' onClick={() => handleEdit(quiz)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color='error' onClick={() => handleDelete(quiz._id!)}>
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} className='flex flex-col' PaperProps={{ className: 'w-96' }}>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex items-center justify-between p-2'>
                        <p>{isEdit ? 'Edit Quiz' : 'New Quiz'}</p>
                        <IconButton onClick={handleClose}><Close /></IconButton>
                    </div>
                    <Divider />
                    <div className='flex flex-col gap-4 p-4'>
                        <TextField
                            size='small'
                            label='Competition'
                            select
                            onChange={(e) => {
                                const value = e.target.value;
                                setSelectedCompetition(value);
                                formik.setFieldValue('competitionId', value);
                            }}
                            value={selectedCompetition || ""}
                        >
                            {competitions.map((competition) => (
                                <MenuItem key={competition._id} value={competition._id}>
                                    {competition.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        {selectedCompetition && (
                            <TextField
                                size='small'
                                label='Subject'
                                select
                                onChange={formik.handleChange}
                                name='subjectId'
                                value={formik.values.subjectId}
                            >
                                {filteredSubjects.map((subject) => (
                                    <MenuItem key={subject._id} value={subject._id}>
                                        {subject.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                        <TextField size='small' label='Quiz Prompt' onChange={formik.handleChange} name='text' value={formik.values.text} />
                        {formik.values.answers.map((answer, index) => (
                            <TextField
                                key={index}
                                size='small'
                                label={`Answer ${index + 1}`}
                                onChange={(e) => {
                                    const updatedAnswers = [...formik.values.answers];
                                    updatedAnswers[index] = { ...updatedAnswers[index], text: e.target.value };
                                    formik.setFieldValue('answers', updatedAnswers);
                                }}
                                value={answer.text}
                            />
                        ))}
                        <TextField size='small' label='Correct Answer Index (1-4)' onChange={(e) => {
                            const correctIndex = parseInt(e.target.value) - 1;
                            const updatedAnswers = [...formik.values.answers];
                            updatedAnswers.forEach((ans, idx) => ans.isCorrect = idx === correctIndex);
                            formik.setFieldValue('answers', updatedAnswers);
                        }} />
                    </div>
                    <Divider />
                    <div className='flex px-4 py-2 gap-2 justify-end'>
                        <Button onClick={handleClose} disableElevation variant='contained' color='inherit' type='button'>Cancel</Button>
                        <Button disableElevation variant='contained' type='submit'>{isEdit ? 'Update' : 'Submit'}</Button>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default QuizPage;