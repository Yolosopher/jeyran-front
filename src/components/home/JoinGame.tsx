import toast from "react-hot-toast";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useEmitter from "../../hooks/useEmitter";

const JoinGame = () => {
  const [searchParams] = useSearchParams();
  const roomCodeFromLink = searchParams.get("room");
  const [roomCode, setRoomCode] = useState<string>(roomCodeFromLink ?? "");

  const { emitter } = useEmitter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      emitter({
        event: "game-join",
        data: roomCode,
      });

      setRoomCode("");
    } catch (error: any) {
      toast(error.message, { icon: "🔥" });
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter game code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button type="submit">Join game</button>
    </form>
  );
};
export default JoinGame;
