import React from 'react';
import { useActivityListContext, ActivityListProvider } from './ActivityList';
import { useBoardListContext, BoardListProvider } from './BoardList';
import { useCardListContext, CardListProvider } from './CardList';
import { useListListContext, ListListProvider } from './ListList';
import { useUserContext, UserProvider } from './User';
import { useUserListContext, UserListProvider } from './UserList';

export {useActivityListContext, ActivityListProvider, 
  useBoardListContext, BoardListProvider,
  useCardListContext, CardListProvider,
  useListListContext, ListListProvider,
  useUserContext, UserProvider,
  useUserListContext, UserListProvider
}

export const contexts = [
  ActivityListProvider,
  BoardListProvider,
  CardListProvider,
  ListListProvider,
  UserListProvider,
  UserProvider
]

export const AppProvider = ({ contexts, children }) => contexts.reduce(
  (prev, context) => React.createElement(context, {
    children: prev
  }), 
  children
);