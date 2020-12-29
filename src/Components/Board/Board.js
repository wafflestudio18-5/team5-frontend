import "./Board.css";
import { useRef, useState } from "react";
import List from "./List.js";

function Board({ board, postList, postCard, postComment }) {
  const [crtList, setCrtList] = useState(false);
  const [listInput, setListInput] = useState("");

  const createList = () => {
    setCrtList(false);
    postList(board.id, listInput);
    setListInput('');
  }

  const no_crtList = () => {
    setCrtList(false);
    setListInput("");
  }


  var InfiniteScroll = require('infinite-scroll');
  var infScroll = new InfiniteScroll( '#board-lists', {
    path: '/b/abcdqwer/Board1name/{{#}}',
    append: '.List',
    checkLastPage: '.List',
    //prefill: true,
    onInit: function() {
      this.on('load', function() {
        console.log("Infinite Scroll load. This function is called on initialization.")
      });
    },
    elementScroll: true,
    history: false,
    debug: true,
  });


  if (!board) return <div>Loading...</div>;
  return (
    <div id="Board-wrapper">
      <div id="board-header">
        <div id="board-header-left">
          <select name="language" defaultValue="English (US)">
            <option value="Board">Board</option>
            <option value="Calendar">Calendar</option>
            <option value="Map">Map</option>
          </select>
          <h3 id="board-name">{board.name}</h3>
          <button id="board-header-star">☆</button>
          <div className="board-header-vertical-line" />
          <button>
            {board.name}
            <span id="board-header-freeboard">Free</span>
          </button>
          <div className="board-header-vertical-line" />
          <button>Private</button>
          <div className="board-header-vertical-line" />
          <div id="board-profile-images">
            <p>프사들동글동글</p>
          </div>
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
            {board.lists.map((data, index) => (
              <List className="List" board={board} data={data} key={index} postCard={postCard} postComment={postComment}/>
            ))}

            <div>
              <button id="board-addlist" onClick={() => setCrtList(true)}>
                <span id="board-addlist-plus">+</span>Add another list
              </button>
              {crtList ? (
                  <div className="crtList">
                      <input
                        placeholder="Enter list title..."
                        onChange={(e) => setListInput(e.target.value)}
                        value={listInput}
                      />
                      <button onClick={createList}>Add List</button>
                      <button id="no_crtList" onClick={no_crtList}></button>
                  </div>
                ) : (
                  <>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
