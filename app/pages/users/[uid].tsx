import { useEffect, useState }  from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'

import { User } from '../../models/User'

type Query = {
    uid: string
}

const UserShow = () => {
    const [user, setUser] = useState<User>(null)

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
                return
            }

            const gotUser = doc.data() as User
            gotUser.uid = doc.id
            setUser(gotUser)
        }
        getUser()
    }, [query.uid])

    return <div>{user ? user.displayName : 'load...'}</div>
}

export default UserShow