import { useContext } from 'react'

import firebase        from 'firebase/app'
import { AuthContext } from '../contexts/auth'
import { User }        from '../models/User'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { Layout } from '../components/Layout'

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: "/",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
}

type HomeContextType = {
    user: User
    load: boolean
    signout: () => Promise<void>
}

export const Home = () => {
    const { user, load, signout }: HomeContextType = useContext(AuthContext)

    return (
        <div>
            <Layout>
            {load ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {user ? (
                        <h1 className="t-color">
                            Login{user.displayName}
                            <img src={user.photoURL} />
                            <button onClick={signout}>Logout</button>
                        </h1>
                    ) : (
                        <div>
                            <StyledFirebaseAuth
                                uiConfig={uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                        </div>
                    )}
                </div>
            )}
            </Layout>

            <style jsx global>{`
                body {
                    margin: 0px;
                }
            `}</style>

            <style jsx>{`
                .t-color {
                    color: red;
                }
            `}</style>
        </div>
    )
}

export default Home
