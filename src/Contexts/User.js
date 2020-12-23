import React, { createContext, useState, useContext } from "react";
import { post, put } from "../Server";

/* TODO: 백엔드 연동하고 나면 이걸로 바꿔야 함
const defaultUser = {
  // variable used for giving id to each team informations
  logged_in: false,
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
  logged_in: false,
  user: {
    id: 1,
    username: 'mina',
    email: '123456789@snu.ac.kr',
    firstname: null,
    lastname: null,
    access_type: 'OAUTH'
  },
  users: [
    
  ],
  loginReqByPW: () => {},
  loginReqBySC: () => {},
  logoutReq: () => {},
  fetchUserList: () => {}
};

const UserContext = createContext(defaultUser);

const UserProvider = (props) => {
  const { children } = props;

  const loginReqByPW = async (email, pw) => {
    const response = await post('/api/v1/user/login', {
      grantType: "PASSWORD",
      email: email,
      password: pw
    });

    setState((state) => {
      return {
        ...state,
        logged_in: true,
        user: response.data
      }
    });
  };

  const loginReqBySC = async (authProvider, accessToken) => {
    const response = await post('/api/v1/user/login', {
      grantType: "OAUTH",
      authProvider: authProvider,
      accessToken: accessToken
    });

    setState((state) => {
      return {
        ...state,
        logged_in: true,
        user: response.data
      }
    });
  };

  const logoutReq = () => {
    const response = put('/api/v1/user/logout', {});

    setState((state) => {
      return {
        ...state,
        user: {},
        logged_in: false
      }
    });
  };

  const fetchUserList = () => {
    setState((state) => {
      return {
        
      }
    });
  };

  const userState = {
    ...defaultUser,
    loginReqByPW,
    loginReqBySC,
    logoutReq,
    fetchUserList
  };

  const [state, setState] = useState(userState);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserProvider };
