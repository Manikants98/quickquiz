'use client'
import { Add, Close, Delete, Edit } from '@mui/icons-material'
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
} from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'

interface Competition {
  _id?: string
  name: string
  date: string
  location: string
  status: string
}

const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Lakshadweep',
  'Delhi',
  'Puducherry',
]

const CompetitionPage: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [currentCompetitionId, setCurrentCompetitionId] = useState<string | null>(null)

  const handleClose = () => {
    setOpen(false)
    setIsEdit(false)
    formik.resetForm()
  }

  const fetchCompetitions = async () => {
    const res = await axios.get('/api/competition')
    setCompetitions(res.data)
  }

  useEffect(() => {
    fetchCompetitions()
  }, [])

  const handleEdit = (competition: Competition) => {
    setIsEdit(true)
    setCurrentCompetitionId(competition._id || null)
    formik.setValues({
      name: competition.name,
      date: competition.date,
      location: competition.location,
      status: 'Active',
    })
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/competition/${id}`)
    fetchCompetitions()
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      date: '',
      location: '',
      status: 'Active',
    },
    onSubmit: async (values) => {
      if (isEdit && currentCompetitionId) {
        await axios.put(`/api/competition/${currentCompetitionId}`, values)
      } else {
        await axios.post('/api/competition', values)
      }
      fetchCompetitions()
      handleClose()
    },
  })

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-3">
        <h1 className="text-xl font-semibold">Competitions</h1>
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
              <TableCell className="!font-bold">Name</TableCell>
              <TableCell className="!font-bold">Date</TableCell>
              <TableCell className="!font-bold">Location</TableCell>
              <TableCell className="!font-bold">Status</TableCell>
              <TableCell className="!font-bold !text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {competitions.map((competition) => (
              <TableRow key={competition._id}>
                <TableCell className="!py-2">{competition.name}</TableCell>
                <TableCell className="!py-2">{competition.date}</TableCell>
                <TableCell className="!py-2">{competition.location}</TableCell>
                <TableCell className="!py-2">{competition.status}</TableCell>
                <TableCell className="!py-2">
                  <div className="flex justify-center gap-1 items-center">
                    <IconButton
                      className="!bg-red-100"
                      color="success"
                      onClick={() => handleEdit(competition)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      className="!bg-red-100"
                      color="error"
                      onClick={() => handleDelete(competition._id!)}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding/Editing Competition */}
      <Dialog open={open} className="flex flex-col" PaperProps={{ className: 'w-96' }}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-between p-2">
            <p>{isEdit ? 'Edit Competition' : 'New Competition'}</p>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
          <Divider />
          <div className="flex flex-col gap-4 p-4">
            <TextField
              size="small"
              label="Name"
              onChange={formik.handleChange}
              name="name"
              value={formik.values.name}
            />
            <TextField
              inputProps={{ className: 'uppercase' }}
              size="small"
              type="date"
              onChange={formik.handleChange}
              name="date"
              value={formik.values.date}
            />
            <TextField
              size="small"
              label="Location"
              select
              onChange={formik.handleChange}
              name="location"
              value={formik.values.location}
            >
              {indianStates.map((state, index) => (
                <MenuItem key={index} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
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

export default CompetitionPage
