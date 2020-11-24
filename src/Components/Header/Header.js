import "./Header.css";

function Header(props) {
  return (
    <header className="logged_header">
      <div className="header-left-wrapper">
        <div className="App-Switcher-Button-Wrapper">...</div>
        <div className="Home-Button-Wrapper">집</div>
        <div className="Boards-Link-Wrapper">Boards</div>
        <div className="Boards-Search-Wrapper">Search</div>
      </div>
      <div className="header-logo-wrapper">
        <img className="header_logo" alt="logo" id="trello_logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg" />
      </div>
      <div className="header-right-wrapper">
        <div className="Add-Wrapper">+</div>
        <div className="Info-Wrapper">i</div>
        <div className="Notifications-Wrapper">종</div>
        <div className="Profile-Wrapper">O</div>
      </div>
    </header>
  );
}

export default Header;
