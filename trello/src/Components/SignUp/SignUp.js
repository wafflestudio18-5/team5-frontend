import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';


function SignUp() {

  const [email, setEmail] = React.useState("");
  const [style, setStyle] = React.useState({gray: {color: 'red'}, green: {display: 'none'}, social: {color: 'red'}, whiteBox: {height: 430}});

  function onChange(e) {
    setEmail(e.target.value);
    if (e.target.value) {
      console.log("HIDE social login buttons");
      if (e.target.value.includes("@")) {
        setStyle({green: {color: 'red'}, gray: {display: 'none'}, whiteBox: {height: 250}, social: {display: 'none'}});
      } else {
        setStyle({gray: {color: 'red'}, green: {display: 'none'}, whiteBox: {height: 250}, social: {display: 'none'}});
      }
    } else {
      console.log("SHOW social login buttons")
      setStyle({gray: {color: 'red'}, green: {display: 'none'}, whiteBox: {height: 430}, social: {color: 'red'}});
    }
    console.log(e.target.value);
  }
    
  return(
    <div className="SignUpPage">
    <img id="signup-trello-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg" alt="trello blue logo"/>
    

    <div className="whiteBox" style={style['whiteBox']}>
      <p className="bold_center">Sign up for your account</p>
      
      <div className="center">
      <input onChange={onChange} value={email} id="signup-email-input" placeholder="Enter email"/>
      </div>

      <p id="signup-terms">By signing up, you confirm that you've read and accepted our <a href="https://trello.com/legal">Terms of Service</a> and <a href="https://trello.com/privacy">Privacy Policy</a>.</p>
      <div className="center" id="signup-coutinue"><button style={style['green']} onClick={} className="bold_center" id="signup-green">Continue</button><button style={style['gray']} className="bold_center" id="signup-gray">Continue</button></div>

      <div className="socialLogin" style={style['social']}>
        <p id="signup-or" className="center">OR</p>
        <button className="bold_center"><img alt="logo-google" className="logo-google" src="data:image/png;base64,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"/>Continue with Google</button><br/>
        <button className="bold_center"><img alt="logo-microsoft" className="logo-microsoft" src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_logo.jpg"/>Continue with Microsoft</button><br/>
        <button className="bold_center"><img alt="logo-apple" className="logo-apple" src="https://i.pinimg.com/originals/1c/aa/03/1caa032c47f63d50902b9d34492e1303.jpg"/>Continue with Apple</button><br/>
      </div>

      <p id="signup-login" className="center"><br/><Link to="/login">Already have an account? Log in</Link></p>
    </div>

    <select name="language" defaultValue="English (US)">
    <option value="" disabled>Select your language...</option>
    <option value="English (US)">English (US)</option>
    </select>

    <p id="signup-grayline-before-atlassian-logo"></p>
    <img id="signup-atlassian-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/16006ae28f149063408d601e8c80eddc/atlassian-logo-blue-small.svg" alt="atlassian logo"/>

    <p id="signup-footer"><a href="https://trello.com/templates">Templates</a> <a href="https://trello.com/pricing">Pricing</a> <a href="https://trello.com/platforms">Apps</a> <a href="https://www.atlassian.com/company/careers/trello">Jobs</a> <a href="https://blog.trello.com/">Blog</a> <a href="http://developers.trello.com/">Developers</a> <a href="https://trello.com/about">About</a> <a href="http://help.trello.com/">Help</a> <a href="https://trello.com/signup#">Cookie Settings</a></p>
    </div>
  )
};

export default SignUp;


//    <img id="signup-background" src="./signup-background.png" alt="background"/>
