import useEmitter from "../../hooks/useEmitter";

const CreateRoom = () => {
  const { emitter } = useEmitter();

  const handleClick = async () => {
    emitter({
      event: "game-create",
    });
  };
  return (
    <div>
      <button className="create-room-btn" type="button" onClick={handleClick}>
        Create new room
      </button>
    </div>
  );
};

export default CreateRoom;
