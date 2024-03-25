import { useMemo } from "react";
import gameStore from "../../../store/gameStore";

type SingleInGamePlayerProps = {
  id: string;
  username: string;
};

const SingleInGamePlayer = ({ id, username }: SingleInGamePlayerProps) => {
  const onlinePlayers = gameStore((state) => state.onlinePlayers);
  const inGamePlayers = gameStore((state) => state.gameInfo!.inGamePlayers);

  // memorized values
  const isOnline = useMemo(() => {
    return onlinePlayers.includes(id);
  }, [id, onlinePlayers]);
  const isInGame = useMemo(() => {
    return inGamePlayers.find((playerId) => playerId === id) ? true : false;
  }, [id, inGamePlayers]);

  return (
    <div className="item">
      <div className="player-name">{username}</div>
      {/* is online */}
      <div
        className={`player-status online-status${isOnline ? " active" : ""}`}
      >
        {isOnline ? "Online" : "Offline"}
      </div>
      {/* is in this game */}
      <div
        className={`player-status ingame-status${isOnline ? " active" : ""}`}
      >
        {isInGame ? "In Game" : "Not In Game"}
      </div>
    </div>
  );
};
export default SingleInGamePlayer;
