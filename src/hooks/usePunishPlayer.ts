import useEmitter from "./useEmitter";

const usePunishPlayer = () => {
  const { emitter } = useEmitter();

  const kickPlayer = (playerId: string) => {
    emitter({
      event: "game-kick",
      data: playerId,
    });
  };

  const banPlayer = (playerId: string) => {
    emitter({
      event: "game-ban",
      data: playerId,
    });
  };

  const unbanPlayer = (playerId: string) => {
    emitter({
      event: "game-unban",
      data: playerId,
    });
  };

  return { banPlayer, kickPlayer, unbanPlayer };
};
export default usePunishPlayer;
