import React from 'react';
import { useBoardContext, BoardProvider } from './Board';
import { useUserContext, UserProvider } from './User';

export {
  useBoardContext, BoardProvider,
  useUserContext, UserProvider,
}

export const contexts = [
  BoardProvider,
  UserProvider
]

export const AppProvider = ({ contexts, children }) => contexts.reduce(
  (prev, context) => React.createElement(context, {
    children: prev
  }), 
  children
);