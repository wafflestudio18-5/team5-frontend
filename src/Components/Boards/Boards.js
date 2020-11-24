import "./Boards.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { faUser, faHome, faUserFriends, faCog, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const temp_board1 = {
  title: "Waffle-18.5-toyproject-team5",
};

const temp_board2 = {
  title: "temporary board",
};

const temp_recent = [temp_board1, temp_board2];

const temp_personal = [temp_board1];

const temp_workspace = [temp_board2];

const title_to_board = (title, i) => (
  <li className="board-wrapper" key={i}>
    {title}
  </li>
);

function Boards() {
  return (
    <div className="main-wrapper">
      <section className="left-buttons">
        <ul>
          <li className="left-button-wrapper" id="Boards-wrapper">
            <FontAwesomeIcon icon={faTrello} />
            <p className="left-button-desc" id="boards">
              Boards
            </p>
          </li>
          <li className="left-button-wrapper" id="Templates-wrapper">
            <FontAwesomeIcon icon={faTrello} />
            <p className="left-button-desc" id="templates">
              Templates
            </p>
          </li>
          <li className="left-button-wrapper" id="Home-wrapper">
            <FontAwesomeIcon icon={faHome} />
            <p className="left-button-desc" id="home">
              Home
            </p>
          </li>
        </ul>
        <div className="Teams-hdr">
          <p>Teams</p>
          <p>+</p>
        </div>
        <ul className="Teams">
          <li>
            <FontAwesomeIcon icon={faUserFriends} />
            <b> Trello Workspace</b>
          </li>
        </ul>
      </section>
      <section className="main-boards">
        <div className="boards-desc" id="recently">
          <div>
            <FontAwesomeIcon icon={faClock} />
            <h4>Recently Viewed</h4>
          </div>
        </div>
        <ul className="boards-boards" id="recently">
          {temp_recent.map((item, i) => title_to_board(item.title, i))}
        </ul>

        <div className="boards-desc" id="personal">
          <div>
            <FontAwesomeIcon icon={faUser} />
            <h4>Personal Boards</h4>
          </div>
        </div>
        <ul className="boards-boards" id="personal">
          {temp_personal.map((item, i) => title_to_board(item.title, i))}
          <li className="board-wrapper create">Create new board</li>
        </ul>

        <div className="boards-desc" id="workspace">
          <div>
            <FontAwesomeIcon icon={faUserFriends} />
            <h4>Trello workspace</h4>
          </div>
          <nav>
            <Link to={`https://trello.com/userworkspace${"유저 고유번호"}`}>
              <FontAwesomeIcon className="tw_icon" icon={faTrello} />
              Boards
            </Link>
            <Link to={`https://trello.com/userworkspace${"유저 고유번호"}/members`}>
              <FontAwesomeIcon className="tw_icon" icon={faUser} />
              Members
            </Link>
            <Link to={`https://trello.com/userworkspace${"유저 고유번호"}/account`}>
              <FontAwesomeIcon className="tw_icon" icon={faCog} />
              Settings
            </Link>
            <p><FontAwesomeIcon className="tw_icon" icon={faBriefcase} />Upgrade</p>
          </nav>
        </div>
        <ul className="boards-boards" id="workspace">
          {temp_workspace.map((item, i) => title_to_board(item.title, i))}
          <li className="board-wrapper create">Create new board</li>
        </ul>
      </section>
    </div>
  );
}

export default Boards;
