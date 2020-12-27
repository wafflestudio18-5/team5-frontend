import React from "react";
import "./SignUp.css";
import { GoogleLogin } from "react-google-login";
import { useUserContext } from "../../Contexts/User";
import FacebookLogin from "react-facebook-login";

const googleCID =
  "260979945174-ma3ulmo5p6mqd1jg5frkvrfpk1jra14v.apps.googleusercontent.com";

function SocialLoginButtons({ login }) {
  const { loginReqBySC } = useUserContext();

  const onGoogleSuccess = (res) => {
    loginReqBySC("Google", res.accessToken);
    console.log("[debug] Google response: ");
    console.log(res);
  };

  const onGoogleFail = (err) => {
    console.log(err);
  };

  const onFacebook = (res) => {
    loginReqBySC("Facebook", res.email);
    console.log("[debug] Facebook response: ")
    console.log(res);
  }

  return (
    <>
      <p id="signup-or" className="center">
        OR
      </p>
      <GoogleLogin
        cssClass="google-login-button"
        clientId={googleCID}
        buttonText={"Continue with google"}
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFail}
      />
      <FacebookLogin
        appId="516891145898254"
        autoLoad={false}
        fields="name,email,picture"
        callback={onFacebook}
        cssClass="fb-login-button"
      />
    </>
  );
}

export default SocialLoginButtons;
