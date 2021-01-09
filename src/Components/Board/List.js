import React, { useState, useRef } from "react";
import Card from "./Card.js";
import apis from "../../Library/Apis";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./List.css";
import { useBoardContext } from "../../Contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLevelDownAlt,
  faEllipsisV,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { _sleep } from '../../Library/Timer';


function List({
  board,
  data,
  index,
  postCard,
  putCard,
  deleteCard,
  putActivity,
  deleteActivity,
  boardUsers
}) {
  const newCardButton = useRef();
  const newCardInput = useRef();
  const scrollRef = useRef();
  const [crtCard, setCrtCard] = useState(false);
  const [cardInput, setCardInput] = useState("");
  const [removed, setRemoved] = useState({ id: data.id, bool: false });
  const [modalMode, setModalMode] = useState(false);
  const [options, setOptions] = useState(false);
  const [newName, setNewName] = useState("");
  const [modifying, setModifying] = useState(false);
  const {
    move,
    lInd,
    setMove,
    fetchBoardById,
    changeListPos,
  } = useBoardContext();

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "list",
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;
      changeListPos(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: "list", id: data.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end() {
      console.log(lInd);
      if (lInd === null) {
        console.log("변경사항 없음");
        return;
      }
      const lists = [...board.lists];
      const id = board.id;

      const reqBody = lInd
        ? {
            board_id: id,
            list_id: lists[lInd].id,
            prev_id: lists[lInd - 1].id,
          }
        : {
            board_id: id,
            list_id: lists[lInd].id,
          };

      if(lInd && reqBody.list_id === reqBody.prev_id) return;

      apis.list
        .put(reqBody)
        .then(async (response) => {
          await _sleep(200);
          fetchBoardById({ id });
        })
        .catch((err) => console.log(err));
    },
  });

  drag(drop(ref));

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
    newCardInput.current.focus({ preventScroll: false });
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
        fetchBoardById({ id: board.id });
        setRemoved({ id: data.id, bool: true });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(
            "요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
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
          console.log(
            "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
          );
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const onMoveCardToHere = () => {
    apis.card
      .put({ id: move.from.card.id, list_id: data.id })
      .then((response) => {
        fetchBoardById({ id: board.id });
        setMove({ bool: false });
      })
      .catch((err) => console.log(err));
  };

  const modifyList = () => {
    setOptions(false);
    setModifying(true);
    setNewName(data.name);
  };

  const modifyName = () => {
    apis.list
      .put({ list_id: data.id, name: newName })
      .then(response => {setModifying(false); fetchBoardById({id: board.id})})
      .catch((err) => console.log(err));
  };

  return (
    <div
      ref={ref}
      draggable="true"
      style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
      className={`board-list ${modalMode ? "up" : ""}`}
    >
      <div className="board-list-headers" style={{ display: "float" }}>
        <button onClick={modifyList} className={`modify ${options}`}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button onClick={deleteList} className={`delete ${options}`}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className="list-down" onClick={() => onMoveCardToHere()}>
          <FontAwesomeIcon icon={faLevelDownAlt} />
        </button>
        <span
          className={`list-down ${
            move.bool && data.cards.length === 0 ? "visible" : "invisible"
          }`}
          onClick={() => {
            if (!modifying) setOptions(!options);
          }}
        >
          {move.bool ? null : (
            <FontAwesomeIcon
              className={`optionIcon ${options}`}
              icon={faEllipsisV}
            />
          )}
        </span>
        {modifying ? (
          <input
            className="modifyInput"
            value={newName}
            placeholder="enter new name"
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") modifyName();
            }}
          />
        ) : (
          <h4 style={{ wordBreak: "break-all", float: "left" }}>{data.name}</h4>
        )}
      </div>
      <div className="board-cards" id={data.id} ref={scrollRef}>
        <div
          className={crtCard ? "board-cards-crtCard" : "board-cards-crtCard-x"}
        >
          <DndProvider backend={HTML5Backend}>
            {data.cards.map((card, index) => (
              <Card
                list={data}
                listIndex={index}
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
                putActivity={putActivity}
                deleteActivity={deleteActivity}
                boardUsers={boardUsers}
              />
            ))}
          </DndProvider>
          <div
            className="crtCard"
            style={crtCard ? { cursor: "text" } : { display: "none" }}
          >
            <div id="crtCard_inputWrapper" style={{ display: "flex" }}>
              <textarea
                className="addCard"
                onChange={(e) => setCardInput(e.target.value)}
                value={cardInput}
                style={{
                  fontSize: 15,
                  minHeight: 40,
                  height: "fit-content",
                  overflowY: "auto",
                  width: 410,
                }}
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
        <div style={{ display: "flex" }}>
          <button
            style={crtCard ? { display: "none" } : {}}
            id="board-addcard"
            onClick={addCard}
          >
            <span id="board-addcard-plus">十 </span>Add another card
          </button>
        </div>
      </div>
    </div>

  );
}

export default List;
