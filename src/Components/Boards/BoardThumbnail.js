import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import "./BoardThumbnail.css";

// 별 누르면 중요표시 되는 기능은 백엔드랑 협의해서 구현하거나 안하거나

const BoardThumbnail = ({ item, history }) => {
  const [enter, setEnter] = useState(false);
  const [over, setOver] = useState(false);

  const goToBoard = (item) => {
    history.push("백에서 api 만들어 주면 데이터 받아서 주소 만들어야지");
  };

  return (
    <li
      className="board-wrapper"
      onClick={() => goToBoard(item)}
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
    >
      {item.title}
      <FontAwesomeIcon
        className={`starIcon ${enter}${over}`}
        onMouseEnter={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        icon={faStar}
      />
    </li>
  );
};

export default BoardThumbnail;
