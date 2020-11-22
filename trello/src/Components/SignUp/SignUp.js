import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';


function SignUp() {
  return(
    <div className="SignUpPage">
    <img id="signup-trello-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg" alt="trello blue logo"/>
    

    <div className="whiteBox">
      <p className="bold_center">Sign up for your account</p>
      <div className="center"><input id="signup-email-input" placeholder="Enter email"/></div>
      <p id="signup-terms">By signing up, you confirm that you've read and accepted our <a href="https://trello.com/legal">Terms of Service</a> and <a href="https://trello.com/privacy">Privacy Policy</a>.</p>
      <div className="center" id="signup-coutinue"><button className="bold_center">Continue</button></div>

      <div className="socialLogin">
        <p id="signup-or" className="center">OR</p>
        <button className="bold_center">Continue with Google</button><br/>
        <button className="bold_center">Continue with Microsoft</button><br/>
        <button className="bold_center">Continue with Apple</button><br/>
      </div>

      <p id="signup-login" className="center"><br/><Link to="/login">Already have an account? Log in</Link></p>
    </div>

    <select name="language">
    <option value="" disabled selected>Select your language...</option>
    <option value="English (US)" selected="selected">English (US)</option>
</select>
    <img id="signup-background" src="./signup-background.png" alt="background"/>
    </div>
  )
};

export default SignUp;