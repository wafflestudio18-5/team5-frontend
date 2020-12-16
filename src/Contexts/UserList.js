import React, { createContext, useState, useContext } from "react";

const defaultUserList = {
  // variable used for giving id to each team informations
  userList: [
    
  ],
  get_users_from_list: (id_arr) => { }
};

const UserListContext = createContext(defaultUserList);

const UserListProvider = (props) => {
  const { children } = props;

  const get_users_from_list = (id_arr) => {
    // 나중에 구현
  }

  const userListState = {
    ...defaultUserList,
    get_users_from_list
  };

  const [state, setState] = useState(userListState);

  return <UserListContext.Provider value={state}>{children}</UserListContext.Provider>;
};

const useUserListContext = () => useContext(UserListContext);

export { useUserListContext, UserListProvider };