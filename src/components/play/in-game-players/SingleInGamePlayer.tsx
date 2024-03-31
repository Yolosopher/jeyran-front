import { useMemo } from "react";
import gameStore from "../../../store/gameStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faWifi } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import UserBox from "../../shared/avatar/UserBox";
import Dialog from "../../shared/Dialog";
import usePunishPlayer from "../../../hooks/usePunishPlayer";

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
  const creatorId = gameStore((state) => state.gameInfo!.creator.id);
  const currentRound = gameStore((state) => state.gameInfo!.currentRound);
  const onlinePlayers = gameStore((state) => state.onlinePlayers);
  const inGamePlayers = gameStore((state) => state.gameInfo!.inGamePlayers);
  const blacklist = gameStore((state) => state.gameInfo!.blacklist);
  const { banPlayer, kickPlayer } = usePunishPlayer();

  // memorized values
  const isOnline = useMemo(() => {
    return onlinePlayers.includes(id);
  }, [id, onlinePlayers]);
  const { isInGame, isInCurrentRound, isCreator, isBanned } = useMemo(() => {
    return {
      isInGame: inGamePlayers.find((playerId) => playerId === id)
        ? true
        : false,
      isInCurrentRound: currentRound.find(({ player }) => player.id === id)
        ? true
        : false,
      isCreator: creatorId === id,
      isBanned: blacklist.find((player) => player.id === id) ? true : false,
    };
  }, [id, inGamePlayers]);

  const handleBanPlayer = () => {
    banPlayer(id);
  };
  const handleKickPlayer = () => {
    kickPlayer(id);
  };
  return (
    <div
      className={`player${
        isInCurrentRound ? " order-top-high" : isInGame ? " order-top" : ""
      }${isBanned ? " banned" : ""}`}
    >
      {isBanned && (
        <div className="badge banned" title="This user is banned">
          <FontAwesomeIcon icon={faBan} size="1x" />
        </div>
      )}
      <div className="player-user">
        <UserBox username={username} />
        {/* add kick/ban buttons */}
        {!isCreator && (
          <Dialog
            trigger={
              <button type="button" className="btn-punish kick">
                <FontAwesomeIcon icon={faBan} size="1x" />
              </button>
            }
            content={
              <div className="punish-content">
                <button
                  type="button"
                  className="punish-content-item"
                  title="Kick Player"
                  onClick={handleKickPlayer}
                >
                  <span>Kick</span>
                  {/* <FontAwesomeIcon icon={faBan} size="1x" /> */}
                </button>
                <button
                  type="button"
                  className="punish-content-item"
                  title="Ban Player"
                  onClick={handleBanPlayer}
                >
                  <span>Ban</span>
                  {/* <FontAwesomeIcon icon={faBan} size="1x" /> */}
                </button>
              </div>
            }
          />
        )}
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
            className={isInCurrentRound ? "playing-animation" : ""}
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
