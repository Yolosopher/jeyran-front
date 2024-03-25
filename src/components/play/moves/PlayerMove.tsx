import { MoveType } from "../../../server-types";
import HandSign from "../../shared/handsign/HandSign";

type DataParams = {
  id: string;
  username: string;
  move: MoveType | "none" | "hidden";
};

const PlayerMove = ({ data: { id, move, username } }: { data: DataParams }) => {
  return (
    <div className="player">
      <div className="player-name">{username}</div>
      <div className="player-move">
        <HandSign sign={move} />
      </div>
    </div>
  );
};
export default PlayerMove;
