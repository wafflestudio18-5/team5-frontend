import React from 'react';
import { Route } from 'react-router-dom';
import { routes } from '../../Routes'

const BoardPage = () => {
    // redirection 기능 구현해야 함
    return (
        <>
            <Route exact path={routes.Board.path} component={routes.Board.component} />
        </>
    )
}

export default BoardPage;