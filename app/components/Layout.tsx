import React, { useContext } from 'react'
import Link from 'next/link'

import { HeaderMenuIcon } from './header/HeaderMenuIcon'
import { AuthContext } from '../contexts/auth'

import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { PostAdd } from '@material-ui/icons'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/** Styles */
const useStyles = makeStyles(() =>
  createStyles({
    loginButton: {
      marginLeft: 'auto',
      marginRight: '20px',
    },
  })
)

/** Main */
export const Layout: React.FC = ({ children }) => {
  const classes = useStyles()

  const { user, load, signin } = useContext(AuthContext)

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link href="/">Photos</Link>
          </Typography>
          <>
            {load ? (
              <></>
            ) : (
              <>
                {user ? (
                  <>
                    <HeaderMenuIcon />
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
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.loginButton}
                    onClick={signin}
                  >
                    ログイン
                  </Button>
                )}
              </>
            )}
          </>
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
