import "./style.scss";
import gameStore from "../../../store/gameStore";
import SingleInGamePlayer from "./SingleInGamePlayer";
import { Scrollbar } from "react-scrollbars-custom";

const InGamePlayers = () => {
  const players = gameStore((state) => state.gameInfo!.players);

  return (
    <Scrollbar
      style={{ width: "20rem", height: "calc(100dvh - 7.375rem - 5rem)" }}
    >
      <div className="gameplayers-list">
        {players.map((player) => (
          <SingleInGamePlayer
            key={player.player.id}
            id={player.player.id}
            username={player.player.username}
            score={player.score}
          />
        ))}
      </div>
    </Scrollbar>
  );
};
export default InGamePlayers;
