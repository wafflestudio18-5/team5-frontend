import "./Card.css";
import CardModal from "../CardModal/CardModal";
import apis from "../../Library/Apis";
import { useBoardContext } from "../../Contexts";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faLevelUpAlt,
  faLevelDownAlt,
} from "@fortawesome/free-solid-svg-icons";

function Card({
  card,
  list,
  index,
  listIndex,
  list_name,
  board_key,
  board_name,
  board_id,
  putCard,
  setModalMode,
  deleteCard,
  putActivity,
  deleteActivity,
  boardUsers
}) {
  const [cardPage, setCardPage] = useState(false);
  const { setModal } = useBoardContext();
  const { move, setMove, fetchBoardById } = useBoardContext();
  if(!card) return <div>Loading...</div>
  const key = card.key;
  const dashedName = card.name.replaceAll(" ", "-");
  const cardPath = "/c/" + key + "/" + card.id + "-" + dashedName;
  const boardPath = `/b/${board_key}/${board_name}`;
  const cardClick = () => {
    setModalMode(true);
    setModal(true);
    setCardPage(true);
    window.history.pushState(
      {
        data:
          "바뀐 주소와 함께 저장할 데이터 객체가 이 첫 번째 파라미터. 바뀔 페이지의 정보들을 담아두고 클라이언트에서 정보를 활용해 새로운 페이지를 렌더링하면 된다. 정보는 history.state로 접근하면 된다.",
      },
      "바꿀 제목",
      cardPath
    ); // 바꿀 주소 앞에 점 찍으면 상대 주소 됨. 우리는 해당 사항 없음
  };

  const exitModal = () => {
    setModalMode(false);
    setModal(false);
    setCardPage(false);
    window.history.pushState(
      {
        data:
          "바뀐 주소와 함께 저장할 데이터 객체가 이 첫 번째 파라미터. 바뀔 페이지의 정보들을 담아두고 클라이언트에서 정보를 활용해 새로운 페이지를 렌더링하면 된다. 정보는 history.state로 접근하면 된다.",
      },
      "바꿀 제목",
      boardPath
    ); // 바꿀 주소 앞에 점 찍으면 상대 주소 됨. 우리는 해당 사항 없음
  };

  const onMoveToCard = (dir) => {
    if (!move.bool) return;

    const targetList = list.id;
    let targetId;

    let nowIndex = index;

    switch (dir) {
      case "up":
        if (nowIndex) targetId = list.cards[nowIndex - 1].id;
        else targetId = null;
        nowIndex--;
        break;
      case "down":
        targetId = card.id;
        break;
      default:
        console.log("cannot reach here");
        break;
    }

    // if state is 'moving'
    if (move.from.id === card.id) {
      setMove({ bool: false });
      return;
    }

    const reqBody =
      targetId
        ? {
            id: move.from.card.id,
            list_id: targetList,
            prev_id: targetId
          }
        : {
            id: move.from.card.id,
            list_id: targetList
          };
    apis.card
      .put(reqBody)
      .then((response) => {        
        fetchBoardById({ id: board_id });
        setMove({ bool: false });
      })
      .catch((err) => console.log(err));
  };

  const onMoveButton = () => {
    if (move.bool) return;
    // if state is 'not moving'
    setMove({ bool: true, mode: "card", from: {listIndex, cardIndex: index, list, card} });
  };

  /*TODO: history 없이 띡 /c/로 시작하는 url이 입력됐다면 어떻게 할 지 결정할 것!*/
  return (
    <div className="board-card-wrapper" style={{ cursor: "pointer" }}>
      {!move.bool ? (
        <>
          <button className="go" onClick={cardClick}>
            <FontAwesomeIcon icon={faSignInAlt} />
          </button>
          <button className="move" onClick={onMoveButton}>
            =
          </button>
          <div
            className="board-card"
            style={{ marginTop: index === 0 ? 0 : 10 }}
          >
            {card.name}
          </div>
        </>
      ) : (
        <>
          <button className="up" onClick={() => onMoveToCard("up")}>
            <FontAwesomeIcon icon={faLevelUpAlt} />
          </button>
          <button className="down" onClick={() => onMoveToCard("down")}>
            <FontAwesomeIcon icon={faLevelDownAlt} />
          </button>
          <div
            className="board-card moving"
            style={{ marginTop: index === 0 ? 0 : 10 }}
          >
            {card.name}
          </div>
        </>
      )}

      {cardPage ? (
        <CardModal
          cardName={card.name}
          card_key={key}
          card_id={card.id}
          exit={exitModal}
          list_name={list_name}
          board_id={board_id}
          putCard={putCard}
          deleteCard={deleteCard}
          putActivity={putActivity}
          deleteActivity={deleteActivity}
          boardUsers={boardUsers}
        />
      ) : null}
    </div>
  );
}

export default Card;
