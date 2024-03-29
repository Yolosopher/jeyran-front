import { useMemo } from "react";
import PlayerMove from "./PlayerMove";
import selfStore from "../../../store/selfStore";
import gameStore from "../../../store/gameStore";

const MovesOfOthers = () => {
  const { info } = selfStore();
  const { gameInfo } = gameStore();
  const movesOfOthers = useMemo(() => {
    return gameInfo!.currentRound!.filter(({ player }) => {
      return player.id !== info!.id;
    });
  }, [gameInfo!.currentRound, info!.id]);

  return (
    <div className="player-moves">
      {movesOfOthers.map(({ move, player }) => {
        return (
          <PlayerMove
            key={player.id}
            data={{
              id: player.id,
              move,
              username: player.username,
            }}
          />
        );
      })}
    </div>
  );
};
export default MovesOfOthers;
