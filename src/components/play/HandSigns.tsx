import useEmitter from "../../hooks/useEmitter";
import gameStore from "../../store/gameStore";
import { GameState, MoveType } from "../../server-types";
import { useMemo } from "react";
import selfStore from "../../store/selfStore";
import HandSign from "../shared/handsign/HandSign";

const HandSigns = () => {
  const { emitter } = useEmitter();

  const myId = selfStore((state) => state!.info!.id);

  const gameState = gameStore((state) => state!.gameInfo!.state);
  const currentRound = gameStore((state) => state!.gameInfo!.currentRound);

  const { alreadyPlayed, myMove, amIPlaying } = useMemo(() => {
    const myRoundInfo = currentRound!.find((round) => {
      return round.player.id === myId;
    });

    if (!myRoundInfo) {
      return {
        amIPlaying: false,
        myMove: "none",
        alreadyPlayed: false,
      };
    }

    return {
      amIPlaying: true,
      myMove: myRoundInfo.move,
      alreadyPlayed: myRoundInfo.move !== "none",
    };
  }, [currentRound, myId]);

  const handleAction = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const sign = e.currentTarget.title.toLowerCase();
    emitter({
      event: "game-move",
      data: sign,
    });
  };
  if (!amIPlaying) {
    return null;
  }
  return (
    <div className="hand-signs-container">
      {gameState !== GameState.IN_PROGRESS && (
        <div className="hand-signs-overlay">
          <div className="overlay-content">The game is stopped</div>
        </div>
      )}
      <h2 className="hand-signs-text">Choose your sign</h2>
      <div className="hand-signs">
        <HandSign
          disabled={alreadyPlayed}
          sign={MoveType.ROCK}
          handleAction={handleAction}
          active={myMove === MoveType.ROCK}
        />
        <HandSign
          disabled={alreadyPlayed}
          sign={MoveType.PAPER}
          handleAction={handleAction}
          active={myMove === MoveType.PAPER}
        />
        <HandSign
          disabled={alreadyPlayed}
          sign={MoveType.SCISSORS}
          handleAction={handleAction}
          active={myMove === MoveType.SCISSORS}
        />
      </div>
    </div>
  );
};
export default HandSigns;
