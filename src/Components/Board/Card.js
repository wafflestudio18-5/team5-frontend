import React from 'react';
import './Board.css';

function Card({card, index}) {
    if (index === 0) {
        return (
            <div className="board-card" style={{marginTop: 0}}>
                <p>{card.card_name}</p>
            </div>
        );
    } else {
        return (
            <div className="board-card" style={{marginTop: 10}}>
                <p>{card.card_name}</p>
            </div>);
            }
}

export default Card;
