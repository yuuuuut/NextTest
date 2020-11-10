import { useEffect, useState }  from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'

import {
    Grid,
    makeStyles
} from '@material-ui/core'

import {
    Skeleton
} from '@material-ui/lab'

import firebase from 'firebase/app'
import { User } from '../../models/User'
import { Layout } from '../../components/Layout'
import { AvatarKit } from '../../components/UI/Avatar'

const useStyles = makeStyles((theme) => ({
    mt: {
        marginTop: theme.spacing(4)
    },
}));

type Query = {
    uid: string
}

const UserShow = () => {
    const classes = useStyles();

    const [user, setUser] = useState<User>(null)
    const [load, setLoad] = useState(true)
    const [error, setError] = useState(false)

    const router = useRouter()
    const query  = router.query as Query

    useEffect(() => {
        async function getUser() {
            if (query.uid === undefined) {
                return
            }

            const doc = await firebase
                .firestore()
                .collection('users')
                .doc(query.uid)
                .get()

            if (!doc.exists) {
                setError(true)
                return
            }

            const gotUser = doc.data() as User
            gotUser.uid = doc.id
            setUser(gotUser)
            setLoad(false)
        }
        getUser()
    }, [query.uid])

    return (
        <div>
            <Layout>
                <div>
                    {error ? (
                        <Error statusCode={404} />
                    ) : (
                        <Grid container alignItems="center" justify="center">
                            <Grid item className={classes.mt}>
                                {load ? (
                                    <Skeleton variant="circle"  width={96} height={96} />
                                ) : (
                                    <AvatarKit
                                        src={user.photoURL}
                                        class={"large"}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    )}
                </div>
            </Layout>
        </div>
    )
}

export default UserShow