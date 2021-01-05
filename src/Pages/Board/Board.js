import { Board } from "../../Components";
import React, { useEffect } from "react";
import { useBoardContext, useUserContext } from "../../Contexts";
import apis from '../../Library/Apis';

function BoardPage({ match }) {
  const { board, fetchBoard } = useBoardContext();
  const { users } = useUserContext();

  const fetch = async (match) => {
    fetchBoard({ key: match.params.board_key });
  };

  const postActivity = (cId, content) => {
    if (!content) return;
    axios
      .post("/api/v1/activity/", { card_id: cId, content: content })
      .then((response) => fetch(match))
      .catch((err) => console.log(err));
  };

  const putActivity = (content, aId) => {
    if (!content) return;
    axios
      .put("/api/v1/activity/", { id: aId, content: content })
      .then((response) => fetch(match))
      .catch((err) => console.log(err));
  };

  const deleteActivity = (id) => {
    axios
      .delete("/api/v1/activity/", { id: id })
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
    axios
      .delete("/api/v1/card/", { id: card_id })
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
