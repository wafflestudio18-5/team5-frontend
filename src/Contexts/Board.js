import React, { createContext, useState, useContext } from "react";
import apis from "../Library/Apis";

const defaultBoard = {
  board: null,
  modal: false,
  move: {
    bool: false,// whether moving or not
    mode: "",   // "", "card", "list"
    from: null, // card which is moving
  },
  setModal: () => {},
  setMove: () => {},
  getBoardData: () => {},
  fetchBoard: (data) => {},
};

const BoardContext = createContext(defaultBoard);

const BoardProvider = (props) => {
  const { children } = props;

  const setMove = ({bool, mode, from }) => {
    if(bool) {
      setState(state => {
        return {
          ...state,
          move: {bool: true, mode, from }
        }
      })
    } else {
      setState(state => {
        return {
          ...state,
          move: {bool: true, mode: "", from: null, to: null}
        }
      })
    }
    
  }

  const setModal = (e) => {
    setState((state) => ({
      ...state,
      modal: e,
    }));
  };

  const getBoardData = () => state.board;

  const fetchBoard = (data) => {
    console.log(apis);
    console.log(apis.board);
    console.log(apis.board.get);
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
    setModal,
    setMove
  };

  const [state, setState] = useState(boardState);

  return (
    <BoardContext.Provider value={state}>{children}</BoardContext.Provider>
  );
};

const useBoardContext = () => useContext(BoardContext);

export { useBoardContext, BoardProvider };
