import React, { createContext, useState, useContext } from "react";

/* TODO: 백엔드 연동하고 나면 이걸로 바꿔야 함
const defaultUser = {
  // variable used for giving id to each team informations
  logged_in: false,
  user: {
    name: ''
  },
  login_req: () => {},
  logout_req: () => {},
  fetch_info: () => {}
};
*/

const defaultUser = {
  // variable used for giving id to each team informations
  logged_in: true,
  user: {
    id: 1,
    username: 'mina',
    email: '123456789@snu.ac.kr',
    firstname: null,
    lastname: null,
    access_type: 'OAUTH'
  },
  login_req: () => {},
  logout_req: () => {},
  fetch_info: () => {}
};

const UserContext = createContext(defaultUser);

const UserProvider = (props) => {
  const { children } = props;

  const login_req = () => {
    setState((state) => {
      return {

      }
    });
  };

  const logout_req = () => {
    setState((state) => {
      return {

      }
    });
  };

  const fetch_info = () => {
    setState((state) => {
      return {
        
      }
    });
  };

  const userState = {
    ...defaultUser,
    login_req,
    logout_req,
    fetch_info
  };

  const [state, setState] = useState(userState);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserProvider };
