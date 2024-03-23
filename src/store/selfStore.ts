import { create } from "zustand";
import { SelfInfoInterface } from "../global-types";

const getDefaultSelfInfo = (): SelfInfoInterface | null => {
  try {
    const lsSelfInfo = localStorage.getItem("selfInfo");
    if (!lsSelfInfo) {
      throw new Error("No self info found in local storage");
    }

    return JSON.parse(lsSelfInfo);
  } catch (error) {
    return null;
  }
};
const defaultSelfInfo: SelfInfoInterface | null = getDefaultSelfInfo();

type StoreType = {
  loggedIn: boolean;
  info: SelfInfoInterface | null;
  updateInfo: (auth: SelfInfoInterface) => void;
  clearInfo: () => void;
};

const selfStore = create<StoreType>((set) => ({
  loggedIn: !!defaultSelfInfo,
  info: defaultSelfInfo,
  updateInfo: (info: SelfInfoInterface) => {
    localStorage.setItem("selfInfo", JSON.stringify(info));
    set((state) => {
      const result: any = { info };
      if (info && !state.loggedIn) {
        result.loggedIn = true;
      }
      return result;
    });
  },
  clearInfo: () => {
    try {
      localStorage.removeItem("selfInfo");
      set((state) => {
        const result: any = { info: null };
        if (state.loggedIn) {
          result.loggedIn = false;
        }
        return result;
      });
    } catch (error: any) {
      console.error(error);
    }
  },
}));

export default selfStore;
