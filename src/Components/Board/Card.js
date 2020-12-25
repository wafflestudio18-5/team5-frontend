import React from 'react';
import { Link } from 'react-router-dom';
import "./Board.css";

function Card({ card, index }) {

    /*TODO key = card.key */
    const key = "keyBeforeBackendSetting";
    const dashedName = card.name.replaceAll(" ", "-");

    const cardPath = "/c/" + key + "/" + String(card.id) + "-" + dashedName; 

    return (
      <>
        <Link to={cardPath} style={{ textDecoration: 'none' }}>
          <div className="board-card" 
          style={index === 0 ? { marginTop: 0 } : { marginTop: 10 }}>
            <p style={{wordBreak: "break-all", color: 'black'}}>{card.name}</p>
          </div>
        </Link>
      </>
    );
}

export default Card;