import React from 'react';
import Link from 'next/link';

import {
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HeaderMenu } from './HeaderMenu';

export const Layout = ({ children }) => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        <Link href="/">
                            Photos
                        </Link>
                    </Typography>
                    <HeaderMenu />
                </Toolbar>
            </AppBar>
            <div>{children}</div>
            <ToastContainer />

            <style jsx global>{`
                body {
                    margin: 0px;
                }

                a {
                    text-decoration: none;
                }

                a:link, a:visited, a:active {
                    color: white;
                }
            `}</style>
        </div>

    );
}