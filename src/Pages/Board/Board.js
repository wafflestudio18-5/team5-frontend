import { Board } from "../../Components";
import React, { useEffect } from 'react';
import { useBoardContext } from '../../Contexts';
import { post } from "../../Server";

//  Board: { path: '/b/:board_code/:board_name', component: Board }

function BoardPage({ match }) {
  const { board, fetchBoard } = useBoardContext();

  const fetch = async (match) => {
    fetchBoard({key: match.params.board_key});
  }

  const postList = async (name) => {
    if(!name) return;
    await post('/api/v1/list', {board_id: board.id, name: name});
    fetch(match);
  }

  useEffect(() => {
    fetch(match);
  }, []);

  return (
    <>
      <Board board={board} postList={postList} />
    </>
  );
}

export default BoardPage;
