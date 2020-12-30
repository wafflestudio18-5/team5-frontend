import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./BoardThumbnail.css";
import { useHistory } from "react-router-dom";
import { useBoardContext } from "../../Contexts";
import axios from 'axios';

const _sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const BoardThumbnail = ({ id, name, key, star, refreshBoards }) => {
  const history = useHistory();
  const [enter, setEnter] = useState(false);
  const [anime, setAnime] = useState(false);
  const [st, setSt] = useState(false);

  useEffect(() => {
    setSt(star);
  }, [])

  const goToBoard = async () => {
    console.log(enter);
    if (enter) return;

    setAnime(true);
    await _sleep(400); // 0.4 sec

    const newName = name.replaceAll(" ", "-").toLowerCase();
    console.log(id);
    history.push(`/b/${key}/${newName}`);
  };

  const toggleStar = (id, st) => {
    axios.put("/api/v1/board/", { id: id, star: !st }).then((response) => {
      console.log(`modify request from ${st} to ${!st}`);
      refreshBoards();
      setSt(response.data.star); // TODO: 백에서 구현 아직 안 해주심
    });
  };

  return (
    <li className={`board-wrapper ${anime}`} onClick={goToBoard}>
      {anime ? "Loading..." : name}
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
