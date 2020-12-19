import React, { createContext, useState, useContext } from "react";

const defaultBoardList = {
  boardList: [
    {
      id: 1,
      key: 'QWERTY',
      name: "Waffle-18.5-toyproject-team5",
      lists: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      // 접속 시간,
      // 스타 여부,
      members: [1],
    },
    {
      id: 2,
      key: 'ASDFGH',
      name: "temporary board",
      lists: [],
      // 접속 시간,
      // 스타 여부,
      members: [1],
    },
  ],
  getBoardByKey: () => {},
  getPersonalBoards: () => {},
  getRecentBoards: () => {},
  getStarredBoards: () => {}
};

const BoardListContext = createContext(defaultBoardList);

const BoardListProvider = (props) => {
  const { children } = props;

  const getBoardByKey = (key) => {
    return state.boardList.find(item => item.key === key);
  }

  const getPersonalBoards = () => {
    return state.boardList;
  }

  const getRecentBoards = () => {
    // 백에서 API에 시간 필드 추가해주면 구현. 일단 전부 리턴
    return state.boardList;
  }

  const getStarredBoards = () => {
    // 백에서 API에 스타 필드 추가해주면 구현. 일단 전부 리턴
    return state.boardList;
  }

  const boardListState = {
    ...defaultBoardList,
    getBoardByKey,
    getPersonalBoards,
    getRecentBoards,
    getStarredBoards
  };

  const [state, setState] = useState(boardListState);

  return <BoardListContext.Provider value={state}>{children}</BoardListContext.Provider>;
};

const useBoardListContext = () => useContext(BoardListContext);

export { useBoardListContext, BoardListProvider };