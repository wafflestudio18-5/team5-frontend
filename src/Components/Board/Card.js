import React from "react";
import "./Board.css";

function Card({ card, index }) {
  console.log(card);
  if (index === 0) {
    return (
      <div className="board-card" style={{ marginTop: 0 }}>
        <p>{card.name}</p>
      </div>
    );
  } else {
    return (
      <div className="board-card" style={{ marginTop: 10 }}>
        <p>{card.name}</p>
      </div>
    );
  }
}

export default Card;
