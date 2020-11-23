import { Grid, makeStyles, Typography } from '@material-ui/core'

import { Skeleton } from '@material-ui/lab'

import { UserShowHeaderImage } from './UserShowHeaderImage'
import { User } from '../../models/User'

/** Styles */
const useStyles = makeStyles((theme) => ({
  mt2: {
    marginTop: theme.spacing(2),
  },
  mt4: {
    marginTop: theme.spacing(4),
  },
}))

/** Types */
type UserShowHeaderProps = {
  user: User
  load: boolean
}

/** Main */
export const UserShowHeader = (props: UserShowHeaderProps) => {
  const classes = useStyles()

  const user = props.user
  const load = props.load

  return (
    <>
      <Grid container alignItems="center" justify="center">
        <Grid item className={classes.mt4}>
          {load ? (
            <Skeleton
              data-testid="photo-skeleton"
              variant="circle"
              width={96}
              height={96}
            />
          ) : (
            <div data-testid="photo">
              <UserShowHeaderImage user={user} />
            </div>
          )}
        </Grid>
      </Grid>
      <Grid container alignItems="center" justify="center">
        <Grid item className={classes.mt2}>
          <Typography variant="h3">
            {load ? (
              <Skeleton data-testid="name-skeleton" />
            ) : (
              <div data-testid="name">{user.displayName}</div>
            )}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
