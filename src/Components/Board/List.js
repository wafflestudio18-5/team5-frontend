import React from 'react';
import Card from './Card.js';
import './Board.css';

function List({listname, list}) {
    return (
        <div className="board-list"><div className="board-cards">
        <h3>{listname}</h3>
            {list.map((card, index) => (<Card card={card} key={index} />))}</div>
        <button><span id="board-addcard-plus">+</span>Add another card</button>
        </div>
    )
}

export default List;

// {list_name: '첫번째리스트',
//      cards: [{card_name: '카드하나'}, {card_name: '카드둘'}]}