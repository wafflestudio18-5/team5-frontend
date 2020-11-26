import React from 'react';
import './Board.css';

function Card({card}) {
    return (
        <div className="board-card">
            <p>{card.card_name}</p>
        </div>)
}

export default Card;

// {card_name: '카드하나'}