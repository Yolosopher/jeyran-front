import HandSigns from "../HandSigns";
import MovesOfOthers from "../moves/MovesOfOthers";
import CurrentRoundResult from "./CurrentRoundResult";

const GameBox = () => {
  return (
    <>
      <CurrentRoundResult />
      <MovesOfOthers />
      <HandSigns />
    </>
  );
};
export default GameBox;
