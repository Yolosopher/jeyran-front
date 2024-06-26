import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import useEmitter from "../../../hooks/useEmitter";
import gameStore from "../../../store/gameStore";
import { GameState } from "../../../server-types";
import Blacklist from "./Blacklist";

type CreatorMenuProps = {
  children?: React.ReactNode;
};

const CreatorMenu = ({ children }: CreatorMenuProps) => {
  const gameId = gameStore((state) => state.gameInfo!.gameId);
  const gameState = gameStore((state) => state.gameInfo!.state);

  const { emitter } = useEmitter();

  const handleStartGame = () => {
    emitter({
      event: "game-start",
    });
  };

  const handleEndGame = () => {
    emitter({
      event: "game-end",
      data: gameId,
    });
  };
  const handleStopGame = () => {
    emitter({
      event: "game-stop",
      data: gameId,
    });
  };
  const handleRestartGame = () => {
    emitter({
      event: "game-restart",
      data: gameId,
    });
  };
  return (
    <>
      {gameState === GameState.LOBBY && (
        <button
          type="button"
          onClick={handleStartGame}
          className="play-btn start-button"
        >
          <FontAwesomeIcon icon={faPlay} size="2x" />
        </button>
      )}
      <Blacklist />
      {[GameState.IN_PROGRESS, GameState.STOPPED].includes(gameState) && (
        <button
          type="button"
          onClick={handleRestartGame}
          className="play-btn start-button"
          title="Restart/Resume Game"
        >
          <FontAwesomeIcon
            icon={faPlay}
            size="2x"
            beat={gameState === GameState.STOPPED ? true : false}
          />
        </button>
      )}
      {children}
      {gameState === GameState.IN_PROGRESS && (
        <button
          type="button"
          onClick={handleStopGame}
          className="play-btn stop-button"
          title="Stop Game"
        >
          <FontAwesomeIcon icon={faPause} size="2x" />
        </button>
      )}
      {gameState !== GameState.FINISHED && (
        <button
          type="button"
          onClick={handleEndGame}
          className="play-btn end-button"
          title="Finish Game"
        >
          <FontAwesomeIcon icon={faPowerOff} size="2x" />
        </button>
      )}
    </>
  );
};

export default CreatorMenu;
