import "./game-info.scss";
import { Link } from "react-router-dom";
import gameStore from "../../../store/gameStore";
import GetGameState from "./GetGameState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import CreatorMenu from "../CreatorMenu";
import selfStore from "../../../store/selfStore";
import { useMemo } from "react";

const GameInfo = () => {
  const selfInfo = selfStore((state) => state.info!);
  const gameInfo = gameStore((state) => state.gameInfo)!;
  const currentGameId = gameStore((state) => state.currentGameId)!;

  const isCreator = useMemo(
    () => gameInfo.creator.id === selfInfo.id,
    [gameInfo.creator.id, selfInfo.id]
  );

  return (
    <>
      <div className="game-info">
        <h1>Game State: {<GetGameState state={gameInfo.state} />}</h1>
        <h4>
          Game Code: <span className="current-game-span">{currentGameId}</span>
        </h4>
        <div className="creator-menu">
          {isCreator ? (
            <CreatorMenu
              children={
                <Link
                  to="/play/leave"
                  className="play-btn leave-button"
                  title="Leave Game"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
                </Link>
              }
            />
          ) : (
            <Link
              to="/play/leave"
              className="play-btn leave-button"
              title="Leave Game"
            >
              <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
            </Link>
          )}
        </div>

        {/* <pre className="pre">
        {JSON.stringify(gameInfo.currentRound, null, 2)}
      </pre> */}
      </div>
    </>
  );
};
export default GameInfo;
