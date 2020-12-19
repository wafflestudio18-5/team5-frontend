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

  return (
    <div className="board-list">
      <h4>{data.name}</h4>
      <div className="board-cards">
        {data.cards.map((card, index) => (
          <Card card={card} key={index} index={index} />
        ))}
      </div>
      <button id="board-addcard" onClick={() => setCrtCard(true)}>
        {crtCard ? (
          <>
            <input
              className="addCard"
              onChange={(e) => setCardInput(e.target.value)}
              value={cardInput}
              placeholder="name"
            />
            <button onClick={createCard}>확인</button>
          </>
        ) : (
          <>
            <span id="board-addcard-plus">十 </span>Add another card
          </>
        )}
      </button>
    </div>
  );
}

export default List;
