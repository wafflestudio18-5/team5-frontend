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

  const postCard = async (bId, lId, name) => {
    console.log('adsf');
    if(!name) return;
    await post('/api/v1/card', {board_id: bId, list_id: lId, name: name});

    fetch(match);
  }

  const postList = async (bId, name) => {
    if(!name) return;
    await post('/api/v1/list', {board_id: bId, name: name});
    fetch(match);
  }

  useEffect(() => {
    fetch(match);
  }, []);

  return (
    <>
      <Board board={board} postList={postList} postCard={postCard} />
    </>
  );
}

export default BoardPage;
