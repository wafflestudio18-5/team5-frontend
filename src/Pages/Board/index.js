import React from 'react';
import { Route, useRouteMatch, Redirect } from 'react-router-dom';
import { useBoardListContext } from '../../Contexts';
import { routes } from '../../Routes'

const BoardPage = () => {
    const match = useRouteMatch();
    const { getBoardByKey } = useBoardListContext();
    const board_key = match.params.board_key;
    const board_data = getBoardByKey(board_key);
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