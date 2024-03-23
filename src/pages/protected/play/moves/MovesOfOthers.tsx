import { useMemo } from "react";
import gameStore from "../../../../store/gameStore";
import { MoveType } from "../../../../server-types";
import selfStore from "../../../../store/selfStore";
import PlayerMove from "./PlayerMove";

const MovesOfOthers = () => {
  const { info } = selfStore();
  const { gameInfo } = gameStore();
  const movesOfOthers = useMemo(() => {
    return gameInfo!.currentRound!.filter(({ move, player }) => {
      return player.id !== info!.id;
    });
  }, [gameInfo!.currentRound, info!.id]);

  return (
    <div className="player-moves">
      {movesOfOthers.map(({ move, player }) => {
        return (
          <div key={player.id} className="player-move">
            <div className="player-name">{player.username}</div>
            <PlayerMove sign={move} />
          </div>
        );
      })}
    </div>
  );
};
export default MovesOfOthers;
