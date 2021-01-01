import { Board } from "../../Components";
import React, { useEffect } from "react";
import { useBoardContext, useUserContext } from "../../Contexts";
import { post } from "../../Server";
import axios from "axios";

function BoardPage({ match }) {
  const { board, fetchBoard } = useBoardContext();
  const { users } = useUserContext();

  const fetch = async (match) => {
    fetchBoard({ key: match.params.board_key });
  };

  const postCard = (bId, lId, name) => {
    if (!name) return;
    axios
      .post("/api/v1/card/", { board_id: bId, list_id: lId, name: name })
      .then((response) => fetch(match))
      .catch((err) => console.log(err));
  };

  const postList = (bId, name) => {
    if (!name) return;
    axios
      .post("/api/v1/list/", { board_id: bId, name: name })
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
        users={users}
      />
    </>
  );
}

export default BoardPage;
