import React from 'react';
import './Board.css';

function Card({card}) {
    return (
        <div className="board-card">
            <h2>{card.card_name}</h2>
        </div>)
}

export default Card;

// {card_name: '카드하나'}