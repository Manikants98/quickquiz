'use client'
import { List, ListItem, ListItemButton } from '@mui/material'
import classNames from 'classnames'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Sidebar: React.FC = () => {
  const navigator = useRouter()
  const pathname = usePathname()
  return (
    <div className="flex h-full gap-1 rounded shadow flex-col w-1/5">
      <List className="bg-white" disablePadding>
        <ListItem className="flex font-extrabold text-3xl h-[11vh] items-center p-5">
          <span className="text-red-600 !text-5xl">Q</span>uick
          <span className="text-red-600 !text-5xl">Q</span>uiz™
        </ListItem>
      </List>
      <List className="bg-white h-[87vh] p-1">
        <ListItemButton
          onClick={() => navigator.push('/admin')}
          className={classNames('!rounded', pathname === '/admin' ? '!bg-red-500 !text-white' : '')}
        >
          Dashboard
        </ListItemButton>
        <ListItemButton
          onClick={() => navigator.push('/admin/competition')}
          className={classNames(
            '!rounded',
            pathname === '/admin/competition' ? '!bg-red-500 !text-white' : ''
          )}
        >
          Competition
        </ListItemButton>
        <ListItemButton
          onClick={() => navigator.push('/admin/subject')}
          className={classNames(
            '!rounded',
            pathname === '/admin/subject' ? '!bg-red-500 !text-white' : ''
          )}
        >
          Subject
        </ListItemButton>
        <ListItemButton
          onClick={() => navigator.push('/admin/quiz')}
          className={classNames(
            '!rounded',
            pathname === '/admin/quiz' ? '!bg-red-500 !text-white' : ''
          )}
        >
          Quiz
        </ListItemButton>
        <ListItemButton
          onClick={() => navigator.push('/admin/settings')}
          className={classNames(
            '!rounded',
            pathname === '/admin/settings' ? '!bg-red-500 !text-white' : ''
          )}
        >
          Settings
        </ListItemButton>
      </List>
    </div>
  )
}

export default Sidebar
