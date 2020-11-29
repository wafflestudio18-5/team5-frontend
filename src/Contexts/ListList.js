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
      cards: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    },
    {
      id: 3,
      name: '아 카드 진짜 많네',
      cards: [18, 19, 20, 21, 22, 23, 24, 25, 26]
    },
    {
      id: 4,
      name: '팀원 목록',
      cards: [27, 28, 29, 30, 31]
    },
    {
      id: 5,
      name: '구분',
      cards: [32, 33]
    },
    {
      id: 6,
      name: '물론 감사합니다 ㅎㅎ',
      cards: [34, 35, 36, 37, 38, 39, 40, 41]
    },
    {
      id: 7,
      name: '일곱번째리스트',
      cards: [42, 43, 44]
    },
    {
      id: 8,
      name: '여덟번째리스트',
      cards: [45, 46]
    },
    {
      id: 9,
      name: '아홉째리스트',
      cards: []
    }
  ],
  get_lists_from_id_array = (id_arr) => {},
};

const ListListContext = createContext(defaultListList);

const ListListProvider = (props) => {
  const { children } = props;

  get_lists_from_id_array = (id_arr) => {
    // 나중에 구현
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