import React, { createContext, useState, useContext } from "react";

const defaultUserList = {
  // variable used for giving id to each team informations
  userList: [
    {
      id: 1,
      username: 'mina',
      email: '123456789@snu.ac.kr',
      firstname: null,
      lastname: null,
      access_type: 'OAUTH'
    },
  ],
  getUsersById: (id_arr) => { }
};

const UserListContext = createContext(defaultUserList);

const UserListProvider = (props) => {
  const { children } = props;

  const getUsersById = (id_arr) => {
    // 나중에 구현
  }

  const userListState = {
    ...defaultUserList,
    getUsersById
  };

  const [state, setState] = useState(userListState);

  return <UserListContext.Provider value={state}>{children}</UserListContext.Provider>;
};

const useUserListContext = () => useContext(UserListContext);

export { useUserListContext, UserListProvider };