import React, { createContext, useState, useContext } from "react";

const defaultCardList = {
  // variable used for giving id to each team informations
  cardList: [
    
  ]
};

const CardListContext = createContext(defaultCardList);

const CardListProvider = (props) => {
  const { children } = props;

  const cardListState = {
    ...defaultCardList,
  };

  const [state, setState] = useState(cardListState);

  return <CardListContext.Provider value={state}>{children}</CardListContext.Provider>;
};

const useCardListContext = () => useContext(CardListContext);

export { useCardListContext, CardListProvider };