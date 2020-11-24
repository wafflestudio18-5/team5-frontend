import React from 'react';
import { Route } from 'react-router-dom';
import { routes } from '../../Routes'

const BoardPage = () => {
    return (
        <>
            <Route exact path={routes.Board.path} component={routes.Board.component} />
        </>
    )
}

export default BoardPage;