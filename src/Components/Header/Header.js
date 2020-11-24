import "./Header.css";
import { useState } from 'react';
import { svg_hl_1, svg_hl_2, svg_hl_3, svg_hr_1, svg_hr_2, svg_hr_3, logo } from "./assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { useHistory } from "react-router-dom";

// button macros
const bm = {
  L1: 1,
  L2: 2,
  L3: 3,
  R1: 4,
  R2: 5,
  R3: 6,
  NONE: 0
}

const modal1 = (
  <section>

  </section>
);

function Header(props) {
  const [serkey, setSerkey] = useState("");
  const [serFocused, setSerFocused] = useState(false);
  const { user_data, history } = props;

  const onSerChange = (e) => {
    setSerkey(e.target.value);
  }

  const toggleFocus = () => {
    setSerFocused(!serFocused);
  }

  const goToBoards = () => {
    history.push(`/${user_data.name}/boards`);
  }
  
  return (
    <header className="logged_header">
      <div className="header-left-wrapper">
        <div className="App-Switcher-Button-Wrapper">{svg_hl_1}</div>
        <div className="Home-Button-Wrapper" onClick={goToBoards}>{svg_hl_2}</div>
        <div className="Boards-Link-Wrapper">
          {svg_hl_3}
          <p>
            <b>Boards</b>
          </p>
        </div>
        <div className="inputWrapper">
          <input className={`Boards-Search-Wrapper ${serFocused? 'active' : 'inactive'}`}  value={serkey} onChange={onSerChange} onFocus={toggleFocus} onBlur = {toggleFocus} />
          <FontAwesomeIcon className={`inputIcon ${serFocused? 'hide' : 'active'}`} icon={faSearch} />
          <FontAwesomeIcon className={`inputExtern ${serFocused? 'active' : 'hide'}`} icon={faExternalLinkAlt} />
          <FontAwesomeIcon className={`inputFin ${serFocused? 'active' : 'hide'}`} icon={faWindowClose} />
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
