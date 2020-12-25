import React from "react";
import "./SignUp.css";
import { GoogleLogin } from "react-google-login";
import { useUserContext } from "../../Contexts/User";
/*
import MicrosoftLogin from "react-microsoft-login";
import AppleLogin from "react-apple-login";
*/

const googleCID = '260979945174-ma3ulmo5p6mqd1jg5frkvrfpk1jra14v.apps.googleusercontent.com';

function SocialLoginButtons({ login }) {
    const { loginReqBySC } = useUserContext();

  const onGoogleSuccess = (res) =>{
    loginReqBySC('Google', res.accessToken);
    console.log('Google response: ');
    console.log(res);
  }

  const onGoogleFail = (err) => {
    console.log(err);
  }

  return (
    <>
      <p id="signup-or" className="center">
        OR
      </p>

      <GoogleLogin
        clientId={googleCID}
        buttonText={"Continue with google"}
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFail}
      />
      {
        // 얘네 넣기 너무 복잡해서 일단 좀만 뒤로 미루겠습니다ㅠㅠ
        // <MicrosoftLogin clientId={"YOUR_CLIENT_ID"} authCallback={authHandler} />
        // <AppleLogin />
      }
    </>
  );
}

export default SocialLoginButtons;
