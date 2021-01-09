import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from '../../Library/Routes'

const BoardPage = () => {
    const board_data = true; // TODO: 원래 해당 key에 대한 board가 존재하는가에 대한 변수임.
    if(board_data) {
        return (
            <>
                <Route exact path={routes.Board.path} component={routes.Board.component} />
            </>
        )
    }
    else {
        return (
            <Redirect to='/' />
        )
    }
    
}

export default BoardPage;