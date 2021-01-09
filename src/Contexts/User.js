import React, { createContext, useState, useContext } from "react";
import apis from "../Library/Apis";

const defaultUser = {
  // variable used for giving id to each team informations
  logged: false,
  user: {},
  userList: [],
  signUpReq: () => {},
  loginReqByPW: () => {},
  loginReqBySC: () => {},
  logoutReq: () => {},
  fetchUserList: () => {},
  saveLoginInfo: () => {},
  loadLoginInfo: () => {},
  signUpSuccess: false
};

const UserContext = createContext(defaultUser);

const UserProvider = (props) => {
  const { children } = props;

  const signUpReq = (email, username, password) => {
    apis.user
      .pwSignUp({ email, username, password })
      .then((response) => {
        alert('회원가입에 성공하였습니다');
        setState((state) => {
          return {
            ...state,
            signUpSuccess: true,
          };
        });
      })
      .catch((err) => {
        setState((state) => {
          return {
            ...state,
            signUpSuccess: false,
          };
        });
        if (err.response !== undefined) alert(Object.values(err.response['data']).join());
        else alert("서버가 터졌어요!");
      });
  };

  const loginReqBySC = (authProvider, accessToken) => {
    const loginInfo = {
      grantType: "OAUTH",
      authProvider: authProvider,
      token: accessToken,
    };
    apis.user.scLogIn(loginInfo)
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
      .catch((err) => {
        console.log(err);
        apis.user.scSignUP(loginInfo)
          .then((response) => {
          })
          .catch((err) => alert("Something went wrong. Try again!"));
      });
  };

  const loginReqByPW = (email, pw) => {
    const loginInfo = {
      email: email,
      password: pw,
    };

    apis.user
      .pwLogIn(loginInfo)
      .then((response) => {
        apis.user.setToken(response.data.token);
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
        if (err.response !== undefined) alert(Object.values(err.response['data']).join());
        else alert("서버가 터졌어요!");
      });
  };

  const saveLoginInfo = (loginInfo) => {
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
      apis.user.setToken(token);

      setState((state) => ({
        ...state,
        logged: true,
        user: user,
      }));
    } else {
      logoutReq();
    }
  };

  const logoutReq = () => {
    window.localStorage.clear();
    setState((state) => {
      return {
        ...state,
        user: {},
        logged: false,
      };
    });

    apis.user.logout().catch((err) => console.log(err));
  };

  const fetchUserList = async () => {
    apis.user.getAll()
      .then((response) => {
        setState((state) => {
          return {
            ...state,
            userList: response.data,
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
