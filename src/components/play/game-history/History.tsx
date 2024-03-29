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
    <Scrollbar
      style={{ width: "20rem", height: "calc(100dvh - 7.375rem - 5rem)" }}
    >
      <div className="history-list">
        {reversedRounds.map((round, index) => {
          return <Round key={index} round={round} />;
        })}
      </div>
    </Scrollbar>
  );
};
export default History;
