import { useEffect, useState }  from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'

import firebase from 'firebase/app'
import { User } from '../../models/User'
import { Layout } from '../../components/Layout'

type Query = {
    uid: string
}

const UserShow = () => {
    const [user, setUser] = useState<User>(null)
    const [load, setLoad] = useState(true)

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
                setLoad(false)
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
                {load ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        {user ? (
                            <div>{user.displayName}</div>
                        ) : (
                            <Error statusCode={404} />
                        )}
                    </div>
                )}
            </Layout>
        </div>
    )
}

export default UserShow