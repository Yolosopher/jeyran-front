import "./style.scss";

import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import gameStore from "../../../store/gameStore";
import useEmitter from "../../../hooks/useEmitter";
import { GameState } from "../../../server-types";
import selfStore from "../../../store/selfStore";
import CreatorMenu from "../../../components/play/CreatorMenu";
import MovesOfOthers from "../../../components/play/moves/MovesOfOthers";
import HandSigns from "../../../components/play/HandSigns";
import { useEffect } from "react";
import GameInfo from "../../../components/play/game-info/GameInfo";
import Head from "./Head";

const Play = () => {
  const navigate = useNavigate();
  const { gameInfo, currentGameId, checked } = gameStore();
  const { id } = useParams();
  const { info } = selfStore();
  const { emitter } = useEmitter();

  useEffect(() => {
    if (!currentGameId) {
      console.log("running game-join");
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
      <div className="main-container">
        <main className="play-main">
          <GameInfo />
          {gameInfo.creator.id === info!.id && <CreatorMenu />}
          <MovesOfOthers />
          <HandSigns />
        </main>
      </div>
    </>
  );
};
export default Play;
