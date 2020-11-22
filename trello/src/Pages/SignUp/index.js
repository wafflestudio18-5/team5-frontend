import React from 'react';
import { Route } from 'react-router-dom';
import { routes } from '../../Routes'

const SignUpPage = () => {
    return (
        <>
        <Route exact path={routes.SignUp.path} component={routes.SignUp.component} />
        </>
    )
}

export default SignUpPage;