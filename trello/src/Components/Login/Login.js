import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import SocialLoginButtons from '../SignUp/SocialLoginButtons.js';

function Login() {

  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");

  function emailChange(e) {
    setEmail(e.target.value);
    if (e.target.value) {
      if (e.target.value.includes("@")) {
      } else {
      }
    } else {
    }
  }

  function pwChange(e) {
    setPw(e.target.value);
  }

  function onClick(e) {
    console.log("LOG IN as ", email, pw);
  }
   
  return (
    <div className="loginPage">
    <img id="login-trello-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg" alt="trello blue logo"/>
    
    <div className="whiteBox">
      <p className="bold_center">Log in to Trello</p>
      
      <div className="center">
      <input onChange={emailChange} value={email} id="login-email-input" placeholder="Enter email"/>
      <input onChange={pwChange} value={pw} id="login-pw-input" placeholder="Enter password"/>
      </div>

      <div className="center" id="login-login"><button onClick={onClick} className="bold_center" id="login-green">Log in</button></div>

      <div className="socialLogin">
      <SocialLoginButtons/>
      </div>

      <p id="login-forgot-or-signup" className="center"><br/><a href="https://trello.com/forgot">Can't log in?</a>  •  <Link email={email} to="/signup">Sign up for an account</Link></p>
    </div>

    <p id="login-privacypolicy-and-termsofservice"><a href="https://trello.com/privacy">Privacy Policy</a>  •  <a href="https://trello.com/legal">Terms of Service</a></p>

    <select name="language" defaultValue="English (US)">
    <option value="" disabled>Select your language...</option>
    <option value="English (US)">English (US)</option>
    </select>

    <p id="login-grayline-before-atlassian-logo"></p>
    <img id="login-atlassian-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/16006ae28f149063408d601e8c80eddc/atlassian-logo-blue-small.svg" alt="atlassian logo"/>
    <p id="login-footer"><a href="https://trello.com/templates">Templates</a> <a href="https://trello.com/pricing">Pricing</a> <a href="https://trello.com/platforms">Apps</a> <a href="https://www.atlassian.com/company/careers/trello">Jobs</a> <a href="https://blog.trello.com/">Blog</a> <a href="http://developers.trello.com/">Developers</a> <a href="https://trello.com/about">About</a> <a href="http://help.trello.com/">Help</a> <a href="https://trello.com/signup#">Cookie Settings</a></p>
    </div>
    )
};

export default Login;