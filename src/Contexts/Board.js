import React, { createContext, useState, useContext } from "react";
import apis from "../Library/Apis";

const defaultBoard = {
  board: null,
  users: [],
  modal: false,
  move: false,
  lInd: null,
  setModal: () => {},
  setMove: () => {},
  getBoardData: () => {},
  fetchUserList: () => {},
  fetchBoardById: () => {},
  fetchBoardByKey: () => {},
  changeListPos: () => {},
};

const BoardContext = createContext(defaultBoard);

const BoardProvider = (props) => {
  const { children } = props;

  const setMove = (move) => {
    setState((state) => ({
      ...state,
      move,
    }));
  };

  const setModal = (e) => {
    setState((state) => ({
      ...state,
      modal: e,
    }));
  };

  const changeListPos = (i1, i2) => {
    setState((state) => {
      let tList = state.board.lists;
      let temp = tList[i1];
      tList[i1] = tList[i2];
      tList[i2] = temp;

      return {
        ...state,
        lInd: i2,
        board: {
          ...state.board,
          lists: tList,
        },
      };
    });
  };

  const getBoardData = () => state.board;

  const fetchUserList = (id) => {
    apis.board
      .getUsers({ board_id: id })
      .then((response) =>
        setState((state) => ({
          ...state,
          users: response.data.results,
        }))
      )
      .catch((err) => console.log(err));
  };

  const fetchBoardById = ({ id }) => {
    apis.board
      .getById({ id })
      .then((response) => {
        setState((state) => {
          return {
            ...state,
            board: response.data,
          };
        });
        fetchUserList(response.data.id);
      })
      .catch((err) => console.log(err));
  };

  const fetchBoardByKey = ({ key }) => {
    apis.board
      .getByKey({ key })
      .then((response) => {
        setState((state) => {
          return {
            ...state,
            board: response.data,
          };
        });
        fetchUserList(response.data.id);
      })
      .catch((err) => console.log(err));
  };

  const boardState = {
    ...defaultBoard,
    getBoardData,
    fetchBoardById,
    fetchBoardByKey,
    fetchUserList,
    setModal,
    setMove,
    changeListPos,
  };

  const [state, setState] = useState(boardState);

  return (
    <BoardContext.Provider value={state}>{children}</BoardContext.Provider>
  );
};

const useBoardContext = () => useContext(BoardContext);

export { useBoardContext, BoardProvider };
