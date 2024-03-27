import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { MoveType } from "../../../server-types";
import HandSign from "../../shared/handsign/HandSign";

type DataParams = {
  id: string;
  username: string;
  move: MoveType | "none" | "hidden";
  size?: SizeProp;
  winner?: boolean;
  loser?: boolean;
  active?: boolean;
};

const PlayerMove = ({
  data: { id, move, username, size, winner, loser, active },
}: {
  data: DataParams;
}) => {
  return (
    <div className="player">
      <div className={`player-name${winner ? " winner" : ""}`}>@{username}</div>
      <div className="player-move">
        <HandSign
          sign={move}
          size={size}
          active={active}
          winner={winner}
          loser={loser}
        />
      </div>
    </div>
  );
};
export default PlayerMove;
