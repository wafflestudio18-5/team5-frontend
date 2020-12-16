import React, { createContext, useState, useContext } from "react";

const defaultCardList = {
  cardList: [
    {
      id: 1,
      name: 'Sprint 1',
      key: 'POIUYT',
      members: [],
    },
    {
      id: 2,
      name: 'Scrum 11/26',
      key: 'POIUYT',
      members: [],
    },
    {
      id: 3,
      name: 'Sprint 2',
      key: 'POIUYT',
      members: [],
    },
    {
      id: 4,
      name: 'Sprint 3',
      key: 'POIUYT',
      members: [],
    },
    {
      id: 5,
      name: 'Sprint 4',
      key: 'POIUYT',
      members: [],
    },
    {
      id: 6,
      name: 'Board',
      key: 'POIUYT',
      members: [],
    },
    {
      id: 7,
      name: 'Boards',
      key: 'POIUYT',
      members: [],
    },
    {
      id: 8,
      name: 'login',
      key: 'POIUYT',
      members: [],
    },
    {
      id: 9,
      name: 'signup',
      key: 'POIUYT',
      members: [],
    },
    {
      id: 10,
      name: 'root',
      key: 'POIUYT',
      members: [],
    },
    {
      id: 11,
      name: '+templates',
      key: 'POIUYT',
      members: [],
    },
    {
      id: 12,
      name: '+settings',
      key: 'POIUYT',
      members: [],
    },
    {
      id: 13,
      name: '+members',
      key: 'POIUYT',
      members: [],
    },
    {
      id: 14,
      name: '너무 많아서 여기까지 하고 포기',
      key: 'POIUYT',
      members: [],
    },
  ],
  get_cards_from_id_array: () => {}
};

const CardListContext = createContext(defaultCardList);

const CardListProvider = (props) => {
  const { children } = props;

  const get_cards_from_id_array = (id_arr) => {
    return state.cardList.filter(item => id_arr.includes(item.id));
  }

  const cardListState = {
    ...defaultCardList,
    get_cards_from_id_array
  };

  const [state, setState] = useState(cardListState);

  return <CardListContext.Provider value={state}>{children}</CardListContext.Provider>;
};

const useCardListContext = () => useContext(CardListContext);

export { useCardListContext, CardListProvider };