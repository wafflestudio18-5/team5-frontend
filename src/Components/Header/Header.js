import "./Header.css";
import * as assets from "./assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Header(props) {
  const {
    svg_hl_1,
    svg_hl_2,
    svg_hl_3,
    svg_hr_1,
    svg_hr_2,
    svg_hr_3,
    logo,
  } = assets;
  return (
    <header className="logged_header">
      <div className="header-left-wrapper">
        <div className="App-Switcher-Button-Wrapper">{svg_hl_1}</div>
        <div className="Home-Button-Wrapper">{svg_hl_2}</div>
        <div className="Boards-Link-Wrapper">
          {svg_hl_3}
          <p>
            <b>Boards</b>
          </p>
        </div>
        <div className="inputWrapper">
          <input className="Boards-Search-Wrapper" />
          <FontAwesomeIcon className="inputIcon" icon={faSearch} />
        </div>
      </div>
      <div className="header-logo-wrapper">{logo}</div>
      <div className="header-right-wrapper">
        <div className="Add-Wrapper">{svg_hr_1}</div>
        <div className="Info-Wrapper">{svg_hr_2}</div>
        <div className="Notifications-Wrapper">{svg_hr_3}</div>
        <div className="Profile-Wrapper">O</div>
      </div>
    </header>
  );
}

export default Header;
