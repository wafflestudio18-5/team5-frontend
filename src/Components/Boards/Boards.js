import "./Boards.css";
import { Link } from 'react-router-dom';

const temp_board1 = {
  title: "Waffle-18.5-toyproject-team5"
}

const temp_board2 = {
  title: "temporary board"
}

const temp_recent = [
  temp_board1,
  temp_board2
]

const temp_personal = [
  temp_board1,
]

const temp_workspace = [
  temp_board2
]

const title_to_board = (title, i) => (
  <li className="board-wrapper" key={i}>
    {title}
  </li>
)

function Boards() {
  return (
    <div className="main-wrapper">
      <section className="left-buttons">
        <ul>
          <li className="left-button-wrapper" id="Boards-wrapper">
            <img className="left-button-img" alt="o" />
            <p className="left-button-desc">Boards</p>
          </li>
          <li className="left-button-wrapper" id="Templates-wrapper">
            <img className="left-button-img" alt="o" />
            <p className="left-button-desc">Templates</p>
          </li>
          <li className="left-button-wrapper" id="Home-wrapper">
            <img className="left-button-img" alt="o" />
            <p className="left-button-desc">Home</p>
          </li>
        </ul>
        <div className="Teams">
          <p>Teams</p>
          <p>+</p>
        </div>
        <ul>
          <li>
            Trello Workspace
          </li>
        </ul>
      </section>
      <section className="main-boards">
        <div className="boards-desc" id="recently">
          <div>
          <img alt="o"/>
          <h4>Recently Viewed</h4>
          </div>
        </div>
        <ul className="boards-boards" id="recently">
          {temp_recent.map((item, i) => title_to_board(item.title, i))}
        </ul>

        <div className="boards-desc" id="personal">
          <div>
          <img alt="o"/>
          <h4>Personal Boards</h4>
          </div>
        </div>
        <ul className="boards-boards" id="personal">
          {temp_personal.map((item, i) => title_to_board(item.title, i))}
          <li className="board-wrapper create">
            Create new board
          </li>
        </ul>

        <div className="boards-desc" id="workspace">
          <div>
            <img alt="o"/>
            <h4>Trello workspace</h4>
          </div>
          <nav>
            <Link to={"https://trello.com/userworkspace" + "(유저 고유번호인듯)"}>Boards</Link>
            <Link to={"https://trello.com/userworkspace" + "(유저 고유번호인듯)" + "/members"}>Members</Link>
            <Link to={"https://trello.com/userworkspace" + "(유저 고유번호인듯)" + "/account"}>Settings</Link>
            <p>Upgrade</p>
          </nav>
        </div>
        <ul className="boards-boards" id="workspace">
          {temp_workspace.map((item, i) => title_to_board(item.title, i))}
          <li className="board-wrapper create">
            Create new board
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Boards;
