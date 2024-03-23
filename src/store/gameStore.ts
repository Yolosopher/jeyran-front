import { create } from "zustand";
import { IGamePopulated } from "../server-types";

type StoreType = {
  currentGameId: string | null;
  setCurrentGameId: (currentGame: string) => void;
  checked: boolean;
  markChecked: () => void;
  gameInfo: IGamePopulated | null;
  setGameInfo: (gameInfo: IGamePopulated) => void;
  clearGameInfo: () => void;
};

const defValue = () => {
  // const gameInfoStr = localStorage.getItem("gameInfo");
  // if (gameInfoStr) {
  //   return JSON.parse(gameInfoStr);
  // }
  return null;
};

const gameStore = create<StoreType>((set) => ({
  currentGameId: null,
  setCurrentGameId: (currentGameId: string) => set({ currentGameId }),
  checked: false,
  markChecked: () => set({ checked: true }),
  gameInfo: defValue(),
  setGameInfo: (gameInfo: IGamePopulated) => {
    // localStorage.setItem("gameInfo", JSON.stringify(gameInfo));
    set({ gameInfo });
  },
  clearGameInfo: () => {
    // localStorage.removeItem("gameInfo");
    set({ gameInfo: null });
  },
}));

export default gameStore;
