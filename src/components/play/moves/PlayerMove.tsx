import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { MoveType } from "../../../server-types";
import HandSign from "../../shared/handsign/HandSign";
import UserBox from "../../shared/avatar/UserBox";

type DataParams = {
  id: string;
  username: string;
  move: MoveType | "none" | "hidden";
  size?: SizeProp;
  smallTextSize?: boolean;
  winner?: boolean;
  loser?: boolean;
  active?: boolean;
  userBoxVertical?: boolean;
};

const PlayerMove = ({
  data: {
    id,
    move,
    username,
    size,
    smallTextSize,
    winner,
    loser,
    active,
    userBoxVertical,
  },
}: {
  data: DataParams;
}) => {
  return (
    <div className="round-player">
      <UserBox
        vertical={userBoxVertical}
        username={username}
        className={`round-username${winner ? " winner" : ""}${
          smallTextSize ? " small-text-size" : ""
        }`}
      />
      <div className="round-player-move">
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
