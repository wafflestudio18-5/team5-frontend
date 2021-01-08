import React, { useState, useRef } from "react";
import Card from "./Card.js";
import apis from "../../Library/Apis";
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { XYCoord } from 'dnd-core'
import "./List.css";
import { useBoardContext } from "../../Contexts";

function List({ board, data, index, postCard, putCard, deleteCard, postActivity, putActivity, deleteActivity, moveList }) {
  const newCardButton = useRef();
  const newCardInput = useRef();
  const scrollRef = useRef();
  const [crtCard, setCrtCard] = useState(false);
  const [cardInput, setCardInput] = useState("");
  const [removed, setRemoved] = useState({ id: data.id, bool: false });
  const [modalMode, setModalMode] = useState(false);
  const { move, setMove, fetchBoardById, applyListPos, changeListPos } = useBoardContext();

  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: 'list',
    hover(item, monitor) {
      if(!move) setMove(true);
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientX = (clientOffset).x - hoverBoundingRect.left

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return
      }

      // Time to actually perform the action
      changeListPos(dragIndex, hoverIndex);
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'list', id: data.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end() {
      applyListPos(board);
    }
  })

  drag(drop(ref))

  const createCard = () => {
    postCard(board.id, data.id, cardInput);
    setCrtCard(false);
    setCardInput("");
  };

  const createCardEnter = (e) => {
    if (e.key === "Enter") {
      createCard();
    }
  };

  const no_crtCard = () => {
    setCrtCard(false);
    setCardInput("");
  };

  const scroll = (ref) => {
    ref.current.scrollTop = ref.current.scrollHeight;
    ref.current.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const addCard = () => {
    setCrtCard(true);
    newCardButton.current.focus({ preventScroll: false });
    scroll(scrollRef);
  };

  const deleteList = () => {
    apis.list
      .delete({
        id: data.id,
        //withCredentials: true,
      })
      .then(function (response) {
        console.log("리스트 삭제하기 성공");
        fetchBoardById({ id: board.id} );
        setRemoved({ id: data.id, bool: true });
      })
      .catch(function (error) {
        if (error.response) {
          console.log("요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
          );
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log("요청이 이루어 졌으나 응답을 받지 못했습니다.");
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          console.log("오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
          );
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <div
      ref={ref}
      draggable="true"
      style={{display: 'flex', flexDirection: 'column'}}
      className={`board-list ${modalMode ? "up" : ""} ${
        move.from && move.from.id === data.id ? "moving" : ""
      }`}
    >
      <div style={{display: 'float'}}>
        <h4 style={{wordBreak: "break-all", float: 'left'}}>{data.name}</h4>
        <button style={{position: 'absolute', float: 'right', right: '50px', width: '30px'}} id="board-list-delete" onClick={deleteList}>
          DEL
        </button>
      </div>
      <div className="board-cards" id={data.id} ref={scrollRef}>
        <div
          className={crtCard ? "board-cards-crtCard" : "board-cards-crtCard-x"}
        >
          {data.cards.map((card, index) => (
            <Card
              list={data}
              setModalMode={setModalMode}
              card={card}
              key={index}
              index={index}
              list_name={data.name}
              board_key={board.key}
              board_name={board.name}
              board_id={board.id}
              deleteCard={deleteCard}
              putCard={putCard}
              postActivity={postActivity}
              putActivity={putActivity}
              deleteActivity={deleteActivity}

            />
          ))}
          <div className="crtCard" style={crtCard ? {} : { display: "none" }}>
            <div id="crtCard_inputWrapper">
              <input
                className="addCard"
                onChange={(e) => setCardInput(e.target.value)}
                value={cardInput}
                ref={newCardInput}
                placeholder="Enter a title for this card..."
                onKeyPress={createCardEnter}
              />
            </div>
            <button
              id="AddCard"
              ref={newCardButton}
              onKeyPress={createCardEnter}
              onClick={createCard}
            >
              Add Card
            </button>
            <button id="no_crtCard" onClick={no_crtCard}></button>
          </div>
        </div>
      </div>
      <button
        style={crtCard ? { display: "none" } : {}}
        id="board-addcard"
        onClick={addCard}
      >
        <span id="board-addcard-plus">十 </span>Add another card
      </button>
    </div>
  );
}

export default List;
