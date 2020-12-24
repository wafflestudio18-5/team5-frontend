import React, { useState, useRef } from "react";
import Card from "./Card.js";
import "./Board.css";

function List({ board, data, postCard }) {
  const newCardButton = useRef();
  const newCardInput = useRef();
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

  const scroll = (id) => {
    var scroll = document.getElementById(id);
    //scroll.scrollTop = scroll.scrollHeight + 500000;
    scroll.scrollTo({
      top: scroll.scrollHeight,
      behavior: 'smooth', // or can get `auto` variable
    });
  }

  const addCard = () => {
    setCrtCard(true);
    scroll(data.id);
    newCardButton.current.focus({preventScroll:false});
    newCardInput.current.focus({preventScroll:false});
  }

  return (
    <div className="board-list">
      <h4>{data.name}</h4>
      <div className="board-cards" id={data.id}>
        <div className={crtCard ? "board-cards-crtCard" : "board-cards-crtCard-x"}>
          {data.cards.map((card, index) => (
            <Card card={card} key={index} index={index} />
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
