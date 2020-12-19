import React, { createContext, useState, useContext } from "react";
import { get } from '../Server';

const defaultBoard = {
  board: null,
  getBoardData: () => {},
  fetchBoard: () => {}
};

const BoardContext = createContext(defaultBoard);

const BoardProvider = (props) => {
  const { children } = props;

  const getBoardData = () => state.board;

  const fetchBoard = async (id) => {
    setState(async (state) => {
      const board = await get('/api/v1/board', {id: id});
      return {
        ...state,
        board: board
      }
    });
    console.log(state);
  }

  const boardState = {
    ...defaultBoard,
    getBoardData,
    fetchBoard
  };

  const [state, setState] = useState(boardState);

  return <BoardContext.Provider value={state}>{children}</BoardContext.Provider>;
};

const useBoardContext = () => useContext(BoardContext);

export { useBoardContext, BoardProvider };