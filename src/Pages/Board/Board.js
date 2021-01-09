import { Board } from "../../Components";
import React, { useEffect } from "react";
import { useBoardContext, useUserContext } from "../../Contexts";
import apis from '../../Library/Apis';

function BoardPage({ match }) {
  const { board, users, modal, fetchBoardByKey } = useBoardContext();
  const { userList } = useUserContext();

  const fetch = async (match) => {
    fetchBoardByKey({ key: match.params.board_key });
  };

  const putActivity = (content, aId) => {
    if (!content) return;
    apis.activity.put({ id: aId, content })
      .then((response) => fetch(match))
      .catch((err) => console.log(err));
  };

  const deleteActivity = (id) => {
    apis.activity.delete({ id: id })
      .then((response) => fetch(match))
      .catch((err) => console.log(err));
  };

  const postCard = (bId, lId, name) => {
    if (!name) return;
    apis.card.post({ board_id: bId, list_id: lId, name: name })
      .then((response) => fetch(match))
      .catch((err) => console.log(err));
  };

  const putCard = ({cId, member=null, name=null, description=null, due_date=null, prev_id=null, list_id=null}) => {
    if (!cId) return;
    (member !== null) ? apis.card.put({ id: cId, member: member }) :
    (name !== null) ? apis.card.put({ id: cId, name: name }) :
    (description !== null) ? apis.card.put({ id: cId, description: description }) :
    (due_date !== null) ? apis.card.put({ id: cId, due_date: due_date }) :
    apis.card.put({ id: cId, list_id: list_id, prev_id: prev_id})
      .then((response) => fetch(match))
      .catch((err) => console.log(err))
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
        putCard={putCard}
        deleteCard={deleteCard}
        putActivity={putActivity}
        deleteActivity={deleteActivity}
        boardUsers={users}
        userList={userList}
      />
    </>
  );
}

export default BoardPage;
