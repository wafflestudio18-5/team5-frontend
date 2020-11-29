import React, { createContext, useState, useContext } from "react";

const defaultListList = {
  // variable used for giving id to each team informations
  listList: [
    {
      id: 1,
      name: '회의 일정',
      cards: [1, 2, 3, 4, 5]
    },
    {
      id: 2,
      name: '페이지들',
      cards: [6, 7, 8, 9, 10, 11, 12, 13, 14]
    },
    {
      id: 3,
      name: '아 카드 진짜 많네',
      cards: []
    },
    {
      id: 4,
      name: '팀원 목록',
      cards: []
    },
    {
      id: 5,
      name: '구분',
      cards: []
    },
    {
      id: 6,
      name: '물론 감사합니다 ㅎㅎ',
      cards: []
    },
    {
      id: 7,
      name: '일곱번째리스트',
      cards: []
    },
    {
      id: 8,
      name: '여덟번째리스트',
      cards: []
    },
    {
      id: 9,
      name: '아홉째리스트',
      cards: []
    }
  ],
  get_lists_from_id_array: (id_arr) => {},
};

const ListListContext = createContext(defaultListList);

const ListListProvider = (props) => {
  const { children } = props;

  const get_lists_from_id_array = (id_arr) => {
    return state.listList.filter(item => id_arr.includes(item.id));
  };

  const listListState = {
    ...defaultListList,
    get_lists_from_id_array
  };

  const [state, setState] = useState(listListState);

  return <ListListContext.Provider value={state}>{children}</ListListContext.Provider>;
};

const useListListContext = () => useContext(ListListContext);

export { useListListContext, ListListProvider };