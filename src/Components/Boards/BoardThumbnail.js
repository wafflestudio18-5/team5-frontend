import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./BoardThumbnail.css";
import { useHistory } from "react-router-dom";
import { useBoardContext } from "../../Contexts";

const _sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const BoardThumbnail = ({ item }) => {
  const history = useHistory();
  const [star, setStar] = useState(false);
  const [anime, setAnime] = useState(false);

  const goToBoard = async (item) => {
    console.log(star);
    if (star) return;

    setAnime(true);
    await _sleep(400); // 1 sec

    const key = item.key;
    const name = item.name.replaceAll(" ", "-").toLowerCase();
    console.log(item.id);
    history.push(`/b/${key}/${name}`);
  };

  const starren = () => {
    console.log("[미구현 기능] star 요청");
  };

  return (
    <li className={`board-wrapper ${anime}`} onClick={() => goToBoard(item)}>
      {anime ? "Loading..." : item.name}
      {anime ? null : (
        <FontAwesomeIcon
          className={`starIcon`}
          icon={faStar}
          onMouseEnter={() => setStar(true)}
          onMouseLeave={() => setStar(false)}
          onClick={() => starren()}
        />
      )}
    </li>
  );
};

export default BoardThumbnail;
