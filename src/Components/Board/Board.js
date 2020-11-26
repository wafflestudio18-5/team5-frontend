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
          <h2>{data.board_name}</h2>
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
