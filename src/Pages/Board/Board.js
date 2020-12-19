import { Board } from "../../Components";
import React, { useEffect } from 'react';
import { useBoardContext } from '../../Contexts';

//  Board: { path: '/b/:board_code/:board_name', component: Board }

function BoardPage({ match }) {
  const { board, fetchBoard } = useBoardContext();
  console.log(fetchBoard);

  const fetch = async (match) => {
    fetchBoard({key: match.params.board_key});
  }

  useEffect(() => {
    fetch(match);
  }, []);

  return (
    <>
      <Board board={board} />
    </>
  );
}

export default BoardPage;
