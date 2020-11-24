import "./Boards.css";

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
        <p>Teams</p>
        <ul>
          <li>
            Trello Workspace
          </li>
        </ul>
      </section>
      <section className="main-boards">
        <div className="boards-desc" id="recently">
          <h3>Recently Viewed</h3>
        </div>
        <ul className="boards-boards" id="recently">
          list 들어가야 함
        </ul>

        <div className="boards-desc" id="personal">
          <h3>Personal Boards</h3>
        </div>
        <ul className="boards-boards" id="personal">
          list 들어가야 함
        </ul>

        <div className="boards-desc" id="workspace">
          <h3>Trello workspace</h3>
        </div>
        <ul className="boards-boards" id="workspace">
          list 들어가야 함
        </ul>
      </section>
    </div>
  );
}

export default Boards;
