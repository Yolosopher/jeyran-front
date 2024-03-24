/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import useListener from "../../hooks/useListener";
import { useEffect } from "react";
import toast from "react-hot-toast";
import gameStore from "../../store/gameStore";
import { IGamePopulated } from "../../server-types";

const HelperLayout = () => {
  const {
    setGameInfo,
    clearGameInfo,
    currentGameId,
    setCurrentGameId,
    setOnlinePlayers,
  } = gameStore();

  const { addListener, removeListener } = useListener();

  const gameInfoHandler = (gameInfo: IGamePopulated) => {
    console.log("gameInfo", gameInfo);
    toast("Game info received", {
      icon: "🎮",
      position: "top-right",
    });
    setGameInfo(gameInfo);
  };

  const currentGameIdHandler = (gameId: string) => {
    console.log("gameId", gameId);
    toast("Game id received", {
      icon: "🎮",
      position: "top-right",
    });
    setCurrentGameId(gameId);
  };

  const onlinePlayersHandler = (players: string[]) => {
    console.log("onlinePlayers", players);
    setOnlinePlayers(players);
  };

  useEffect(() => {
    if (!currentGameId) {
      clearGameInfo();
    } else {
      //
    }
  }, [currentGameId]);
  useEffect(() => {
    addListener("game-online-players", onlinePlayersHandler);
    addListener("current-game", currentGameIdHandler);
    addListener("game-info", gameInfoHandler);

    return () => {
      removeListener("game-online-players", onlinePlayersHandler);
      removeListener("current-game", currentGameIdHandler);
      removeListener("game-info", gameInfoHandler);
    };
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};
export default HelperLayout;
