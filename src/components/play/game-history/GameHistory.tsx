import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./game-history.scss";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import History from "./History";

type GameHistoryProps = {
  rf: React.RefObject<HTMLDivElement>;
};

const GameHistory = ({ rf }: GameHistoryProps) => {
  const [toggled, setToggled] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    const ref = rf?.current;
    if (ref) {
      if (toggled) {
        ref.classList.add("toggled");
      } else {
        ref.classList.remove("toggled");
      }
    }
  }, [toggled, rf]);
  return (
    <div className="right">
      <div
        className={`game-history${hovered ? " hovered " : ""}${
          toggled ? " toggled" : ""
        }`}
      >
        <div
          className="toggler-btn"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setToggled((prevstate) => !prevstate)}
        >
          <div className="shadow">
            <FontAwesomeIcon icon={faHistory} size="1x" />
          </div>
        </div>
        <div className="history">
          <History />
        </div>
      </div>
    </div>
  );
};
export default GameHistory;
