'use client';
import { Add, Close, Delete, Edit } from '@mui/icons-material';
import {
    Button,
    Dialog,
    Divider,
    IconButton,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

interface Subject {
    _id?: string;
    name: string;
    competition: { _id: string };
}

const SubjectPage: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [competitions, setCompetitions] = useState<{ _id: string; name: string }[]>([]);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentSubjectId, setCurrentSubjectId] = useState<string | null>(null);

    const fetchSubjects = async () => {
        const res = await axios.get('/api/subject');
        setSubjects(res.data);
    };

    const fetchCompetitions = async () => {
        const res = await axios.get('/api/competition');
        setCompetitions(res.data);
    };

    useEffect(() => {
        fetchSubjects();
        fetchCompetitions();
    }, []);

    const formik = useFormik({
        initialValues: { name: '', competition: '' },
        onSubmit: async (values) => {
            if (isEdit && currentSubjectId) {
                await axios.put(`/api/subject/${currentSubjectId}`, values);
            } else {
                await axios.post('/api/subject', values);
            }
            fetchSubjects();
            handleClose();
        },
    });

    const handleEdit = (subject: Subject) => {
        setIsEdit(true);
        setCurrentSubjectId(subject._id || null);
        formik.setValues({
            name: subject.name,
            competition: subject.competition?._id,
        });
        setOpen(true);
    };

    const handleDelete = async (id: string) => {
        await axios.delete(`/api/subject/${id}`);
        fetchSubjects();
    };

    const handleClose = () => {
        setOpen(false);
        setIsEdit(false);
        formik.resetForm();
    };

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center p-3'>
                <h1 className='text-xl font-semibold'>Subjects</h1>
                <Button variant='contained' disableElevation startIcon={<Add />} onClick={() => setOpen(true)}>
                    Create
                </Button>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow className='!bg-red-100'>
                            <TableCell className='!font-bold'>Name</TableCell>
                            <TableCell className='!font-bold'>Competition</TableCell>
                            <TableCell className='!font-bold !text-center'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subjects.map((subject) => (
                            <TableRow key={subject._id}>
                                <TableCell className='!py-2'>{subject.name}</TableCell>
                                <TableCell className='!py-2'>
                                    {competitions.find((c) => c._id === subject.competition._id)?.name || 'Unknown'}
                                </TableCell>
                                <TableCell className='!py-2'>
                                    <div className='flex justify-center gap-1 items-center'>
                                        <IconButton className='!bg-red-100' color='success' onClick={() => handleEdit(subject)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton className='!bg-red-100' color='error' onClick={() => handleDelete(subject._id!)}>
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
                        <p>{isEdit ? 'Edit Subject' : 'New Subject'}</p>
                        <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className='flex flex-col gap-4 p-4'>
                        <TextField size='small' label='Name' onChange={formik.handleChange} name='name' value={formik.values.name} />
                        <TextField size='small' label='Competition' select onChange={formik.handleChange} name='competition' value={formik.values.competition}>
                            {competitions.map((competition) => (
                                <MenuItem key={competition._id} value={competition._id}>
                                    {competition.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <Divider />
                    <div className='flex px-4 py-2 gap-2 justify-end'>
                        <Button onClick={handleClose} disableElevation variant='contained' color='inherit' type='button'>
                            Cancel
                        </Button>
                        <Button disableElevation variant='contained' type='submit'>
                            {isEdit ? 'Update' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default SubjectPage;