import { Link } from "react-router-dom";
import "./header.scss";
import useAuth from "../../../hooks/useAuth";

const Header = () => {
  const { handleLogout } = useAuth();

  const logout = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleLogout();
  };
  return (
    <header className="header">
      <h1 className="logo">Rock Paper Scissors</h1>
      <nav className="menu">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/play">
          Play
        </Link>
        <div className="link" onClick={logout}>
          Logout
        </div>
      </nav>
    </header>
  );
};
export default Header;
