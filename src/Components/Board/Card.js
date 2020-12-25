import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import "./Board.css";
import { routes } from "../../Routes";

function Card({ card, index }) {

  const [cardPage, setCardPage] = useState(false);

  const cardClick = () => {
    console.log("cardclick");
    setCardPage(true);
  }
    return (
      <>
        <div className="board-card" 
        onClick={cardClick}
        style={index === 0 ? { marginTop: 0 } : { marginTop: 10 }}>
          <p style={{wordBreak: "break-all"}}>{card.name}</p>
        </div>
        {cardPage? <Route path={routes.CardPage.path} component={routes.CardPage.component} /> : <div/>}
      </>
    );
}

export default Card;

//        