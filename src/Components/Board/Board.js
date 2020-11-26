import './Board.css';

function Board({data}) {
  console.log(data);
  return(
    <div id="Board-wrapper">
        
      <div id="board-header">

        <div id="board-header-left">
          <select name="language" defaultValue="English (US)">
          <option value="Board">Board</option>
          <option value="Calendar">Calendar</option>
          <option value="Map">Map</option>
          </select>
          <h3>{data.board_name}</h3>
          <button id="board-header-star">☆</button>
          <button>{data.board_name}<div id="board-header-freeboard">free</div></button>
          <button>Private</button>
          <p>프사들동글동글</p>
          <button>Invite</button>
        </div>
      
        <div id="board-header-right">
          <p>라잇</p>
          <p>right</p>
        </div>

      </div>

      <div id="board-lists">
        Lists
      </div>

    </div>
  )
}

export default Board;
