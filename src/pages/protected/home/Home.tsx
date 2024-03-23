import { Navigate } from "react-router-dom";
import CreateRoom from "../../../components/home/CreateRoom";
import JoinGame from "../../../components/home/JoinGame";
import gameStore from "../../../store/gameStore";
import "./home.scss";

const Home = () => {
  const { gameInfo } = gameStore();

  if (gameInfo) {
    return <Navigate to={"/play"} replace />;
  }
  return (
    <main className="home-main">
      <JoinGame />

      <CreateRoom />
    </main>
  );
};
export default Home;
