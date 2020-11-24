import React from 'react';
import { Route } from 'react-router-dom';
import { routes } from '../../Routes'

const LoginPage = () => {
    return (
        <>
            <Route exact path={routes.Login.path} component={routes.Login.component} />
        </>
    )
}

export default LoginPage;