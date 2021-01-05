import { Link } from "react-router-dom";
import { useUserContext } from "../../Contexts";
import React from 'react';
import "./Home.css";
import img1 from './sec1_img.png';
import img2 from './sec2_img.png';

function Home({login, signup}) {
  return (
    <>
      <header className="home_header">
        <nav className="home_header_nav">
          <span className="home_logo">
            <img className="home_logo" alt="logo" id="trello_logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg" />
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
