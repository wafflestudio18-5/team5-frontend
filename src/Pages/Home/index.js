import React from 'react';
import { Route } from 'react-router-dom';
import { routes } from '../../Routes'

const HomePage = () => {
    return (
        <>
            <Route exact path={routes.Home.path} component={routes.Home.component} />
        </>
    )
}

export default HomePage;