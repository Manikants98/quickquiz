'use client'
import { Avatar } from '@mui/material'
import React from 'react'
const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between w-full p-3 bg-white h-[11vh]">
      <p></p>
      <Avatar alt="M" src="https://picsum.photos/200" className="!bg-red-500 !cursor-pointer" />
    </div>
  )
}

export default Header
