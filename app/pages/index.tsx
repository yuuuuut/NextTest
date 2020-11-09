import { useContext } from 'react'

import firebase        from 'firebase/app'
import { AuthContext } from '../contexts/auth'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { Layout } from '../components/Layout'

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: "/",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
}

export const Home = () => {
    const { user, load } = useContext(AuthContext)

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

            <style jsx>{`
                .t-color {
                    color: red;
                }
            `}</style>
        </div>
    )
}

export default Home
