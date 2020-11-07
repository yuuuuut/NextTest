import React, { useContext } from 'react';

import {
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core'

import { AuthContext } from '../contexts/auth';
import { HeaderMenu }  from './HeaderMenu';

export const Layout = ({ children }) => {
    const { user } = useContext(AuthContext)

    return (
        <div >
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Photos
                    </Typography>
                    {user && (
                        <HeaderMenu user={user} />
                    )}
                </Toolbar>
            </AppBar>
            <div>{children}</div>
        </div>
    );
}