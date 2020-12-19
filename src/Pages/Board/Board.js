import { Board } from "../../Components";
import React from 'react';
import { useBoardListContext, useListListContext } from '../../Contexts';

//  Board: { path: '/b/:board_code/:board_name', component: Board }

function BoardPage({ match }) {
  const { getBoardByKey } = useBoardListContext();
  const { getListsByIdArray } = useListListContext();
  const board_key = match.params.board_key;
  const board_data = getBoardByKey(board_key);

  const lists_id = board_data.lists;
  const lists_data = getListsByIdArray(lists_id);
  
  return (
    <>
      <Board board_data={board_data} lists_data={lists_data} />
    </>
  );
}

export default BoardPage;
