import "./Board.css";
import { useEffect, useState } from "react";
import List from "./List.js";
import apis from "../../Library/Apis";

const _sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function Board({ users, board, postList, postCard }) {
  const [crtList, setCrtList] = useState(false);
  const [listInput, setListInput] = useState("");
  const [invite, setInvite] = useState(false);
  const [inviteInput, setInviteInput] = useState("");
  const [loading, setLoading] = useState(true);

  const wait = async (delay) => {
    await _sleep(delay);
    setLoading(false);
  };

  useEffect(() => {
    wait(500);
  }, []);

  const toggleInvite = () => {
    setInvite(!invite);
  };

  const inviteMember = (id, username) => {
    apis.board
      .invite({ id: id, username: username })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const createList = () => {
    setCrtList(false);
    postList(board.id, listInput);
    setListInput("");
  };

  const inviteOnChange = (e) => {
    setInviteInput(e.target.value);
  };

  const no_crtList = () => {
    setCrtList(false);
    setListInput("");
  };

  const tUsers = inviteInput
    ? users.filter((item) => item.username.includes(inviteInput))
    : users;

  if (!board) return <div className="board-wrapper">Loading...</div>;

  return (
    <>
      {loading ? (
        <div className="board-wrapper">Loading...</div>
      ) : (
        <div className="board-wrapper anime">Loading...</div>
      )}
      <div id="Board-wrapper">
        <header id="board-header">
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
            <div className="invite-wrapper">
              <button className="inviteButton" onClick={toggleInvite}>
                Invite
              </button>
              {invite ? (
                <div className="invite-modal">
                  <div className="im-header">
                    <span>Invite to Board</span>
                  </div>

                  <hr />

                  <div className="im-input-wrapper">
                    <input
                      className="im-input"
                      value={inviteInput}
                      placeholder="Enter name here"
                      onChange={inviteOnChange}
                    />
                  </div>

                  {tUsers.map((item, index) => (
                    <h4
                      key={index}
                      onClick={() => inviteMember(board.id, item.username)}
                    >
                      {" "}
                      {item.username}{" "}
                    </h4>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div id="board-header-right">
            <button>Calendar</button>
            <button>Butler</button>
            <button>Show Menu</button>
          </div>
        </header>

        <div id="board-main">
          <div id="board-lists">
            <div id="board-temp">
              {board.lists.map((data, index) => (
                <List
                  board={board}
                  data={data}
                  key={index}
                  postCard={postCard}
                />
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
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
