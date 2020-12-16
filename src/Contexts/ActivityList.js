import React, { createContext, useState, useContext } from "react";

const defaultActivityList = {
  // variable used for giving id to each team informations
  activityList: [
    
  ],
  get_activities_from_list: (id_arr) => { }
};

const ActivityListContext = createContext(defaultActivityList);

const ActivityListProvider = (props) => {
  const { children } = props;

  const get_activities_from_list = (id_arr) => {
    // 나중에 구현
  }

  const activityListState = {
    ...defaultActivityList,
    get_activities_from_list
  };

  const [state, setState] = useState(activityListState);

  return <ActivityListContext.Provider value={state}>{children}</ActivityListContext.Provider>;
};

const useActivityListContext = () => useContext(ActivityListContext);

export { useActivityListContext, ActivityListProvider };