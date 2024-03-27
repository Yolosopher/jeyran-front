import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import InGamePlayers from "./InGamePlayers";

type GamePlayersProps = {
  rf: React.RefObject<HTMLDivElement>;
};
const GamePlayers = ({ rf }: GamePlayersProps) => {
  const matchmedia = useMemo(
    () => window.matchMedia("(min-width: 1200px)"),
    []
  );
  const [toggled, setToggled] = useState<boolean>(matchmedia.matches);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    const ref = rf?.current;
    if (ref) {
      if (toggled) {
        ref.classList.add("toggled-left");
      } else {
        ref.classList.remove("toggled-left");
      }
    }
  }, [toggled]);
  return (
    <div className="left">
      <div
        className={`gameplayers-box${hovered ? " hovered " : ""}${
          toggled ? " toggled" : ""
        }`}
      >
        <div
          className="toggler-btn"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setToggled((prevstate) => !prevstate)}
          title="Game Players"
        >
          <div className="shadow">
            <FontAwesomeIcon icon={faPeopleGroup} size="1x" />
          </div>
        </div>
        <div className="gameplayers">
          <InGamePlayers />
        </div>
      </div>
    </div>
  );
};
export default GamePlayers;
