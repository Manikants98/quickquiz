'use client'

import { Button, Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const megaMenuItems = {
  Competitions: [
    { title: 'IAS', link: '/quiz/ias' },
    { title: 'PCS', link: '/quiz/pcs' },
    { title: 'CBSE', link: '/quiz/cbse' },
  ],
  Resources: [
    { title: 'Study Material', link: '/resources/study-material' },
    { title: 'Previous Year Papers', link: '/resources/previous-papers' },
    { title: 'Tutorials', link: '/resources/tutorials' },
  ],
  Support: [
    { title: 'Help Center', link: '/support/help-center' },
    { title: 'FAQs', link: '/support/faqs' },
    { title: 'Contact Us', link: '/support/contact' },
  ],
}

const HeaderWithMegaMenu: React.FC = () => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuTitle, setMenuTitle] = useState<string | null>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, title: string) => {
    setAnchorEl(event.currentTarget)
    setMenuTitle(title)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setMenuTitle(null)
  }

  const menuItems = megaMenuItems[menuTitle as keyof typeof megaMenuItems]

  return (
    <div className="bg-white shadow-lg">
      <div
        style={{ padding: '0 3%' }}
        className="!px-[10%] mx-auto gap-3 flex justify-between items-center"
      >
        <Link
          href="#"
          style={{ height: '11vh', fontWeight: 800, fontSize: '30px', color: 'black' }}
          className="flex text-black !text-3xl h-[11vh] items-center p-5"
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
        </Link>

        <div className="flex items-center gap-2 space-x-4">
          {Object.keys(megaMenuItems).map((menuTitle, idx) => (
            <Button
              key={idx}
              aria-controls="mega-menu"
              aria-haspopup="true"
              onClick={(e) => handleOpenMenu(e, menuTitle)}
              className="text-gray-700 font-medium"
            >
              {menuTitle}
            </Button>
          ))}

          <Menu
            id="mega-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            elevation={1}
            PaperProps={{ style: { borderRadius: '0px' } }}
            onClose={handleCloseMenu}
            sx={{ marginTop: '24.75px' }}
          >
            {menuItems?.map((item) => (
              <MenuItem
                sx={{ width: '320px' }}
                className="cursor-pointer !w-72 hover:text-red-600 text-gray-800"
                onClick={handleCloseMenu}
              >
                {item.title}
              </MenuItem>
            ))}
          </Menu>

          <div className="flex items-center" style={{ gap: '12px' }}>
            <Button
              variant="outlined"
              color="primary"
              className="text-red-600 !border-red-600 !border-solid !border hover:bg-red-50"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => router.push('/signup')}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderWithMegaMenu
