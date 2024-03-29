import { useEffect } from "react";
import useEmitter from "../../../hooks/useEmitter";
import { useNavigate } from "react-router-dom";
import gameStore from "../../../store/gameStore";

const LeaveGame = () => {
  const navigate = useNavigate();
  const { emitter } = useEmitter();

  const currentGameId = gameStore((state) => state.currentGameId);
  useEffect(() => {
    if (!currentGameId) {
      navigate("/");
    } else {
      emitter({
        event: "game-leave",
      });
    }
  }, [currentGameId]);

  return null;
};
export default LeaveGame;
