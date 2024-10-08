'use client'
import { BarChart, LineChart } from '@mui/x-charts'
import React from 'react'

const Dashboard: React.FC = () => {
  const competitionData = [
    { name: 'Competition 1', count: 150 },
    { name: 'Competition 2', count: 200 },
    { name: 'Competition 3', count: 250 },
  ]

  const subjectData = [
    { name: 'Subject 1', count: 100 },
    { name: 'Subject 2', count: 150 },
    { name: 'Subject 3', count: 50 },
  ]

  const chartColor = 'rgb(220, 38, 38)'

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center w-full gap-1">
        <div className="h-[42.4vh] w-full bg-white p-4 shadow">
          <div className="chart-header text-center font-bold">Competitions Bar Chart</div>
          <BarChart
            series={[
              {
                label: 'Competitions',
                data: competitionData.map((item) => item.count),
                color: chartColor,
              },
            ]}
            xAxis={[{ data: competitionData.map((item) => item.name), scaleType: 'band' }]}
          />
        </div>
        <div className="h-[42.4vh] w-full bg-white p-4 shadow">
          <div className="chart-header text-center font-bold">Subjects Line Chart</div>
          <LineChart
            series={[
              { label: 'Subjects', data: subjectData.map((item) => item.count), color: chartColor },
            ]}
            xAxis={[{ data: subjectData.map((item) => item.name), scaleType: 'band' }]}
          />
        </div>
      </div>
      <div className="flex items-center w-full gap-1">
        <div className="h-[42.4vh] w-full bg-white p-4 shadow">
          <div className="chart-header text-center font-bold">Subjects Line Chart</div>
          <LineChart
            series={[
              { label: 'Subjects', data: subjectData.map((item) => item.count), color: chartColor },
            ]}
            xAxis={[{ data: subjectData.map((item) => item.name), scaleType: 'band' }]}
          />
        </div>

        <div className="h-[42.4vh] w-full bg-white p-4 shadow">
          <div className="chart-header text-center font-bold">Competitions Bar Chart</div>
          <BarChart
            series={[
              {
                label: 'Competitions',
                data: competitionData.map((item) => item.count),
                color: chartColor,
              },
            ]}
            xAxis={[{ data: competitionData.map((item) => item.name), scaleType: 'band' }]}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
