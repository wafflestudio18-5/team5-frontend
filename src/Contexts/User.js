import React, { createContext, useState, useContext } from "react";
import { get, post, put } from "../Server";

/* TODO: 백엔드 연동하고 나면 이걸로 바꿔야 함
const defaultUser = {
  // variable used for giving id to each team informations
  logged: false,
  user: {
    name: ''
  },
  loginRequest: () => {},
  logoutRequest: () => {},
  fetchInformation: () => {}
};
*/

const defaultUser = {
  // variable used for giving id to each team informations
  logged: true,
  user: {
    id: 1,
    username: "mina",
    email: "123456789@snu.ac.kr",
    firstname: null,
    lastname: null,
    access_type: "OAUTH",
  },
  users: [],
  loginReqByPW: () => {},
  loginReqBySC: () => {},
  logoutReq: () => {},
  fetchUserList: () => {},
  saveLoginInfo: () => {},
  loadLoginInfo: () => {},
  setLog: () => {}, // TODO: 개발을 위한 함수, 최종 단계에서는 삭제해야 함.
};

const UserContext = createContext(defaultUser);

const UserProvider = (props) => {
  const { children } = props;

  const loginReqByPW = async (email, pw) => {
    const loginInfo = {
      grantType: "PASSWORD",
      email: email,
      password: pw,
    };
    const response = await post("/api/v1/user/login", loginInfo);

    setState((state) => {
      return {
        ...state,
        logged: true,
        user: response.data,
      };
    });

    saveLoginInfo(response.data);
  };

  const saveLoginInfo = (loginInfo) => {
    window.localStorage.setItem("loginInfo", loginInfo);
  };

  const setLog = (log) => {
    setState((state) => {
      console.log(`set logged from ${state.logged} to ${log}`);
      return {
        ...state,
        logged: log,
      };
    });
  };

  const loadLoginInfo = () => {
    const info = window.localStorage.getItem("loginInfo");
    if (info) {
      setState((state) => ({
        ...state,
        logged: true,
        user: info,
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
    const response = await post("/api/v1/user/login", loginInfo);

    setState((state) => {
      return {
        ...state,
        logged: true,
        user: response.data,
      };
    });

    saveLoginInfo(response.data);
  };

  const logoutReq = () => {
    const response = put("/api/v1/user/logout", {});

    setState((state) => {
      return {
        ...state,
        user: {},
        logged: false,
      };
    });

    window.sessionStorage.clear();
  };

  const fetchUserList = async () => {
    const response = await get("/api/v1/user/userlist");
    
    setState((state) => {
      return {
        ...state,
        users: response,
      };
    });
  };

  const userState = {
    ...defaultUser,
    loginReqByPW,
    loginReqBySC,
    logoutReq,
    fetchUserList,
    saveLoginInfo,
    loadLoginInfo,
    setLog,
  };

  const [state, setState] = useState(userState);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserProvider };
