import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Board.css";
import CardModal from '../CardModal/CardModal';

function Card({ card, index, list_name, board_key, board_name, board_id, deleteCard, postActivity, putActivity, deleteActivity }) {

    const [cardPage, setCardPage] = useState(false);

    const key = card.key;
    const dashedName = card.name.replaceAll(" ", "-");
    const cardPath = "/c/" + key + "/" + String(card.id) + "-" + dashedName;
    const boardPath = "/b/" + board_key + "/" + board_name;

    const [cardName, setCardName] = useState(card.name);

    const cardClick = () => {
      setCardPage(true);
      window.history.pushState({data: '바뀐 주소와 함께 저장할 데이터 객체가 이 첫 번째 파라미터. 바뀔 페이지의 정보들을 담아두고 클라이언트에서 정보를 활용해 새로운 페이지를 렌더링하면 된다. 정보는 history.state로 접근하면 된다.'}, '바꿀 제목', cardPath); // 바꿀 주소 앞에 점 찍으면 상대 주소 됨. 우리는 해당 사항 없음
    }

    const exitModal = () => {
      setCardPage(false);
      window.history.pushState({data: '바뀐 주소와 함께 저장할 데이터 객체가 이 첫 번째 파라미터. 바뀔 페이지의 정보들을 담아두고 클라이언트에서 정보를 활용해 새로운 페이지를 렌더링하면 된다. 정보는 history.state로 접근하면 된다.'}, '바꿀 제목', boardPath); // 바꿀 주소 앞에 점 찍으면 상대 주소 됨. 우리는 해당 사항 없음
    }

    /*TODO history 없이 띡 /c/로 시작하는 url이 입력됐다면 어떻게 할 지 결정할 것!*/
    return (
      <>
        <div className="board-card" 
          onClick={cardClick}
          style={{ marginTop: (index === 0 ? 0 : 10)}}>
          <p style={{wordBreak: "break-all", color: 'black'}}>{cardName}</p>
        </div>
        {cardPage? <CardModal setCardName={setCardName} card_key={key} card={card} exit={exitModal} list_name={list_name} board_id={board_id} deleteCard={deleteCard}
        postActivity={postActivity} putActivity={putActivity} deleteActivity={deleteActivity}/> : <></>}
      </>
    );
}

export default Card;