import React from 'react';
import './SignUp.css';
import google from './logo/google.png';
import microsoft from './logo/microsoft.jpg';
import apple from './logo/apple.jpg';

function SocialLoginButtons({ login }) {

    console.log(login ? "Social Login - LOGIN MODE" : "Social Login - SIGNUP MODE");

    function googleClick(e) {
        if (login) {
            console.log("LOGIN with GOOGLE!");
        } else {
            console.log("SIGNUP with GOOGLE!");
        }
    }

    function microsoftClick(e) {
        if (login) {
            console.log("LOGIN with MICROSOFT!");
        } else {
            console.log("SIGNUP with MICROSOFT!");
        }
    }

    function appleClick(e) {
        if (login) {
            console.log("LOGIN with APPLE!");
        } else {
            console.log("SIGNUP with APPLE!");
        }
    }

    return (
        <><p id="signup-or" className="center">OR</p>
        <button onClick={googleClick} className="bold_center"><img alt="logo-google" className="logo-google" src={google}/>Continue with Google</button><br/>
        <button onClick={microsoftClick} className="bold_center"><img alt="logo-microsoft" className="logo-microsoft" src={microsoft}/>Continue with Microsoft</button><br/>
        <button onClick={appleClick} className="bold_center"><img alt="logo-apple" className="logo-apple" src={apple}/>Continue with Apple</button><br/></>
)
}

export default SocialLoginButtons;