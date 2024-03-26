import "./game-info.scss";
import { Link } from "react-router-dom";
import gameStore from "../../../store/gameStore";
import GetGameState from "./GetGameState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const GameInfo = () => {
  const gameInfo = gameStore((state) => state.gameInfo)!;
  const currentGameId = gameStore((state) => state.currentGameId)!;

  return (
    <div className="game-info">
      <h1>Game State: {<GetGameState state={gameInfo.state} />}</h1>
      <h4>
        Game Code: <span className="current-game-span">{currentGameId}</span>
      </h4>
      <Link to="/play/leave" className="play-btn leave-button">
        <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
      </Link>

      {/* <pre className="pre">
        {JSON.stringify(gameInfo.currentRound, null, 2)}
      </pre> */}
    </div>
  );
};
export default GameInfo;
