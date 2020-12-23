import React from "react";
import "./Board.css";

function Card({ card, index }) {
  console.log(card);
    return (
      <div className="board-card" style={index === 0 ? { marginTop: 0 } : { marginTop: 10 }}>
        <p style={{wordBreak: "break-all"}}>{card.name}</p>
      </div>
    );
}

export default Card;
