import { useContext } from 'react'

import { AuthContext } from '../contexts/auth'
import { User }        from '../models/User'

type HomeContextType = {
    user: User
    load: boolean
    signup: () => Promise<void>
}

export const Home = () => {
    const { user, load, signup }: HomeContextType = useContext(AuthContext)

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
