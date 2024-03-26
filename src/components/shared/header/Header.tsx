import { Link } from "react-router-dom";
import "./header.scss";
import useAuth from "../../../hooks/useAuth";
import selfStore from "../../../store/selfStore";

const Header = () => {
  const { handleLogout } = useAuth();
  // const accessToken = selfStore((state) => state.info!.accessToken);
  const username = selfStore((state) => state.info!.username);

  return (
    <header className="header">
      {/* <div className="accessToken">
        <p>{accessToken}</p>
      </div> */}
      <h1 className="logo">Rock Paper Scissors</h1>
      <nav className="menu">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/play">
          Play
        </Link>
        <div
          className="link"
          onClick={() => {
            handleLogout();
          }}
        >
          ({username})Logout
        </div>
      </nav>
    </header>
  );
};
export default Header;
