'use client'
import Header from '@/shared/header'
import Sidebar from '@/shared/sidebar'
import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: { main: 'rgba(239, 68, 68, 1)' },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <div className="p-[1vh] h-screen flex bg-red-100 flex-col">
        <div className="flex gap-1 w-full h-full">
          <Sidebar />
          <div className="flex gap-1 flex-col rounded w-full h-full">
            <Header />
            <div style={{ width: '100%' }} className="flex overflow-y-auto h-[87vh] w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Layout
