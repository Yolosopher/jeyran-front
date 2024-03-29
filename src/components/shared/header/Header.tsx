import "./header.scss";
import ProfileDialog from "./ProfileDialog";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Rock Paper Scissors</h1>
        <nav className="menu">
          <ProfileDialog />
        </nav>
      </div>
    </header>
  );
};
export default Header;
