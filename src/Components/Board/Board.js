import './Board.css';

function Board({data}) {
  console.log(data);
  return(
    <div id="Board-wrapper">
        
      <select name="language" defaultValue="English (US)">
      <option value="Board">Board</option>
      <option value="Calendar">Calendar</option>
      <option value="Map">Map</option>
      </select>

      <h2>{data.board_name}</h2>

    </div>
  )
}

export default Board;
