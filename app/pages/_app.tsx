import React, { useEffect } from 'react'

import { ThemeProvider } from '@material-ui/core'
import { AuthProvider }  from '../contexts/auth'
import theme from '../components/theme'

import '../lib/firebase'

const MyApp = ({ Component, pageProps }: any) => {

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');

        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    )
}

export default MyApp
