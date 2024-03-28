import { useEffect, useMemo, useState } from "react";
import gameStore from "../../../store/gameStore";
import useListener from "../../../hooks/useListener";
import { IHistoryRoundPayload } from "../../../server-types";
import selfStore from "../../../store/selfStore";

const isMe = (username: string) => username.toLowerCase() === "you";

const WinnersLosersText = ({
  winners,
  losers,
}: {
  winners: string[];
  losers: string[];
}) => {
  console.log("winners", winners);
  console.log("losers", losers);
  const multipleWinners = winners.length > 1;
  const multipleLosers = losers.length > 1;

  return (
    <>
      <div className="winners">
        {multipleWinners ? (
          <>
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
            })}{" "}
            won
          </>
        ) : isMe(winners[0]) ? (
          <span className="user winner">You won</span>
        ) : (
          <>
            <span className="user winner">@{winners[0]}</span> won
          </>
        )}
      </div>
      <div className="hr"></div>
      <div className="losers">
        {multipleLosers ? (
          <>
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
            lost
          </>
        ) : isMe(losers[0]) ? (
          <span className="user loser">You lost</span>
        ) : (
          <>
            <span className="user loser">@{losers[0]}</span> lost
          </>
        )}
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
      let winnerPlayers: string[] = [];
      let loserPlayers: string[] = [];
      for (const { player } of currentRound) {
        const username = myId === player.id ? "You" : player.username;

        if (winners.includes(player.id)) {
          winnerPlayers.push(username);
        } else {
          loserPlayers.push(username);
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
          />
        </h6>
      )}
    </div>
  );
};

export default CurrentRoundResult;
