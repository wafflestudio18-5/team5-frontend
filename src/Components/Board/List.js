import React, { useState } from "react";
import Card from "./Card.js";
import "./Board.css";

function List({ board, data, postCard }) {
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

  const addCard = () => {
    setCrtCard(true);
    //window.scrollTo(0,document.getElementsByClassName("board-cards").scrollHeight, 'smooth');
    //var objCards = document.getElementsByClassName("board-cards");
    //objCards.scrollTop = objCards.scrollHeight;
    var scroll = document.getElementsByClassName('board-cards');
    scroll.scrollTop = scroll.scrollHeight;
  }

  return (
    <div className="board-list">
      <h4>{data.name}</h4>
      <div className="board-cards" id={crtCard ? "board-cards-crtCard" : "board-cards-crtCard-x"}>
        {data.cards.map((card, index) => (
          <Card card={card} key={index} index={index} />
        ))}
          {crtCard? <div className="crtCard">
            <div id="crtCard_inputWrapper">
              <input
                className="addCard"
                onChange={(e) => setCardInput(e.target.value)}
                value={cardInput}
                placeholder="Enter a title for this card..."
              />
            </div>
            <button id="AddCard" onClick={createCard}>Add Card</button>
            <button id="no_crtList" onClick={no_crtCard}></button>
          </div> : <div/>}
      </div>
      {crtCard? <div/> :
           <button id="board-addcard" onClick={addCard}>
            <span id="board-addcard-plus">十 </span>Add another card
          </button>}      
    </div>
  );
}

export default List;
