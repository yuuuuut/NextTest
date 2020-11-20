import { useContext, useEffect } from 'react'

import {
  Backdrop,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core'

import { Layout } from '../components/Layout'
import { useRouter } from 'next/router'
import { AuthContext } from './auth'

/** Styles */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
)

/** Main */
const AuthRequired: React.FC = ({ children }) => {
  const { user, load } = useContext(AuthContext)

  const classes = useStyles()
  const router = useRouter()

  useEffect(() => {
    if (user === null && !load) {
      router.push('/')
    }
  }, [user, load])

  return (
    <Layout>
      {user === null ? (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>{children}</>
      )}
    </Layout>
  )
}

export { AuthRequired }
