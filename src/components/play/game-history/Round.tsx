import { Scrollbar } from "react-scrollbars-custom";
import { RoundPopulatedType } from "../../../server-types";
import PlayerMove from "../moves/PlayerMove";
import { useMemo } from "react";

type RoundProps = {
  round: RoundPopulatedType;
};
const Round = ({ round }: RoundProps) => {
  const { winners, isTie } = useMemo(() => {
    return {
      winners: round.winners.map((winner) => winner.id),
      isTie: round.winners.length === 0,
    };
  }, round.winners);
  return (
    <Scrollbar
      style={{
        width: 260,
        height: 116,
      }}
    >
      <div className="round">
        {round.playerMoves.map(({ move, player }, index) => {
          const isWinner = winners.includes(player.id);
          const data: any = {
            id: player.id,
            move,
            username: player.username,
            size: "2x",
          };
          if (isTie) {
            data.active = true;
          } else {
            if (isWinner) {
              data.winner = true;
            } else {
              data.loser = true;
            }
          }
          return (
            <div key={index} className="round-move">
              <PlayerMove data={data} />
            </div>
          );
        })}
        <div className="round-gap"></div>
      </div>
    </Scrollbar>
  );
};
export default Round;
