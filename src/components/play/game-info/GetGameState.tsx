import { memo } from "react";
import { GameState } from "../../../server-types";

const GetGameState = memo(({ state }: { state: GameState }) => {
  switch (state) {
    case GameState.LOBBY:
      return <span className="game-state lobby">Lobby</span>;
    case GameState.IN_PROGRESS:
      return <span className="game-state">In Progress</span>;
    case GameState.FINISHED:
      return <span className="game-state finished">Finished</span>;
    case GameState.STOPPED:
      return <span className="game-state stopped">Interrupted</span>;
    default:
      return "Unknown";
  }
});

export default GetGameState;
