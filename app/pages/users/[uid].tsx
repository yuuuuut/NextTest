import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'

import { UserShowHeader } from '../../components/users/UserShowHeader'
import { Layout } from '../../components/Layout'
import { User } from '../../models/User'
import firebase from 'firebase/app'

/** Types */
type Query = {
  uid: string
}

/** Main */
const UserShow = () => {
  const [user, setUser] = useState<User | null>(null)
  const [load, setLoad] = useState(true)
  const [error, setError] = useState(false)

  const router = useRouter()
  const query = router.query as Query

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

      setTimeout(() => {
        setLoad(false)
      }, 100)
    }
    getUser()
  }, [query.uid])

  return (
    <div>
      <Layout>
        {error ? (
          <Error statusCode={404} />
        ) : (
          <>{user && <UserShowHeader user={user} load={load} />}</>
        )}
      </Layout>
    </div>
  )
}

export default UserShow
