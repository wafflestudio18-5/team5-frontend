import React, { useState, useRef } from "react";
import Card from "./Card.js";
import "./Board.css";

function List({ board, data, postCard }) {
  const newCardButton = useRef();
  const newCardInput = useRef();
  const scrollRef = useRef();
  const [crtCard, setCrtCard] = useState(false);
  const [cardInput, setCardInput] = useState("");

  const createCard = () => {
    postCard(board.id, data.id, cardInput);
    setCrtCard(false);
    setCardInput('');
  }

  const no_crtCard = () => {
    setCrtCard(false)
    setCardInput("")
  }

  const scroll = (ref) => {
    ref.current.scrollTop = ref.current.scrollHeight;
    ref.current.scrollTo({
      top: ref.current.scrollHeight,
      behavior: 'smooth',
    });
  }

  const addCard = () => {
    setCrtCard(true);
    newCardButton.current.focus({preventScroll: false});
    scroll(scrollRef);
  }

  return (
    <div className="board-list">
      <h4 style={{wordBreak: "break-all"}}>{data.name}</h4>
      <div className="board-cards" id={data.id} ref={scrollRef}>
        <div className={crtCard ? "board-cards-crtCard" : "board-cards-crtCard-x"}>
          {data.cards.map((card, index) => (
            <Card card={card} key={index} index={index} board_key={board.key} board_name={board.name}/>
          ))}
            <div className="crtCard" style={crtCard? {} : {display: 'none'}}>
              <div id="crtCard_inputWrapper">
                <input
                  className="addCard"
                  onChange={(e) => setCardInput(e.target.value)}
                  value={cardInput}
                  ref={newCardInput}
                  placeholder="Enter a title for this card..."
                />
              </div>
              <button id="AddCard" ref={newCardButton} onClick={createCard}>Add Card</button>
              <button id="no_crtList" onClick={no_crtCard}></button>
            </div>
        </div>
      </div>
          <button style={crtCard? {display: 'none'} : {}} id="board-addcard" onClick={addCard}>
            <span id="board-addcard-plus">十 </span>Add another card
          </button> 
    </div>
  );
}

export default List;
