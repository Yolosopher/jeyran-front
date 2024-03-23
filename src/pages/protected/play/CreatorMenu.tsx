import useEmitter from "../../../hooks/useEmitter";

const CreatorMenu = () => {
  const { emitter } = useEmitter();

  const handleStartGame = () => {
    emitter({
      event: "game-start",
    });
  };

  const handleEndGame = () => {
    emitter({
      event: "game-end",
    });
  };
  return (
    <div className="creator-menu">
      <button
        type="button"
        onClick={handleStartGame}
        className="play-btn start-button"
      >
        Start Game
      </button>
      <button
        type="button"
        onClick={handleEndGame}
        className="play-btn end-button"
      >
        Finish Game
      </button>
    </div>
  );
};

export default CreatorMenu;
