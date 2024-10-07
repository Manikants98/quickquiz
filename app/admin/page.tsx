import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-3 h-36 p-3 w-full">
      <div className="bg-red-100 gap-2 p-2 shadow justify-center items-center w-full flex flex-col rounded">
        <p className="text-2xl font-bold">Competition</p>
        <p className="text-3xl font-bold">534</p>
      </div>
      <div className="bg-red-100 gap-2 p-2 shadow justify-center items-center w-full flex flex-col rounded">
        <p className="text-2xl font-bold">Subject</p>
        <p className="text-3xl font-bold">343</p>
      </div>
      <div className="bg-red-100 gap-2 p-2 shadow justify-center items-center w-full flex flex-col rounded">
        <p className="text-2xl font-bold">Quiz</p>
        <p className="text-3xl font-bold">103</p>
      </div>
    </div>
  )
}

export default Dashboard
