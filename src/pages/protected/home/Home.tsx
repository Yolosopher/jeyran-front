import { Navigate } from "react-router-dom";
import CreateRoom from "../../../components/home/CreateRoom";
import JoinGame from "../../../components/home/JoinGame";
import gameStore from "../../../store/gameStore";
import "./style.scss";

const Home = () => {
  const gameId = gameStore((state) => state.currentGameId);

  if (gameId) {
    return <Navigate to={`/play/${gameId}`} replace />;
  }
  return (
    <div className="main-container">
      <main className="home-main">
        <JoinGame />

        <CreateRoom />
      </main>
    </div>
  );
};
export default Home;
