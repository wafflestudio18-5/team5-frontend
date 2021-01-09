import "./Boards.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import {
  faUser,
  faHome,
  faUserFriends,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { faStar, faClock } from "@fortawesome/free-regular-svg-icons";
import BoardThumbnail from "./BoardThumbnail";

/* --------------------------template images----------------------------*/
import template1 from "./Boards-Template Images/Template 1 Project Management.png";
import template2 from "./Boards-Template Images/Template 2 Kanban Template.png";
import template3 from "./Boards-Template Images/Template 3 Simple Project Board.png";
import template4 from "./Boards-Template Images/Template 4 Remote Team Hub.png";

function Boards({ user_data, postBoard, personal, recent, starred, refreshBoards }) {
  const [active, setActive] = useState(1);
  const [create, setCreate] = useState(false);
  const [newName, setNewName] = useState("");
  
  const createBoard = () => {
    setCreate(false);
    postBoard(newName);
    setNewName('');
  }

  const onKeyPress = (e) => {
    if(e.key == 'Enter') {
      createBoard();
    }
  }

  const toggleCreate = () => {
    setCreate(true);
  };

  const onInputChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div className="main-wrapper">
      <section className="left-buttons">
        <ul>
          <li
            className={`left-button-wrapper ${
              active === 1 ? "active" : "inactive"
            }`}
            id="Boards-wrapper"
          >
            <FontAwesomeIcon icon={faTrello} />
            <p className="left-button-desc" id="boards">
              Boards
            </p>
          </li>
          <li
            className={`left-button-wrapper ${
              active === 2 ? "active" : "inactive"
            }`}
            id="Templates-wrapper"
          >
            <FontAwesomeIcon icon={faTrello} />
            <p className="left-button-desc" id="templates">
              Templates
            </p>
          </li>
          <li
            className={`left-button-wrapper ${
              active === 3 ? "active" : "inactive"
            }`}
            id="Home-wrapper"
          >
            <FontAwesomeIcon icon={faHome} />
            <p className="left-button-desc" id="home">
              Home
            </p>
          </li>
        </ul>
        <div className="Teams-hdr">
          <p>T E A M S</p>
          <p id="boards-teams-add">+</p>
        </div>
        <ul className="Teams">
          <li>
            <FontAwesomeIcon icon={faUserFriends} />
            <b data-text="Trello Workspace">Trello Workspace</b>
          </li>
        </ul>
      </section>
      <section className="main-boards">
        <div className="boards-templates">
          <div id="boards-templates-title">
            <h3>
              <FontAwesomeIcon icon={faTrello} id="boards-template-icon" />
              Most popular templates
            </h3>
            <br />
          </div>
          <p>Get going faster with a template from the Trello community!</p>
          <a href="https://trello.com/b/1x4Uql2u/project-management">
            <img alt="Template-Project Management" src={template1} />
          </a>
          <a href="https://trello.com/b/LGHXvZNL/kanban-template">
            <img alt="Template-Kanban Template" src={template2} />
          </a>
          <a href="https://trello.com/b/6QW0Ciu8/simple-project-board">
            <img alt="Template-Simple Project Board" src={template3} />
          </a>
          <a href="https://trello.com/b/E4uILULn/remote-team-hub">
            <img alt="Template-Remote Team Hub" src={template4} />
          </a>
          <br></br>
          <a id="boards-templates-browse" href="https://trello.com/templates">
            Browse the full template gallery
          </a>
        </div>
        <div className="boards-desc" id="recently">
          <div>
            <FontAwesomeIcon icon={faClock} />
            <h4>Recently Viewed</h4>
          </div>
        </div>
        <ul className="boards-boards" id="recently">
          {recent.map((item, i) => (
            <BoardThumbnail key={i} id={item.id} name={item.name} boardKey={item.key} star={item.star} refreshBoards={refreshBoards} />
          ))}
        </ul>

        <div className="boards-desc" id="personal">
          <div>
            <FontAwesomeIcon icon={faStar} />
            <h4>Starred Boards</h4>
          </div>
        </div>
        <ul className="boards-boards" id="personal">
          {starred.map((item, i) => (
            <BoardThumbnail key={i} id={item.id} name={item.name} boardKey={item.key} star={item.star} refreshBoards={refreshBoards} />
          ))}
        </ul>

        <div className="boards-desc" id="workspace">
          <div>
            <FontAwesomeIcon icon={faUserFriends} />
            <h4>Personal Boards</h4>
          </div>
          <nav>
            <Link
              className="tw_link"
              to={`https://trello.com/userworkspace${"유저 고유번호"}`}
            >
              <FontAwesomeIcon className="tw_icon" icon={faTrello} />
              Boards
            </Link>
            <Link
              className="tw_link"
              to={`https://trello.com/userworkspace${"유저 고유번호"}/members`}
            >
              <FontAwesomeIcon className="tw_icon" icon={faUser} />
              Members
            </Link>
            <Link
              className="tw_link"
              to={`https://trello.com/userworkspace${"유저 고유번호"}/account`}
            >
              <FontAwesomeIcon className="tw_icon" icon={faCog} />
              Settings
            </Link>
            <p className="tw_p">
              <FontAwesomeIcon
                className="tw_icon"
                icon={faTrello}
                id="boards-upgrade-icon"
              />
              Upgrade
            </p>
          </nav>
        </div>
        <ul className="boards-boards" id="workspace">
          {personal.map((item, i) => (
            <BoardThumbnail key={i} id={item.id} name={item.name} boardKey={item.key} star={item.star} refreshBoards={refreshBoards} />
          ))}
          <li className="board-wrapper create" onClick={toggleCreate}>
            {create ? (
              <>
                <input
                  className="createInput"
                  onChange={onInputChange}
                  onKeyPress={onKeyPress}
                  placeholder="Add Board Title"
                />
              </>
            ) : (
              "Create new board"
            )}
          </li>
        </ul>
        <br />
        <br />
      </section>
    </div>
  );
}

export default Boards;
