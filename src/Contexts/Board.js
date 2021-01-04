import React, { createContext, useState, useContext } from "react";
import apis from "../Library/Apis";

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
    apis.board
      .get(data)
      .then((response) => {
        setState((state) => {
          return {
            ...state,
            board: response.data,
          };
        });
      })
      .catch((err) => console.log(err));
  };

  const boardState = {
    ...defaultBoard,
    getBoardData,
    fetchBoard,
  };

  const [state, setState] = useState(boardState);

  return (
    <BoardContext.Provider value={state}>{children}</BoardContext.Provider>
  );
};

const useBoardContext = () => useContext(BoardContext);

export { useBoardContext, BoardProvider };
