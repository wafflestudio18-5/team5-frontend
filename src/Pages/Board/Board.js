import { Board } from "../../Components";
import React from 'react';
import { useBoardContext } from '../../Contexts';

//  Board: { path: '/b/:board_code/:board_name', component: Board }

function BoardPage({ match }) {
  const { board } = useBoardContext();
  console.log(board);

  return (
    <>
      <Board board={board} />
    </>
  );
}

export default BoardPage;
