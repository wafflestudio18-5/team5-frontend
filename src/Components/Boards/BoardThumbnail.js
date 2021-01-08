import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./BoardThumbnail.css";
import { useHistory } from "react-router-dom";
import apis from '../../Library/Apis';

const _sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const BoardThumbnail = ({ id, name, boardKey, star, refreshBoards }) => {
  const history = useHistory();
  const [enter, setEnter] = useState(false);
  const [anime, setAnime] = useState(false);
  const [st, setSt] = useState(false);

  useEffect(() => {
    setSt(star);
  }, [])

  const goToBoard = async () => {
    setAnime(true);
    await _sleep(400); // 0.4 sec

    const newName = name.replaceAll(" ", "-").toLowerCase();
    history.push(`/b/${boardKey}/${newName}`);
  };

  const toggleStar = (id, st) => {
    let targetStar;
    if(st) targetStar = "False";
    else targetStar = "True";
    apis.board.put({ id: id, star: targetStar }).then((response) => {
      refreshBoards();
      setSt(response.data.star);
    }).catch(err => console.log(err));
  };

  return (
    <li className={`board-wrapper ${anime}`} onClick={goToBoard}>
      {anime ? <img src="https://a.trellocdn.com/prgb/dist/images/header-loading-logo.d73159084f5122775d4d.gif"/> : name}
      {anime ? null : (
        <FontAwesomeIcon
          className={`starIcon ${st}`}
          icon={faStar}
          onMouseEnter={() => setEnter(true)}
          onMouseLeave={() => setEnter(false)}
          onClick={() => toggleStar(id, st)}
        />
      )}
    </li>
  );
};

export default BoardThumbnail;
