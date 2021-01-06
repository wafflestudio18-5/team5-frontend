import { Board } from "../../Components";
import React, { useEffect } from "react";
import { useBoardContext, useUserContext } from "../../Contexts";
import apis from '../../Library/Apis';

function BoardPage({ match }) {
  const { board, modal, fetchBoardByKey } = useBoardContext();
  const { users } = useUserContext();

  const fetch = (match) => {
    fetchBoardByKey({ key: match.params.board_key });
  };

  const postActivity = (cId, content) => {
    if (!content) return;
    apis.activity.post({ card_id: cId, content })
      .then((response) => fetch(match))
      .catch((err) => console.log(err));
  };

  const putActivity = (content, aId) => {
    if (!content) return;
    apis.activity.put({ id: aId, content })
      .then((response) => fetch(match))
      .catch((err) => console.log(err));
  };

  const deleteActivity = (id) => {
    apis.activity.delete({ id })
      .then((response) => fetch(match))
      .catch((err) => console.log(err));
  };

  const postCard = (bId, lId, name) => {
    if (!name) return;
    apis.card.post({ board_id: bId, list_id: lId, name: name })
      .then((response) => fetch(match))
      .catch((err) => console.log(err));
  };

  const deleteCard = (card_id) => {
    apis.card.delete( { id: card_id })
      .then((response) => fetch(match))
      .catch((err) => console.log(err));
  };

  const postList = (bId, name) => {
    if (!name) return;
    apis.list.post({ board_id: bId, name: name })
      .then((response) => fetch(match))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(match);
  }, []);

  return (
    <>
      <Board
        board={board}
        modal={modal}
        postList={postList}
        postCard={postCard}
        deleteCard={deleteCard}
        postActivity={postActivity}
        putActivity={putActivity}
        deleteActivity={deleteActivity}
        users={users}
      />
    </>
  );
}

export default BoardPage;
