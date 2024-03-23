import "./play.scss";

import { Navigate } from "react-router-dom";
import gameStore from "../../../store/gameStore";
import useEmitter from "../../../hooks/useEmitter";
import { GameState } from "../../../server-types";
import selfStore from "../../../store/selfStore";
import HandSigns from "./HandSigns";
import MovesOfOthers from "./moves/MovesOfOthers";
import CreatorMenu from "./CreatorMenu";

const GetGameState = ({ state }: { state: GameState }) => {
  switch (state) {
    case GameState.LOBBY:
      return <span className="game-state lobby">Lobby</span>;
    case GameState.IN_PROGRESS:
      return <span className="game-state">In Progress</span>;
    case GameState.FINISHED:
      return <span className="game-state finished">Finished</span>;
    case GameState.PAUSED:
      return <span className="game-state paused">Paused</span>;
    default:
      return "Unknown";
  }
};

const Play = () => {
  const { info } = selfStore();
  const { gameInfo, currentGameId } = gameStore();
  const { emitter } = useEmitter();

  const handleLeaveGame = () => {
    emitter({
      event: "game-leave",
    });
  };

  if (!gameInfo) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <main className="play-main">
      {gameInfo.creator.id === info!.id && <CreatorMenu />}
      <h1>Game {<GetGameState state={gameInfo.state} />}</h1>
      <h4>
        Game Code: <span className="current-game-span">{currentGameId}</span>
      </h4>
      <button
        type="button"
        onClick={handleLeaveGame}
        className="play-btn leave-button"
      >
        Leave Game
      </button>

      {/* <pre className="pre">
        {JSON.stringify(gameInfo.currentRound, null, 2)}
      </pre> */}
      <MovesOfOthers />
      <HandSigns />
    </main>
  );
};
export default Play;
