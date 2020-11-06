import { useContext } from 'react'

import { AuthContext } from '../contexts/auth'
import { User }        from '../models/User'

type HomeContextType = {
    user: User
    load: boolean
    signup: () => Promise<void>
    signout: () => Promise<void>
}

export const Home = () => {
    const { user, load, signup, signout }: HomeContextType = useContext(AuthContext)

    return (
        <div>
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
                        <button onClick={signup}>Login</button>
                    )}
                </div>
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
