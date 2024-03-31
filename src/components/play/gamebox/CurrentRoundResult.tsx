import { useEffect, useMemo, useState } from "react";
import gameStore from "../../../store/gameStore";
import useListener from "../../../hooks/useListener";
import { IHistoryRoundPayload, MoveType } from "../../../server-types";
import selfStore from "../../../store/selfStore";
import HandSign from "../../shared/handsign/HandSign";

const isMe = (username: string) => username.toLowerCase() === "you";

const WinnersLosersText = ({
  winners,
  losers,
  winnerSign,
  loserSign,
}: {
  winners: string[];
  losers: string[];
  winnerSign: MoveType;
  loserSign: MoveType;
}) => {
  const multipleWinners = winners.length > 1;
  const multipleLosers = losers.length > 1;

  return (
    <>
      <div className="winners">
        <h3 className="no-tie-heading">
          {multipleWinners ? "Winners" : "Winner"}
        </h3>
        {multipleWinners ? (
          <>
            <div className="list">
              {winners.map((winner, index) => {
                return (
                  <span key={index}>
                    <span className="user winner">
                      {isMe(winner) ? "You" : "@" + winner}
                    </span>
                    {winners.length === 2 ? (
                      index === 0 ? (
                        " and "
                      ) : (
                        ""
                      )
                    ) : (
                      <>
                        {index < winners.length - 2 ? ", " : ""}{" "}
                        {index === winners.length - 2 && " and "}
                      </>
                    )}
                  </span>
                );
              })}
            </div>
          </>
        ) : isMe(winners[0]) ? (
          <span className="user winner">You</span>
        ) : (
          <>
            <span className="user winner">@{winners[0]}</span>
          </>
        )}
        <div className="inner-flex">
          <HandSign sign={winnerSign} />
        </div>
      </div>
      <div className="hr"></div>
      <div className="losers">
        <h3 className="no-tie-heading">
          {multipleWinners ? "Losers" : "Loser"}
        </h3>
        {multipleLosers ? (
          <>
            <div className="list">
              {losers.map((loser, index) => {
                return (
                  <span key={index}>
                    <span className="user loser">
                      {isMe(loser) ? "You" : "@" + loser}
                    </span>
                    {losers.length === 2 ? (
                      index === 0 ? (
                        " and "
                      ) : (
                        ""
                      )
                    ) : (
                      <>
                        {index < losers.length - 2 ? ", " : ""}{" "}
                        {index === losers.length - 2 && " and "}
                      </>
                    )}
                  </span>
                );
              })}{" "}
            </div>
          </>
        ) : isMe(losers[0]) ? (
          <span className="user loser">You</span>
        ) : (
          <>
            <span className="user loser">@{losers[0]}</span>
          </>
        )}
        <div className="inner-flex">
          <HandSign sign={loserSign} />
        </div>
      </div>
    </>
  );
};

const CurrentRoundResult = () => {
  const myId = selfStore((state) => state!.info!.id!);
  const currentRound = gameStore((state) => state!.gameInfo!.currentRound!);

  const { addListener, removeListener } = useListener();

  const [roundInfo, setRoundInfo] = useState<IHistoryRoundPayload | null>(null);

  const roundInfoHandler = (roundInfo: IHistoryRoundPayload | null) => {
    console.log("roundInfo", roundInfo);
    setRoundInfo(roundInfo);
  };

  const roundResult = useMemo(() => {
    // return {
    //   isTie: false,
    //   winners: ["Nika", "Temurie", "123123"],
    //   losers: [
    //     "Temurie",
    //     "123123",
    //     "222222",
    //     "Temurie",
    //     "123123",
    //     "222222",
    //     "333333",
    //     "Temurie",
    //     "123123",
    //     "222222",
    //     "Temurie",
    //     "123123",
    //     "222222",
    //     "333333",
    //   ],
    //   winnerSign: "rock",
    //   loserSign: "scissors",
    // };
    if (!roundInfo) return null;

    const { winners } = roundInfo!;

    const isTie = winners.length === 0;

    const returnObj: any = {
      isTie,
      winners: [],
      losers: [],
    };
    if (isTie) {
      return returnObj;
    } else {
      let winnerSign = "";
      let loserSign = "";
      let winnerPlayers: string[] = [];
      let loserPlayers: string[] = [];
      for (const { player, move } of currentRound) {
        const username = myId === player.id ? "You" : player.username;

        if (winners.includes(player.id)) {
          winnerPlayers.push(username);
          if (!winnerSign) {
            winnerSign = move;
          }
        } else {
          loserPlayers.push(username);
          if (!loserSign) {
            loserSign = move;
          }
        }
      }

      const multipleWinners = winnerPlayers.length > 1;
      const multipleLosers = loserPlayers.length > 1;

      if (multipleWinners && winnerPlayers.includes("You")) {
        const withoutSelf = winnerPlayers.filter((player) => player !== "You");
        withoutSelf.push("You");
        winnerPlayers = withoutSelf;
      } else if (multipleLosers && loserPlayers.includes("You")) {
        const withoutSelf = loserPlayers.filter((player) => player !== "You");
        withoutSelf.push("You");
        loserPlayers = withoutSelf;
      }

      returnObj.winners = winnerPlayers;
      returnObj.losers = loserPlayers;
      returnObj.winnerSign = winnerSign;
      returnObj.loserSign = loserSign;
      return returnObj;
    }
  }, [roundInfo, currentRound, myId]);

  // when round is hidden or none, reset round info
  useEffect(() => {
    if (currentRound.some(({ move }) => ["none", "hidden"].includes(move))) {
      setRoundInfo(null);
    }
  }, [currentRound]);

  useEffect(() => {
    addListener("round-info", roundInfoHandler);

    return () => {
      removeListener("round-info", roundInfoHandler);
    };
  }, []);

  if (!roundResult) {
    return null;
  }
  return (
    <div className="current-round-result">
      {roundResult.isTie ? (
        <h6 className="text">
          <span>It's a tie!</span>
        </h6>
      ) : (
        <h6 className="text no-tie">
          <WinnersLosersText
            losers={roundResult.losers}
            winners={roundResult.winners}
            winnerSign={roundResult.winnerSign}
            loserSign={roundResult.loserSign}
          />
        </h6>
      )}
    </div>
  );
};

export default CurrentRoundResult;
