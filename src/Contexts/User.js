import React, { createContext, useState, useContext } from "react";
import axios from "axios";

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
    axios
      .post("/api/v1/user/", {
        grantType: "PASSWORD",
        email: email,
        password: password,
        username: username,
      })
      .then((response) => {
        console.log("로그인 성공");
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const loginReqByPW = async (email, pw) => {
    const loginInfo = {
      grantType: "PASSWORD",
      email: email,
      password: pw,
    };

    axios
      .put("/api/v1/user/login/", loginInfo)
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
    console.log('save login info:');
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
      id, username, email, first_name, last_name, token
    }
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
    const response = await axios.post("/api/v1/user/login/", loginInfo);

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
    window.localStorage.clear();
    setState((state) => {
      return {
        ...state,
        user: {},
        logged: false,
      };
    });

    axios
      .put("/api/v1/user/logout/", {})
      .catch((err) => console.log(err));
  };

  const fetchUserList = async () => {
    axios
      .get("/api/v1/user/list/")
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
