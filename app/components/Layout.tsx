import React, { useContext } from 'react'
import Link from 'next/link'

import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import { PostAdd } from '@material-ui/icons'

import { ToastContainer } from 'react-toastify'
import { AuthContext } from '../contexts/auth'
import { HeaderMenu } from './HeaderMenu'

import 'react-toastify/dist/ReactToastify.css'

/** Main */
export const Layout: React.FC = ({ children }) => {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link href="/">Photos</Link>
          </Typography>
          {user && (
            <>
              <HeaderMenu />
              <Link href="/posts/create">
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<PostAdd />}
                >
                  投稿
                </Button>
              </Link>
            </>
          )}
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
