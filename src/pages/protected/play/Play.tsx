import "./style.scss";

import { useNavigate, useParams } from "react-router-dom";
import gameStore from "../../../store/gameStore";
import useEmitter from "../../../hooks/useEmitter";
import { useEffect, useRef } from "react";
import GameInfo from "../../../components/play/game-info/GameInfo";
import Head from "./Head";
import GameHistory from "../../../components/play/game-history/GameHistory";
import GamePlayers from "../../../components/play/in-game-players/GamePlayers";
import GameBox from "../../../components/play/gamebox/GameBox";

const Play = () => {
  const gameContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { gameInfo, currentGameId, checked } = gameStore();
  const { id } = useParams();
  const { emitter } = useEmitter();

  useEffect(() => {
    if (!currentGameId) {
      if (checked) {
        emitter({
          event: "game-join",
          data: id,
        });
      }
    } else if (currentGameId && currentGameId !== id) {
      navigate(`/play/${currentGameId}`);
    }
  }, [checked]);

  if (!gameInfo) {
    return null;
  }
  return (
    <>
      <Head roomCode={currentGameId!} />
      <div
        className="main-container"
        style={{
          padding: "1.25rem 0",
        }}
      >
        <main className="play-main">
          <div ref={gameContentRef} className="game-content">
            <GamePlayers rf={gameContentRef} />
            <div className="mid">
              <GameInfo />
              <GameBox />
            </div>
            <GameHistory rf={gameContentRef} />
          </div>
        </main>
      </div>
    </>
  );
};
export default Play;
