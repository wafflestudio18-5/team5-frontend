import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import apis from "../Library/Apis";

const defaultUser = {
  // variable used for giving id to each team informations
  logged: false,
  user: {},
  users: [],
  signUpReq: () => {},
  loginReqByPW: () => {},
  loginReqBySC: () => {},
  logoutReq: () => {},
  fetchUserList: () => {},
  saveLoginInfo: () => {},
  loadLoginInfo: () => {},
};

const UserContext = createContext(defaultUser);

const UserProvider = (props) => {
  const { children } = props;

  const signUpReq = (email, username, password) => {
    apis.user
      .pwSignUp({ email, username, password })
      .then((response) => {
        console.log("회원가입 성공");
        console.log(response.data);
      })
      .catch((err) => {
          console.log("err.response");
          console.log(err.response.data.values());
          /* 
                    console.log(err.response.status); // 400
                    console.log(err.response.statusText); // Bad Reques
 */
        //alert(String(err.response.headers));
      });
  };

  const loginReqByPW = async (email, pw) => {
    const loginInfo = {
      email: email,
      password: pw,
    };

    apis.user
      .pwLogIn(loginInfo)
      .then((response) => {
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token ${response.data.token}`;
        setState((state) => {
          return {
            ...state,
            logged: true,
            user: response.data,
          };
        });
        saveLoginInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveLoginInfo = (loginInfo) => {
    console.log("save login info:");
    console.log(loginInfo);
    window.localStorage.setItem("id", loginInfo.id);
    window.localStorage.setItem("username", loginInfo.username);
    window.localStorage.setItem("email", loginInfo.email);
    window.localStorage.setItem("first_name", loginInfo.first_name);
    window.localStorage.setItem("last_name", loginInfo.last_name);
    window.localStorage.setItem("token", loginInfo.token);
  };

  const loadLoginInfo = () => {
    const id = window.localStorage.getItem("id");
    const username = window.localStorage.getItem("username");
    const email = window.localStorage.getItem("email");
    const first_name = window.localStorage.getItem("first_name");
    const last_name = window.localStorage.getItem("last_name");
    const token = window.localStorage.getItem("token");
    const user = {
      id,
      username,
      email,
      first_name,
      last_name,
      token,
    };
    if (id) {
      console.log(token);
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;

      setState((state) => ({
        ...state,
        logged: true,
        user: user,
      }));
    } else {
      logoutReq();
    }
  };

  const loginReqBySC = async (authProvider, accessToken) => {
    const loginInfo = {
      grantType: "OAUTH",
      authProvider: authProvider,
      accessToken: accessToken,
    };

    apis.user
      .scLogIn(loginInfo)
      .then((response) => {
        setState((state) => {
          return {
            ...state,
            logged: true,
            user: response.data,
          };
        });

        saveLoginInfo(response.data);
      })
      .catch((err) => console.log(err));
  };

  const logoutReq = () => {
    window.localStorage.clear();
    apis.user
      .logout()
      .then((response) => {
        setState((state) => {
          return {
            ...state,
            user: {},
            logged: false,
          };
        });
      })
      .catch((err) => console.log(err));
  };

  const fetchUserList = async () => {
    apis.user.getAll
      .then((response) => {
        setState((state) => {
          return {
            ...state,
            users: response.data,
          };
        });
      })
      .catch((err) => console.log(err));
  };

  const userState = {
    ...defaultUser,
    signUpReq,
    loginReqByPW,
    loginReqBySC,
    logoutReq,
    fetchUserList,
    saveLoginInfo,
    loadLoginInfo,
  };

  const [state, setState] = useState(userState);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserProvider };
