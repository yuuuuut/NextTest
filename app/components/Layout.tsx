import React from 'react'
import Link from 'next/link'

import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'

import PostAddIcon from '@material-ui/icons/PostAdd'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { HeaderMenu } from './HeaderMenu'

/** Main */
export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link href="/">Photos</Link>
          </Typography>
          <HeaderMenu />
          <Link href="/posts/create">
            <Button
              variant="contained"
              color="secondary"
              endIcon={<PostAddIcon />}
            >
              投稿
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <div>{children}</div>
      <ToastContainer />

      <style jsx global>{`
        body {
          margin: 0px;
        }

        a {
          text-decoration: none;
        }

        a:link,
        a:visited,
        a:active {
          color: white;
        }
      `}</style>
    </div>
  )
}
