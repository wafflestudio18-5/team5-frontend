import React, { createContext, useState, useContext } from "react";

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
  loginRequest: () => {},
  logoutRequest: () => {},
  fetchInformation: () => {}
};

const UserContext = createContext(defaultUser);

const UserProvider = (props) => {
  const { children } = props;

  const loginRequest = () => {
    setState((state) => {
      return {

      }
    });
  };

  const logoutRequest = () => {
    setState((state) => {
      return {

      }
    });
  };

  const fetchInformation = () => {
    setState((state) => {
      return {
        
      }
    });
  };

  const userState = {
    ...defaultUser,
    loginRequest,
    logoutRequest,
    fetchInformation
  };

  const [state, setState] = useState(userState);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserProvider };
