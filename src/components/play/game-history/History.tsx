import { Scrollbar } from "react-scrollbars-custom";
import gameStore from "../../../store/gameStore";
import Round from "./Round";
import { useMemo } from "react";

const History = () => {
  const historyRounds = gameStore((state) => state.gameInfo!.historyRounds!);
  const reversedRounds = useMemo(
    () => historyRounds.reverse(),
    [historyRounds]
  );
  return (
    <Scrollbar style={{ width: 320, height: "calc(100dvh - 102px - 60px)" }}>
      <div className="history-list">
        {reversedRounds.map((round, index) => {
          return <Round key={index} round={round} />;
        })}
      </div>
    </Scrollbar>
  );
};
export default History;
