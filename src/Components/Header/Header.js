import "./Header.css";
import { useState } from 'react';
import { svg_hl_1, svg_hl_2, svg_hl_3, svg_hr_1, svg_hr_2, svg_hr_3, logo } from "./assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useBoardContext, useUserContext } from "../../Contexts";

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

function Header({user}) {
  const [serkey, setSerkey] = useState("");
  const [serFocused, setSerFocused] = useState(false);
  const { logoutReq } = useUserContext();
  const { modal } = useBoardContext();
  const history = useHistory();


  const onSerChange = (e) => {
    setSerkey(e.target.value);
  }

  const toggleFocus = () => {
    setSerFocused(!serFocused);
  }

  const goToBoards = () => {
    history.push(`/${user.username}/boards`);
  }
  
  return (
    <header className={`logged_header ${modal? "down" : ""}`}>
      <div className="header-left-wrapper">
        <div style={{cursor: 'pointer'}} className="App-Switcher-Button-Wrapper">{svg_hl_1}</div>
        <div style={{cursor: 'pointer'}} className="Home-Button-Wrapper" onClick={goToBoards}>{svg_hl_2}</div>
        <div style={{cursor: 'pointer'}} className="Boards-Link-Wrapper">
          {svg_hl_3}
          <p>
            <b>Boards</b>
          </p>
        </div>
        <div className="inputWrapper">
          <input style={{cursor: 'auto'}} className={`Boards-Search-Wrapper ${serFocused? 'active' : 'inactive'}`}  value={serkey} onChange={onSerChange} onFocus={toggleFocus} onBlur = {toggleFocus} />
          <FontAwesomeIcon className={`inputIcon ${serFocused? 'hide' : 'active'}`} icon={faSearch} />
          <FontAwesomeIcon className={`inputExtern ${serFocused? 'active' : 'hide'}`} icon={faExternalLinkAlt} />
          <FontAwesomeIcon className={`inputFin ${serFocused? 'active' : 'hide'}`} icon={faWindowClose} />
        </div>
      </div>
      <div className="header-logo-wrapper">
        <Link style={{cursor: 'pointer'}} to="/">{logo}</Link>
      </div>
      <div className="header-right-wrapper">
        <div style={{cursor: 'pointer'}} className="Add-Wrapper">{svg_hr_1}</div>
        <div style={{cursor: 'pointer'}} className="Info-Wrapper">{svg_hr_2}</div>
        <div style={{cursor: 'pointer'}} className="Notifications-Wrapper" onClick={() => alert('' + user.username)}>{svg_hr_3}</div>
        <div  style={{cursor: 'pointer'}} className="Profile-Wrapper" onClick={logoutReq}>
          <img style={{height: 32, width: 32, borderRadius: '50%'}} src="https://assets.leetcode.com/users/bundhoo/avatar_1527798889.png" alt={"Profile"}/>
        </div>
      </div>
    </header>
  );
}

export default Header;
