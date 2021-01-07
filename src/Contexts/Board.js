import React, { createContext, useState, useContext } from "react";
import apis from "../Library/Apis";

const defaultBoard = {
  board: null,
  users: [],
  modal: false,
  move: {
    bool: false, // whether moving or not
    mode: "", // "", "card", "list"
    from: null, // card which is moving
  },
  setModal: () => {},
  setMove: () => {},
  getBoardData: () => {},
  fetchUserList: () => {},
  fetchBoardById: () => {},
  fetchBoardByKey: () => {},
};

const BoardContext = createContext(defaultBoard);

const BoardProvider = (props) => {
  const { children } = props;

  const setMove = ({ bool, mode, from }) => {
    if (bool) {
      setState((state) => {
        return {
          ...state,
          move: { bool: true, mode, from },
        };
      });
    } else {
      setState((state) => {
        return {
          ...state,
          move: { bool: false, mode: "", from: null, to: null },
        };
      });
    }
  };

  const setModal = (e) => {
    setState((state) => ({
      ...state,
      modal: e,
    }));
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
  };

  const [state, setState] = useState(boardState);

  return (
    <BoardContext.Provider value={state}>{children}</BoardContext.Provider>
  );
};

const useBoardContext = () => useContext(BoardContext);

export { useBoardContext, BoardProvider };
