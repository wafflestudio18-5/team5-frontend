import React, { createContext, useState, useContext } from "react";
import { get } from '../Server';

const defaultBoard = {
  board: null,
  getBoardData: () => {},
  fetchBoard: async (data) => {},
};

const BoardContext = createContext(defaultBoard);

const BoardProvider = (props) => {
  const { children } = props;

  const getBoardData = () => state.board;

  const fetchBoard = async (data) => {
    const board = await get('/api/v1/board', data);
    setState((state) => {
      return {
        ...state,
        board: board
      }
    });
  }

  const boardState = {
    ...defaultBoard,
    getBoardData,
    fetchBoard,
  };

  const [state, setState] = useState(boardState);

  return <BoardContext.Provider value={state}>{children}</BoardContext.Provider>;
};

const useBoardContext = () => useContext(BoardContext);

export { useBoardContext, BoardProvider };