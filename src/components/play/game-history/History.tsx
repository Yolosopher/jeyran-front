import gameStore from "../../../store/gameStore";

const History = () => {
  const historyRounds = gameStore((state) => state.gameInfo!.historyRounds!);
  return (
    <div className="history-list">
      {historyRounds.map((round, index) => {
        return (
          <div key={index} className="round">
            {round.winners.map((winner, index) => {
              return (
                <div key={index} className="winner">
                  {winner.username}
                </div>
              );
            })}
            <div className="moves">
              {round.playerMoves.map((playerMove, index) => {
                return (
                  <div key={index} className="move">
                    {playerMove.player.username} played {playerMove.move}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {historyRounds.map((round, index) => {
        return (
          <div key={index} className="round">
            {round.winners.map((winner, index) => {
              return (
                <div key={index} className="winner">
                  {winner.username}
                </div>
              );
            })}
            <div className="moves">
              {round.playerMoves.map((playerMove, index) => {
                return (
                  <div key={index} className="move">
                    {playerMove.player.username} played {playerMove.move}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {historyRounds.map((round, index) => {
        return (
          <div key={index} className="round">
            {round.winners.map((winner, index) => {
              return (
                <div key={index} className="winner">
                  {winner.username}
                </div>
              );
            })}
            <div className="moves">
              {round.playerMoves.map((playerMove, index) => {
                return (
                  <div key={index} className="move">
                    {playerMove.player.username} played {playerMove.move}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default History;
