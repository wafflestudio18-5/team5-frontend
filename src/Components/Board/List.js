import React, { useState, useRef } from "react";
import Card from "./Card.js";
import apis from "../../Library/Apis";
import "./List.css";
import { useBoardContext } from "../../Contexts";

function List({
  board,
  data,
  postCard,
  deleteCard,
  postActivity,
  putActivity,
  deleteActivity,
}) {
  const newCardButton = useRef();
  const newCardInput = useRef();
  const scrollRef = useRef();
  const [crtCard, setCrtCard] = useState(false);
  const [cardInput, setCardInput] = useState("");
  const [removed, setRemoved] = useState({ id: data.id, bool: false });
  const [modalMode, setModalMode] = useState(false);
  const { move, setMove, fetchBoardById } = useBoardContext();

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
        data: {
          // 서버에서 req.body.{} 로 확인할 수 있다.
          id: data.id,
        },
        //withCredentials: true,
      })
      .then(function (response) {
        console.log("리스트 삭제하기 성공");
        setRemoved({ id: data.id, bool: true });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(
            "// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
          );
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log("// 요청이 이루어 졌으나 응답을 받지 못했습니다.");
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          console.log(
            "// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
          );
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const onMoveButton = () => {
    if (move.bool) {
      // if state is 'moving'
      if (move.mode === "list") {
        if (move.from.id === data.id) {
          setMove({ bool: false });
          return;
        }
        const tList = board.lists;
        console.log(tList);
        let fIndex = tList.findIndex(item => item.id === move.from.id);
        let tIndex = tList.findIndex(item => item.id === data.id);
        if(fIndex > tIndex) tIndex--;
        apis.list
          .put({
            board_id: board.id,
            list_id: move.from.id,
            name: move.from.name,
            prev_id: tList[tIndex].id
          })
          .then((response) => {
            console.log("debug");
            console.log(board);
            fetchBoardById({ id: board.id });
          })
          .catch((err) => console.log(err));
        setMove({ bool: false });
      } else {
        setMove({ bool: false });
      }
    } else {
      // if state is 'not moving'
      setMove({ bool: true, mode: "list", from: data });
    }
  }

  return (
    <div
      className={`board-list ${modalMode ? "up" : ""} ${
        move.from && move.from.id === data.id ? "moving" : ""
      }`}
    >
      <button className="moveButton" onClick={onMoveButton}>{move.bool? "to here" : "move"}</button>
      <div>
        <h4 style={{ wordBreak: "break-all" }}>{data.name}</h4>
        <button id="board-list-delete" onClick={deleteList}>
          DELETE
        </button>
      </div>
      <div className="board-cards" id={data.id} ref={scrollRef}>
        <div
          className={crtCard ? "board-cards-crtCard" : "board-cards-crtCard-x"}
        >
          {data.cards.map((card, index) => (
            <Card
              setModalMode={setModalMode}
              card={card}
              key={index}
              index={index}
              list_name={data.name}
              board_key={board.key}
              board_name={board.name}
              board_id={board.id}
              deleteCard={deleteCard}
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
