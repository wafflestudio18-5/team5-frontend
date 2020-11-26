import React from 'react';
import Card from './Card.js';
import './Board.css';

function List({listname, list}) {
    return (
        <div className="board-list">
        <h3>{listname}</h3>
            {list.map(card => (<Card card={card} />))}
        <p>addCard</p>
        </div>
    )
}

export default List;

// {list_name: '첫번째리스트',
//      cards: [{card_name: '카드하나'}, {card_name: '카드둘'}]}