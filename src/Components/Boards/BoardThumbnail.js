import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./BoardThumbnail.css";
import { useHistory } from "react-router-dom";
import { useBoardContext } from "../../Contexts";

// 별 누르면 중요표시 되는 기능은 백엔드랑 협의해서 구현하거나 안하거나

const BoardThumbnail = ({ item }) => {
  const history = useHistory();
  const [star, setStar] = useState(false);
  
  const goToBoard = (item) => {
    console.log(star);
    if(star) return;
    const key = item.key;
    const name = item.name.replaceAll(' ', '-').toLowerCase();
    console.log(item.id);
    history.push(`/b/${key}/${name}`);
  };

  const starren = () => {
    console.log('[미구현 기능] star 요청');
  }

  return (
    <li
      className="board-wrapper"
      onClick={() => goToBoard(item)}
    >
      {item.name}
      <FontAwesomeIcon
        className={`starIcon`}
        icon={faStar}
        onMouseEnter={() => setStar(true)}
        onMouseLeave={() => setStar(false)}
        onClick={() => starren()}
      />
    </li>
  );
};

export default BoardThumbnail;
