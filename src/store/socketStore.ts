import { Socket, io } from "socket.io-client";
import { create } from "zustand";
import { API_ORIGIN } from "../constants";

export type SocketType = Socket;
export type SocketInfoType = {
  connected: boolean;
  socketId: string;
};
type StoreType = {
  socket: SocketType;
  info: SocketInfoType;
  setInfo: (info: SocketInfoType) => void;
};

const socketStore = create<StoreType>((set) => ({
  socket: io(API_ORIGIN, {
    autoConnect: false,
    rejectUnauthorized: false,
    reconnectionAttempts: 3,
  }),
  info: {
    connected: false,
    socketId: "",
  },
  setInfo: (info: SocketInfoType) => set({ info }),
}));

export default socketStore;
