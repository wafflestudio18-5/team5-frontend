import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { routes } from '../../Library/Routes'

const SignUpPage = () => {
    return (
        <>
            <Route exact path={routes.SignUp.path} component={routes.SignUp.component} />
            <Redirect to='/signup/'/>
        </>
    )
}

export default SignUpPage;