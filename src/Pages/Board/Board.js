import { Board } from "../../Components";
import React from 'react';
import { useBoardListContext, useListListContext } from '../../Contexts';

//  Board: { path: '/b/:board_code/:board_name', component: Board }

function BoardPage({ match }) {
  const { get_board_from_key } = useBoardListContext();
  const { get_lists_by_id_array } = useListListContext();
  const board_key = match.params.board_key;
  const board_data = get_board_from_key(board_key);

  const lists_id = board_data.lists;
  const lists_data = get_lists_by_id_array(lists_id);
  
  return (
    <>
      <Board board_data={board_data} lists_data={lists_data} />
    </>
  );
}

export default BoardPage;
