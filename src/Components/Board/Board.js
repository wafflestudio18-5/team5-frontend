import './Board.css';
import List from './List.js';

function Board({data}) { // TODO: 테스트 위해 아래에 임의로 DATA를 만들것임
  // TODO: props는 data를 가지고 있어야 하며 이 data object에 lists라는 array가 있다고 가정.
  // TODO: lists의 안에 [[card, card, card], [card, card]] 와 같이 여러 개의 card로 구성된 list들이 있다고 가정
  console.log("data is ", data);


  const DATA = {
    board_name: data.board_name,
    board_code: data.board_code,

    lists: [
      [{card_name: '카드하나'}, {card_name: '카드둘'}],
      [{card_name: '카드1번째'}, {card_name: '카드두번쨰'}],
      [{card_name: '카드하나'}, {card_name: '카드둘'}],
      [{card_name: '카드1번째'}, {card_name: '카드두번쨰'}],
      [{card_name: '카드하나'}, {card_name: '카드둘'}],
      [{card_name: '카드1번째'}, {card_name: '카드두번쨰'}],
      [{card_name: '카드하나'}, {card_name: '카드둘'}],
      [{card_name: '카드1번째'}, {card_name: '카드두번쨰'}],
      [{card_name: '카드하나'}, {card_name: '카드둘'}],
      [{card_name: '카드1번째'}, {card_name: '카드두번쨰'}],
      
    ]
  };
  
  return(
    <div id="Board-wrapper">
        
      <div id="board-header">

        <div id="board-header-left">
          <select name="language" defaultValue="English (US)">
          <option value="Board">Board</option>
          <option value="Calendar">Calendar</option>
          <option value="Map">Map</option>
          </select>
          <h3 id="board-name">{data.board_name}</h3>
          <button id="board-header-star">☆</button>
          <div className="board-header-vertical-line"/>
          <button>{data.board_name}<span id="board-header-freeboard">Free</span></button>
          <div className="board-header-vertical-line"/>
          <button>Private</button>
          <div className="board-header-vertical-line"/>
          <div id="board-profile-images"><p>프사들동글동글</p></div>
          <button>Invite</button>
        </div>
      
        <div id="board-header-right">
          <button>Calendar</button>
          <button>Butler</button>
          <button>Show Menu</button>
        </div>

      </div>

      <div id="board-main"><div id="board-lists">
        {DATA.lists.map(list => (<List listname="리스트네임" list={list} />))}
        <button id="board-addlist"><span id="board-addlist-plus">+</span>Add another list</button>
      </div></div>

    </div>
  )
}

export default Board;
