import gameStore from "../../../store/gameStore";
import "./style.scss";

const CurrentGameId = () => {
  const { currentGameId } = gameStore();

  if (!currentGameId) return null;
  return <div className="current-game-id">{currentGameId}</div>;
};
export default CurrentGameId;
