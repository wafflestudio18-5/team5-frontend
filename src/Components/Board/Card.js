import "./Board.css";
import CardModal from "../CardModal/CardModal";
import apis from "../../Library/Apis";
import { useBoardContext } from "../../Contexts";
import React, { useState, useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";

const _sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function Card({
  card,
  list,
  index,
  list_name,
  board_key,
  board_name,
  board_id,
  putCard,
  setModalMode,
  deleteCard,
  postActivity,
  putActivity,
  deleteActivity,
}) {
  const [cardPage, setCardPage] = useState(false);
  const key = card.key;
  const dashedName = card.name.replaceAll(" ", "-");
  const cardPath = "/c/" + key + "/" + String(card.id) + "-" + dashedName;
  const boardPath = `/b/${String(board_id).padStart(8,'0')}/${board_name}`;
  const { setModal } = useBoardContext();
  const [cardName, setCardName] = useState(card.name);
  const { cInd, move, changeCardPos, setMove, fetchBoardById } = useBoardContext();

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "list",
    hover(item, monitor) {
      if (!move) setMove(true);
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const hoverLimitY = hoverBoundingRect.top + 43;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;
      changeCardPos(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", id: card.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end() {
      console.log(cInd);
      if (cInd === null) {
        console.log("변경사항 없음");
        return;
      }
      
      const reqBody = cInd
        ? {
            id: card.id,
            list_id: list.id,
            // prev_id: lists[cInd - 1].id,
          }
        : {
            id: card.id,
            list_id: list.id
          };

      apis.list
        .put(reqBody)
        .then(async response => {
          await _sleep(200);
          fetchBoardById({ id: board_id })})
        .catch((err) => console.log(err));
    },
  });

  drag(drop(ref));

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

  const onMoveButton = () => {
    if (move.bool) {
      // if state is 'moving'
      if (move.mode === "card") {
        if (move.from.id === card.id) {
          setMove({ bool: false });
          return;
        }
        const tList = list.cards;
        let fIndex = tList.findIndex((item) => item.id === move.from.id);
        let tIndex = tList.findIndex((item) => item.id === card.id);

        if (fIndex > tIndex) tIndex--;
        const reqBody =
          tIndex === -1
            ? {
                id: move.from.id,
                list_id: list.id,
              }
            : {
                id: move.from.id,
                list_id: list.id,
                prev_id: tList[tIndex].id,
              };
        apis.card
          .put(reqBody)
          .then((response) => {
            fetchBoardById({ id: board_id });
            setMove({ bool: false });
          })
          .catch((err) => console.log(err));
      } else {
        setMove({ bool: false });
      }
    } else {
      // if state is 'not moving'
      setMove({ bool: true, mode: "card", from: card });
    }
  };

  /*TODO history 없이 띡 /c/로 시작하는 url이 입력됐다면 어떻게 할 지 결정할 것!*/
  return (
    <div className="board-card-wrapper" style={{cursor: 'pointer'}}>
      <div
        className="board-card"
        onClick={cardClick}
        style={{ marginTop: index === 0 ? 0 : 10 }}
      >
        <p style={{ wordBreak: "break-all", color: "black" }}>{cardName}</p>
      </div>
      <button className="moveButton" id="card" onClick={onMoveButton}>
        {move.mode === "card" ? "T" : "M"}
      </button>
      {cardPage ? (
        <CardModal
          cardName={cardName}
          setCardName={setCardName}
          card_key={key}
          card_id={card.id}
          exit={exitModal}
          list_name={list_name}
          board_id={board_id}
          putCard={putCard}
          deleteCard={deleteCard}
          postActivity={postActivity}
          putActivity={putActivity}
          deleteActivity={deleteActivity}
        />
      ) : null}
    </div>
  );
}

export default Card;
