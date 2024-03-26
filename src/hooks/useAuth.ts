import toast from "react-hot-toast";
import request from "../request";
import selfStore from "../store/selfStore";
import { useCallback, useEffect, useState } from "react";

const useAuth = () => {
  const { info, clearInfo, updateInfo } = selfStore();
  const [delayedEmitter, setDelayedEmitter] = useState<(() => void) | null>(
    null
  );

  const delayedEmitterCb = useCallback(() => {
    if (delayedEmitter) {
      delayedEmitter();
    }
  }, [info?.accessToken]);

  const setAccessToken = (accessToken: string) => {
    if (info) {
      updateInfo({ ...info, accessToken });
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const result = await request({
        path: "/auth/login",
        method: "POST",
        payload: { username, password },
      });
      if (result.success) {
        toast("Login successfull!", { icon: "🚀" });

        updateInfo(result.data);
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast(error.message, { icon: "🔥" });
    }
  };

  const handleLogout = async (server: boolean = true) => {
    try {
      if (server) {
        const result = await request({
          path: "/auth/logout",
          method: "POST",
        });
        if (!result.success) {
          throw new Error(result.error);
        }
      }

      clearInfo();
      toast("Logout successfull!", { icon: "🚀" });
    } catch (error: any) {
      toast(error.message, { icon: "🔥" });
    }
  };

  const handleRefreshToken = async (callback?: () => void) => {
    try {
      const result = await request({
        path: "/auth/check-access",
        method: "GET",
      });
      if (result.success) {
        if (result.data.accessToken !== info?.accessToken) {
          setAccessToken(result.data.accessToken);
        }
        if (callback) {
          setDelayedEmitter(callback);
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      handleLogout(false);
      // toast(error.message, { icon: "🔥" });
    }
  };

  useEffect(() => {
    delayedEmitterCb();
  }, [delayedEmitterCb]);

  return { handleLogout, handleLogin, handleRefreshToken };
};
export default useAuth;
