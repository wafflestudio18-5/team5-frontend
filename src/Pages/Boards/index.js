import React from 'react';
import { Route } from 'react-router-dom';
import { routes } from '../../Routes'

const BoardsPage = () => {
    return (
        <>
            <Route exact path={routes.Boards.path} component={routes.Boards.component} />
        </>
    )
}

export default BoardsPage;