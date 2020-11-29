import React, { createContext, useState, useContext } from "react";

const defaultActivityList = {
  // variable used for giving id to each team informations
  activityList: [
    
  ]
};

const ActivityListContext = createContext(defaultActivityList);

const ActivityListProvider = (props) => {
  const { children } = props;

  const activityListState = {
    ...defaultBoardList,
  };

  const [state, setState] = useState(activityListState);

  return <ActivityListContext.Provider value={state}>{children}</ActivityListContext.Provider>;
};

const useActivityListContext = () => useContext(ActivityListContext);

export { useActivityListContext, ActivityListProvider };