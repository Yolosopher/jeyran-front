import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useEmitter from "../../../hooks/useEmitter";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import gameStore from "../../../store/gameStore";

const CreatorMenu = () => {
  const { gameInfo } = gameStore();
  const { emitter } = useEmitter();

  const handleStartGame = () => {
    emitter({
      event: "game-start",
    });
  };

  const handleEndGame = () => {
    emitter({
      event: "game-end",
      data: gameInfo?.gameId,
    });
  };
  const handleStopGame = () => {
    emitter({
      event: "game-stop",
      data: gameInfo?.gameId,
    });
  };
  return (
    <div className="creator-menu">
      <button
        type="button"
        onClick={handleStartGame}
        className="play-btn start-button"
      >
        Start Game
      </button>
      <button
        type="button"
        onClick={handleStopGame}
        className="play-btn stop-button"
        title="Stop Game"
      >
        <FontAwesomeIcon icon={faPause} size="2x" />
      </button>
      <button
        type="button"
        onClick={handleEndGame}
        className="play-btn end-button"
      >
        Finish Game
      </button>
    </div>
  );
};

export default CreatorMenu;
