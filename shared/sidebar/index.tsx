'use client'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import QuizIcon from '@mui/icons-material/Quiz'
import SettingsIcon from '@mui/icons-material/Settings'
import React from 'react'

const Sidebar: React.FC = () => {
  const navigator = useRouter()
  const pathname = usePathname()

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: <DashboardIcon fontSize="small" /> },
    {
      label: 'Competition',
      path: '/admin/competition',
      icon: <SportsEsportsIcon fontSize="small" />,
    },
    { label: 'Subject', path: '/admin/subject', icon: <MenuBookIcon fontSize="small" /> },
    { label: 'Quiz', path: '/admin/quiz', icon: <QuizIcon fontSize="small" /> },
    { label: 'Settings', path: '/admin/settings', icon: <SettingsIcon fontSize="small" /> },
  ]

  const getActiveStyles = (path: string) => ({
    backgroundColor: pathname === path ? 'rgb(220 38 38)' : 'white',
    color: pathname === path ? 'white' : 'black',
    borderRadius: '0.25rem',
  })

  return (
    <div className="flex h-full gap-1 rounded shadow flex-col p-1 w-1/5">
      <List className="bg-white p-1" disablePadding>
        <ListItem
          style={{ height: '11vh', fontWeight: 800, fontSize: '30px' }}
          className="flex !text-3xl h-[11vh] items-center p-5"
        >
          <span
            style={{ color: 'rgb(220 38 38)', fontSize: '34px' }}
            className="text-red-600 !text-5xl"
          >
            Q
          </span>
          uick
          <span
            style={{ color: 'rgb(220 38 38)', fontSize: '34px' }}
            className="text-red-600 !text-5xl"
          >
            Q
          </span>
          uiz™
        </ListItem>
      </List>
      <List style={{ padding: '4px' }} className="bg-white h-[87vh] !p-1">
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => navigator.push(item.path)}
            style={getActiveStyles(item.path)}
            className="flex items-center gap-2"
          >
            {item.icon} {item.label}
          </ListItemButton>
        ))}
      </List>
    </div>
  )
}

export default Sidebar
