/* eslint-disable no-console */
import firebase from 'firebase/app'
import { useState} from 'react'

type User = {
    uid: string
    name: string
}

export const Home = () => {
    const [user, setUser] = useState<User>()

    const login = () => {
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider)
            .then((user) => {
                console.log(user.user)
                const u = user.user
                setUser({
                    uid: u.uid,
                    name: u.displayName,
                })
            }).catch((error) => {
                console.error(error)
            })
    }

    return (
        <div>
            {user ? (
                <h1 className="t-color">
                    Login{user.name}
                </h1>
            ) : (
                <button onClick={login}>Login</button>
            )}

            <style jsx>{`
                .t-color {
                    color: red;
                }
            `}</style>
        </div>
    )
}

export default Home
