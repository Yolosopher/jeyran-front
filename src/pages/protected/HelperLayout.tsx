/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import useListener from "../../hooks/useListener";
import { useEffect } from "react";
import gameStore from "../../store/gameStore";
import { IGamePopulated } from "../../server-types";
import toast from "react-hot-toast";

const HelperLayout = () => {
  const {
    setGameInfo,
    clearGameInfo,
    currentGameId,
    setCurrentGameId,
    setOnlinePlayers,
    checked,
    markChecked,
  } = gameStore();

  const { addListener, removeListener } = useListener();

  const gameInfoHandler = (gameInfo: IGamePopulated) => {
    console.log("gameInfo", gameInfo);
    // toast("Game info received", {
    //   icon: "🎮",
    //   position: "top-right",
    // });
    setGameInfo(gameInfo);
  };

  const currentGameIdHandler = (gameId: string) => {
    console.log("gameId", gameId);
    setCurrentGameId(gameId);
    if (!checked) {
      markChecked();
    }
  };

  const onlinePlayersHandler = (players: string[] | null) => {
    console.log("onlinePlayers", players);
    setOnlinePlayers(players ?? []);
  };

  const handleGetBanned = (gameId: string) => {
    toast(`You are banned from this game ${gameId}`);
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
    addListener("get-banned", handleGetBanned);

    return () => {
      removeListener("game-online-players", onlinePlayersHandler);
      removeListener("current-game", currentGameIdHandler);
      removeListener("get-banned", handleGetBanned);
    };
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};
export default HelperLayout;
