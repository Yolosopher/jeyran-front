import { useMemo } from "react";
import gameStore from "../../../store/gameStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import UserBox from "../../shared/avatar/UserBox";

type SingleInGamePlayerProps = {
  id: string;
  username: string;
  score: number;
};

const SingleInGamePlayer = ({
  id,
  username,
  score,
}: SingleInGamePlayerProps) => {
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
    <div className="player">
      <div className="player-user">
        {/* <div className="player-name">@{username}</div> */}
        <UserBox username={username} />
      </div>
      <div className="hr"></div>
      <div className="player-bottom">
        {/* is in this game */}
        {isInGame && (
          <div
            className={`player-status online-status${
              isOnline ? " active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faWifi} size="1x" />
          </div>
        )}
        {/* is online */}
        <div
          className={`player-status ingame-status${isOnline ? " active" : ""}`}
        >
          <div
            className={isInGame ? "playing-animation" : ""}
            title={isInGame ? "In Game" : "Not In Game"}
          >
            <FontAwesomeIcon icon={faDiscord} size="1x" />
          </div>
        </div>
        <div className="player-score">Score: {score}</div>
      </div>
    </div>
  );
};
export default SingleInGamePlayer;
