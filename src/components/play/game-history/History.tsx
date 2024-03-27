import { Scrollbar } from "react-scrollbars-custom";
import gameStore from "../../../store/gameStore";
import Player from "../../shared/username/Username";
import Round from "./Round";

const History = () => {
  const historyRounds = gameStore((state) => state.gameInfo!.historyRounds!);
  return (
    <Scrollbar style={{ width: 320, height: "calc(100dvh - 102px - 60px)" }}>
      <div className="history-list">
        {historyRounds.map((round, index) => {
          return <Round key={index} round={round} />;
        })}
      </div>
    </Scrollbar>
  );
};
export default History;
