import React, { createContext, useState, useContext } from "react";

[{card_name: 'Sprint 1'}, {card_name: 'Scrum 11/26'}, {card_name: 'Sprint 2'}, {card_name: 'Sprint 3'}, {card_name: 'Sprint 4'}],
[{card_name: 'Board'}, {card_name: 'Boards'}, {card_name: 'login'}, {card_name: 'signup'}, {card_name: 'root'}, {card_name: '+templates'}, {card_name: '+settings'}, {card_name: '+members'},  {card_name: '???'},  {card_name: '와플조아'},  {card_name: '와플조아'},  {card_name: '와플조아'}],
[{card_name: '카드예시'}, {card_name: '다다르게할수있답니당'}, {card_name: '갑자기 카드이름이 아주아주 길어지면 어떻게될지 궁금해졌다'}, {card_name: '별 문제가 없는 것으로 판명되었다'}, {card_name: '룰룰루'}, {card_name: '와플조아'}, {card_name: '와플최고'}, {card_name: '와플와플와플'},  {card_name: '와플조아'}], 
[{card_name: '우현민(프론트엔드)'}, {card_name: '정민수(서버)'}, {card_name: '정대용(서버)'}, {card_name: '이세원(서버)'}, {card_name: '김유진(프론트엔드)'}],
[{card_name: '와'}, {card_name: '플'}],
[{card_name: '카드1번째'}, {card_name: '카드두번쨰'}, {card_name: '카드3번째'}, {card_name: '카드4번쨰'}, {card_name: '카드5번째'}, {card_name: '카드6번쨰'}, {card_name: '카드7번째'}, {card_name: '카드8번쨰'}],
[{card_name: '카드하나'}, {card_name: '카드둘'}, {card_name: '와플조아'}], 
[{card_name: '카드하나'}, {card_name: '카드둘'}],
const defaultListList = {
  // variable used for giving id to each team informations
  listList: [
    {
      id: 1,
      name: '회의 일정',
      cards_id: 
    },
    {
      id: 2,
      name: '페이지들',
    },
    {
      id: 3,
      name: '세번째 리스트',
    },
    {
      id: 4,
      name: '팀원 목록',
    },
    {
      id: 5,
      name: '구분',
    },
    {
      id: 6,
      name: '여섯번째리스트',
    },
    {
      id: 7,
      name: '일곱번째리스트',
    },
    {
      id: 8,
      name: '여덟번째리스트',
    },
    {
      id: 9,
      name: '아홉째리스트',
    }
  ]
};

const ListListContext = createContext(defaultListList);

const ListListProvider = (props) => {
  const { children } = props;

  const listListState = {
    ...defaultListList,
  };

  const [state, setState] = useState(listListState);

  return <ListListContext.Provider value={state}>{children}</ListListContext.Provider>;
};

const useListListContext = () => useContext(ListListContext);

export { useListListContext, ListListProvider };