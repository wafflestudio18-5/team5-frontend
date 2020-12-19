import React from "react";
import Card from "./Card.js";
import { useBoardContext } from "../../Contexts";
import "./Board.css";

function List({ data }) {
  // 지금은 Card에서 get하는데 나중에는 옮겨야됨
  console.log(data.cards);
  const { getCardsByIdArray: getCardsByIdArray } = useBoardContext();
  const cardList = getCardsByIdArray(data.cards);

  return (
    <div className="board-list">
      <h4>{data.name}</h4>
      <div className="board-cards">
        {cardList.map((card, index) => (
          <Card card={card} key={index} index={index} />
        ))}
      </div>
      <button id="board-addcard">
        <span id="board-addcard-plus">十 </span>Add another card
      </button>
    </div>
  );
}

export default List;
