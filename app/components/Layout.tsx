import React from 'react';

import {
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core'

import { HeaderMenu }  from './HeaderMenu';

export const Layout = ({ children }) => {
    return (
        <div >
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Photos
                    </Typography>
                    <HeaderMenu />
                </Toolbar>
            </AppBar>
            <div>{children}</div>
        </div>
    );
}