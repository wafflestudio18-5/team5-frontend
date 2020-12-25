import React from 'react';
import { Card } from '../../Components';

function CardPage(props) {
  const key = props.match.params.card_key;
  const id_and_name = props.match.params.card_name;
  const id = parseInt(id_and_name.split("-")[0]);
  const name = id_and_name.replace(id + "-", "").replaceAll("-", " ");
  console.log("key and name is:");
  console.log(key);
  console.log(id);
  console.log(name);
  return(
    <Card/>
  );
}

export default CardPage;

