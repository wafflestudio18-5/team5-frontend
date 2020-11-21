/*
 TODO: logo img src 는 나중에 백엔드에서 불러와야 합니다. 
 일단은 웹에서 불러오려 했는데 웹에 있는 게 svg네요. alt 띄워두겠습니다.
*/

import { Link } from "react-router-dom";
import "./Home.css";
import img1 from './sec1_img.png';
import img2 from './sec2_img.png';

function Home({login, signup}) {
  return (
    <>
      <header className="home_header">
        <nav className="home_header_nav">
          <span className="home_logo">
            <img className="home_logo" alt="logo" src="" />
          </span>
          <div className="home_log">
            <Link to={login.path} className="home_header_button" id="hhb_login">
              Log In
            </Link>
            <Link to={signup.path}className="home_header_button" id="hhb_signup">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
      <img className="home_section1_img" src={img1} alt="img not found"/>
      <img className="home_section2_img" src={img2} alt="img not found"/>
    </>
  );
}

export default Home;