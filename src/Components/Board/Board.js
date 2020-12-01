import './Board.css';
import List from './List.js';

function Board({board_data, lists_data}) {
  return(
    <div id="Board-wrapper">
      <div id="board-header">
        <div id="board-header-left">
          <select name="language" defaultValue="English (US)">
          <option value="Board">Board</option>
          <option value="Calendar">Calendar</option>
          <option value="Map">Map</option>
          </select>
          <h3 id="board-name">{board_data.name}</h3>
          <button id="board-header-star">☆</button>
          <div className="board-header-vertical-line"/>
          <button>{board_data.name}<span id="board-header-freeboard">Free</span></button>
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

      <div id="board-main">
        <div id="board-lists">
          <div id="board-temp">
          {lists_data.map((data, index) => (<List data={data} key={index} />))}
        <button id="board-addlist">
          <span id="board-addlist-plus">+</span>Add another list
        </button>
        </div>
        </div>
      </div>

    </div>
  )
}

export default Board;
