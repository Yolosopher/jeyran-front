import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import History from "./History";

type GameHistoryProps = {
  rf: React.RefObject<HTMLDivElement>;
};

const GameHistory = ({ rf }: GameHistoryProps) => {
  const matchmedia = useMemo(() => window.matchMedia("(min-width: 1025)"), []);
  const [toggled, setToggled] = useState<boolean>(matchmedia.matches);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    const ref = rf?.current;
    if (ref) {
      if (toggled) {
        ref.classList.add("toggled-right");
      } else {
        ref.classList.remove("toggled-right");
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
          title="Game History"
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
