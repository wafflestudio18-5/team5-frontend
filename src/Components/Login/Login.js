import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import SocialLoginButtons from '../SignUp/SocialLoginButtons.js';
import trelloLogo from '../SignUp/trello-logo-blue.svg';
import atlassianLogo from '../SignUp/atlassian-logo-blue.svg';
import { useUserContext } from '../../Contexts/User';

function Login() {
  const {loginReqByPW, loginReqBySC} = useUserContext();
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

  // login button
  function onClick(e) {
    loginReqByPW(email, pw);
  }
   
  return (
    <div className="loginPage">
    <img id="login-trello-logo" src={trelloLogo} alt="trello blue logo"/>
    
    <div className="whiteBox">
      <p className="bold_center">Log in to Trello</p>
      
      <div className="center">
      <input className="loginInput" onChange={emailChange} value={email} id="login-email-input" placeholder="Enter email"/>
      <input className="loginInput" onChange={pwChange} value={pw} id="login-pw-input" placeholder="Enter password" type="password"/>
      </div>

      <div className="center" id="login-login"><button onClick={onClick} className="bold_center" id="login-green">Log in</button></div>

      <div className="socialLogin">
      <SocialLoginButtons login={true}/>
      </div>

      <p id="login-forgot-or-signup" className="center"><br/><a href="https://trello.com/forgot">Can't log in?</a>  •  <Link email={email} to="/signup">Sign up for an account</Link></p>
    </div>

    <p id="login-privacypolicy-and-termsofservice"><a href="https://trello.com/privacy">Privacy Policy</a>  •  <a href="https://trello.com/legal">Terms of Service</a></p>

    <select name="language" defaultValue="English (US)">
    <option value="" disabled>Select your language...</option>
    <option value="English (US)">English (US)</option>
    </select>

    <p id="login-grayline-before-atlassian-logo"></p>
    <img id="login-atlassian-logo" src={atlassianLogo} alt="atlassian logo"/>
    <p id="login-footer"><a href="https://trello.com/templates">Templates</a> <a href="https://trello.com/pricing">Pricing</a> <a href="https://trello.com/platforms">Apps</a> <a href="https://www.atlassian.com/company/careers/trello">Jobs</a> <a href="https://blog.trello.com/">Blog</a> <a href="http://developers.trello.com/">Developers</a> <a href="https://trello.com/about">About</a> <a href="http://help.trello.com/">Help</a> <a href="https://trello.com/signup#">Cookie Settings</a></p>
    </div>
    )
};

export default Login;