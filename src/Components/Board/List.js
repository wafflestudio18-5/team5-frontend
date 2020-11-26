import React from 'react';
import Card from './Card.js';
import './Board.css';

function List({listname, list}) {
    return (
        <div className="board-list">
            <h4>{listname}</h4>
        <div className="board-cards">
            {list.map((card, index) => (<Card card={card} key={index} />))}</div>
        <button><span id="board-addcard-plus">十 </span>Add another card</button>
        </div>
    )
}

export default List;
