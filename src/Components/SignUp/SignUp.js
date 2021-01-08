import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import SocialLoginButtons from './SocialLoginButtons.js';
import trelloLogo from './trello-logo-blue.svg';
import atlassianLogo from './atlassian-logo-blue.svg';
import { useUserContext } from '../../Contexts/User';
import { routes } from '../../Library/Routes';

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [style, setStyle] = React.useState({gray: {color: 'black'}, green: {display: 'none'}, social: {color: 'black'}, whiteBox: {height: 460}});
  const [account, setAccount] = React.useState(false);
  const [fn, setFn] = React.useState("");
  const [pw, setPw] = React.useState("");

  const { signUpReq, signUpSuccess } = useUserContext();

  function onChange(e) {
    setEmail(e.target.value);
    if (e.target.value) {
      if (e.target.value.includes("@")) {
        setStyle({green: {color: 'black'}, gray: {display: 'none'}, whiteBox: {height: 250}, social: {display: 'none'}});
      } else {
        setStyle({gray: {color: 'black'}, green: {display: 'none'}, whiteBox: {height: 250}, social: {display: 'none'}});
      }
    } else {
      setStyle({gray: {color: 'black'}, green: {display: 'none'}, whiteBox: {height: 460}, social: {color: 'black'}});
    }
  }

  function fnChange(e) {
    setFn(e.target.value);
  }

  function pwChange(e) {
    setPw(e.target.value);
  }

  function greenClick(e) {
    setAccount(true);
  }

  function blueClick(e) {
    signUpReq(email, fn, pw);
  }
    
  if (!account) {
    return(
    <div className="SignUpPage">
    <img id="signup-trello-logo" src={trelloLogo} alt="trello blue logo"/>
    

    <div className="whiteBox" style={style['whiteBox']}>
      <p className="bold_center">Sign up for your account</p>
      
      <div className="center">
      <input onKeyPress={(e) => (e.key === 'Enter' && e.target.value.includes("@")) ? greenClick() : null} onChange={onChange} value={email} id="signup-email-input" placeholder="Enter email"/>
      </div>

      <p id="signup-terms">By signing up, you confirm that you've read and accepted our <a href="https://trello.com/legal">Terms of Service</a> and <a href="https://trello.com/privacy">Privacy Policy</a>.</p>
      <div className="center" id="signup-coutinue"><button style={style['green']} onClick={greenClick} className="bold_center" id="signup-green">Continue</button><button style={style['gray']} className="bold_center" id="signup-gray">Continue</button></div>

      <div className="socialLogin" style={style['social']}>
      <SocialLoginButtons login={false}/>
      </div>

      <p id="signup-login" className="center"><br/><Link to="/login">Already have an account? Log in</Link></p>
    </div>

    <select name="language" defaultValue="English (US)">
    <option value="" disabled>Select your language...</option>
    <option value="English (US)">English (US)</option>
    </select>

    <p id="signup-grayline-before-atlassian-logo"></p>
    <img id="signup-atlassian-logo" src={atlassianLogo} alt="atlassian logo"/>

    <p id="signup-footer"><a href="https://trello.com/templates">Templates</a> <a href="https://trello.com/pricing">Pricing</a> <a href="https://trello.com/platforms">Apps</a> <a href="https://www.atlassian.com/company/careers/trello">Jobs</a> <a href="https://blog.trello.com/">Blog</a> <a href="http://developers.trello.com/">Developers</a> <a href="https://trello.com/about">About</a> <a href="http://help.trello.com/">Help</a> <a href="https://trello.com/signup#">Cookie Settings</a></p>
    </div>
    )
    } else {
      return (
    <div className="SignUpPage">
    <img id="signup-trello-logo" src={trelloLogo} alt="trello blue logo"/>
    
    <div className="whiteBox" style={{height: 580}}>
      <p className="bold_center">Sign up for your account</p>
      
      <div className="center">
      <input onChange={onChange} value={email} id="signup-email-input" placeholder="Enter email address"/>
      <input onChange={fnChange} value={fn} id="signup-name-input" placeholder="Enter full name"/>
      <input onChange={pwChange} value={pw} type="password" id="signup-pw-input" placeholder="Create password"/>
      </div>

      <p id="signup-terms">By signing up, I accept the Atlassian <a href="https://www.atlassian.com/legal/cloud-terms-of-service">Cloud Terms of Service</a> and acknowledge the <a href="https://www.atlassian.com/legal/privacy-policy">Privacy Policy</a>.</p>
      <div className="center" id="signup-signup">
      <Link onClick={blueClick} to={location => signUpSuccess ? routes.Login.path : routes.SignUp.path}>
        <button className="bold_center" id="signup-blue">
          Sign Up
        </button>
      </Link>
      </div>

      <div className="socialLogin">
      <SocialLoginButtons login={false}/>
      </div>

      <p id="signup-login" className="center"><br/><Link email={email} to="/login">Already have an account? Log in</Link></p>
    </div>

    <p id="signup-protect">This page is protected by reCAPTCHA and the Google <a href="https://www.google.com/policies/privacy/">Privacy Policy</a> and <br/><a href="https://www.google.com/policies/terms/">Terms of Service</a> apply</p>

    <p id="signup-grayline-before-atlassian-logo"></p>
    <img id="signup-atlassian-logo" src={atlassianLogo} alt="atlassian logo"/>
    <p id="signup-one">One account for Trello, Jira, Confluence and <a href="https://confluence.atlassian.com/cloud/your-atlassian-account-976161169.html">more</a>.</p>
    </div>
    )
    }
};

export default SignUp;
