import React, { createContext, useState, useContext } from "react";

const defaultBoardList = {
  // variable used for giving id to each team informations
  boardList: [
    {
      id: 1,
      key: 'QWERTY',
      name: "Waffle-18.5-toyproject-team5",
      lists: []
    },
    {
      id: 2,
      key: 'ASDFGH',
      title: "temporary board",
      lists: []
    },
  ],
  get_recent_boards = () => {},
  get_starred_boards = () => {}
};

const BoardListContext = createContext(defaultBoardList);

const BoardListProvider = (props) => {
  const { children } = props;

  const get_recent_boards = () => {
    // 백에서 API에 시간 필드 추가해주면 구현
  }

  const get_starred_boards = () => {
    // 백에서 API에 스타 필드 추가해주면 구현
  }

  const boardListState = {
    ...defaultBoardList,
    get_recent_boards,
    get_starred_boards
  };

  const [state, setState] = useState(boardListState);

  return <BoardListContext.Provider value={state}>{children}</BoardListContext.Provider>;
};

const useBoardListContext = () => useContext(BoardListContext);

export { useBoardListContext, BoardListProvider };