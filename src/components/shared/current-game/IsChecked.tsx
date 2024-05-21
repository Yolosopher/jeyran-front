import gameStore from "../../../store/gameStore";
import "./style.scss";

const IsChecked = () => {
  const { checked } = gameStore();

  return (
    <div className="current-game-id">checked: {checked ? "true" : "false"}</div>
  );
};
export default IsChecked;
