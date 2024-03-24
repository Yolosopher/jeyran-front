/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import selfStore from "../store/selfStore";
import useListener from "./useListener";
import socketStore from "../store/socketStore";
import toast from "react-hot-toast";
import useAuth from "./useAuth";
import useEmitter from "./useEmitter";

const useInitSocket = () => {
  const { loggedIn, info } = selfStore();
  const { socket, setInfo } = socketStore();
  const { addListener, removeListener } = useListener();
  const { handleLogout, handleRefreshToken } = useAuth();
  const { emitter } = useEmitter();

  const socketLogin = () => {
    console.log("logging in");
    socket.auth = { accessToken: info!.accessToken };
    socket.connect();
  };
  const socketLogout = () => {
    console.log("logging out");
    socket.disconnect();
  };

  const handlePing = () => {
    emitter({
      event: "ping",
      data: "ping",
    });
  };

  const onConnect = () => {
    setInfo({
      connected: true,
      socketId: socket.id || "",
    });
  };

  const onDisconnect = () => {
    setInfo({
      connected: false,
      socketId: "",
    });
  };

  const onConnectError = async (error: any) => {
    console.error("connect_error", error);
  };

  // const onPong = (msg: string) => {
  //   console.log("pong received", msg);
  // };

  const onError = async (error: string) => {
    if (error === "Token is blacklisted") {
      handleLogout(false);
    } else if (error === "Not authorized") {
      handleLogout();
    } else if (error == "Invalid accessToken") {
      await handleRefreshToken();
      // await socketLogin();
    }
    toast(error ?? "Unknown error occurred", {
      icon: "❌",
      position: "bottom-right",
    });
  };

  useEffect(() => {
    // addListener("pong", onPong);
    addListener("err", onError);
    addListener("connect_error", onConnectError);
    addListener("connect", onConnect);
    addListener("disconnect", onDisconnect);
    return () => {
      // removeListener("pong", onPong);
      removeListener("connect_error", onConnectError);
      removeListener("err", onError);
      removeListener("connect", onConnect);
      removeListener("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    if (loggedIn) {
      socketLogin();
    } else {
      socketLogout();
    }
  }, [loggedIn]);

  return { handlePing };
};
export default useInitSocket;
