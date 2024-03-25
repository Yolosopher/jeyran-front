import "./style.scss";
import gameStore from "../../../store/gameStore";
import SingleInGamePlayer from "./SingleInGamePlayer";

const InGamePlayers = () => {
  const players = gameStore((state) => state.gameInfo!.players);

  return (
    <div className="in-game-players">
      {players.map((player) => (
        <SingleInGamePlayer
          key={player.player.id}
          id={player.player.id}
          username={player.player.username}
        />
      ))}
    </div>
  );
};
export default InGamePlayers;
