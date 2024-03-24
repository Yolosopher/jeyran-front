import { useCallback, useEffect, useState } from "react";
import useAuth from "./useAuth";
import selfStore from "../store/selfStore";
import toast from "react-hot-toast";
import socketStore from "../store/socketStore";
import gameStore from "../store/gameStore";

type EmitParams = {
  event: string;
  data?: any;
  noAuth?: boolean;
};

type Response = {
  success: boolean;
  tokenRefreshRequired?: boolean;
  message?: string;
};

type EmitPayload = {
  data: any;
  accessToken: string | null;
};

const useEmitter = () => {
  const { socket } = socketStore();
  const { info } = selfStore();
  const { handleRefreshToken, handleLogout } = useAuth();
  const { setCurrentGameId } = gameStore();
  const [retryQue, setRetryQue] = useState<EmitParams[]>([]);

  const handler = useCallback(
    async (params: EmitParams) => {
      const { event, data, noAuth } = params;

      try {
        const needAuth = !noAuth;
        const payload: EmitPayload = {
          data,
          accessToken: null,
        };
        if (needAuth) {
          if (!info?.accessToken) {
            throw new Error("No access token found");
          }
          payload.accessToken = info.accessToken;
        }
        const cb = async (response: Response) => {
          console.log("response", response);
          if (!response.success) {
            if (response.tokenRefreshRequired) {
              handleRefreshToken();
              setRetryQue((prev) => [...prev, params]);
            } else if (response.message === "Not authorized") {
              toast(response.message ?? "Unknown error occurred");
              handleLogout(false);
            } else if (response.message === "Your Current Game not found") {
              setCurrentGameId(null);
            } else {
              toast(response.message ?? "Unknown error occurred");
            }
          }
        };

        socket.emit(event, payload, cb);
      } catch (error: any) {
        toast(error.message, { icon: "🔥" });
      }
    },
    [handleLogout, handleRefreshToken, info?.accessToken, socket]
  );
  const emitter = (params: EmitParams) => {
    handler(params);
  };

  useEffect(() => {
    if (retryQue.length > 0 && info?.accessToken) {
      retryQue.forEach((emitParams) => {
        handler(emitParams);
      });
      setRetryQue([]);
    }
    return () => {
      setRetryQue([]);
    };
  }, [info?.accessToken]);

  return { emitter };
};
export default useEmitter;
