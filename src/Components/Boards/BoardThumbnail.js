import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import "./BoardThumbnail.css";
import { useHistory } from "react-router-dom";
import { useBoardContext } from "../../Contexts";

// 별 누르면 중요표시 되는 기능은 백엔드랑 협의해서 구현하거나 안하거나

const BoardThumbnail = ({ item, goToBoard }) => {
  const [enter, setEnter] = useState(false);
  const [over, setOver] = useState(false);

  return (
    <li
      className={`board-wrapper`}
      onClick={() => goToBoard(item)}
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
    >
      {item.name}
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
