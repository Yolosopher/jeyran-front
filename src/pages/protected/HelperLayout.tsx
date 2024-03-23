/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import useListener from "../../hooks/useListener";
import { useEffect } from "react";
import selfStore from "../../store/selfStore";
import toast from "react-hot-toast";
import gameStore from "../../store/gameStore";
import useEmitter from "../../hooks/useEmitter";
import CurrentGameId from "../../components/shared/current-game/CurrentGameId";
import { IGamePopulated } from "../../server-types";

const HelperLayout = () => {
  const { setGameInfo, clearGameInfo, currentGameId, setCurrentGameId } =
    gameStore();
  const selfStoreObj = selfStore();
  const selfInfo = selfStoreObj.info!;
  const { addListener, removeListener } = useListener();

  const userJoinHandler = ({
    username,
  }: {
    roomId: string;
    username: string;
  }) => {
    // check if the user is me
    if (username === selfInfo!.username) {
      toast("You joined/created the room", {
        icon: "👋",
        position: "bottom-right",
      });
    } else {
      toast(`${username} joined the room`, {
        icon: "👋",
        position: "bottom-right",
      });
    }
  };
  const userLeaveHandler = ({
    username,
  }: {
    roomId: string;
    username: string;
  }) => {
    // check if the user is me
    if (username === selfInfo!.username) {
      toast("You have left the gameroom", {
        icon: "👋",
        position: "bottom-right",
      });
    } else {
      toast(`${username} just left the gameroom`, {
        icon: "👋",
        position: "bottom-right",
      });
    }
    // navigate("/play");
  };

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

  const checkSuccess = () => {
    toast.success("Game checked successfully", {
      icon: "👍",
      position: "bottom-right",
    });
  };

  useEffect(() => {
    if (!currentGameId) {
      clearGameInfo();
    }
  }, [currentGameId]);

  useEffect(() => {
    addListener("current-game", currentGameIdHandler);
    addListener("check-success", checkSuccess);
    addListener("user-joined", userJoinHandler);
    addListener("user-left", userLeaveHandler);
    addListener("game-info", gameInfoHandler);

    return () => {
      removeListener("current-game", currentGameIdHandler);
      removeListener("check-success", checkSuccess);
      removeListener("user-joined", userJoinHandler);
      removeListener("user-left", userLeaveHandler);
      removeListener("game-info", gameInfoHandler);
      clearGameInfo();
    };
  }, []);
  return (
    <>
      <CurrentGameId />
      <Outlet />
    </>
  );
};
export default HelperLayout;
