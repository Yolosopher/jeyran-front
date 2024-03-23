import socketStore from "../store/socketStore";

const useListener = () => {
  const { socket } = socketStore();

  const addListener = (event: string, callback: (...args: any[]) => void) => {
    socket.on(event, callback);
  };

  const removeListener = (
    event: string,
    callback: (...args: any[]) => void
  ) => {
    socket.off(event, callback);
  };

  return {
    addListener,
    removeListener,
  };
};
export default useListener;
