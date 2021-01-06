import React, { createContext, useState, useContext } from "react";
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
  signUpSuccess: false
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
        alert(Object.values(err.response['data']).join());
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
        console.log("소셜 로그인 성공");
        saveLoginInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("소셜 로그인 실패: 회원가입으로 넘어감");
        apis.user.scSignUP(loginInfo)
          .then((response) => {
            console.log("소셜 회원가입 성공");
          })
          .catch((err) => console.log("여긴 어케 온거임 대체"));
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
        console.log("비밀번호로 로그인 성공");
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
      console.log('토큰 저장: ' + token);
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
