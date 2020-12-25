import React from 'react';
import { Card } from '../../Components';
import BoardPage from '../Board/Board.js';


function CardPage(props) {
  const key = props.match.params.card_key;
  const id_and_name = props.match.params.card_name;
  const id = parseInt(id_and_name.split("-")[0]);
  const name = id_and_name.replace(id + "-", "").replaceAll("-", " ");

  return(
    <><BoardPage/>
      <Route
        path={routes.CardPage.path}
        component={routes.CardPage.component}
      />
    <Card/></>
  );
}

export default CardPage;

