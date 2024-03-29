import "./header.scss";
import ProfileDialog from "./ProfileDialog";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Jeiran - Rock Paper Scissors</h1>
        <div className="menu">
          <ProfileDialog />
        </div>
      </div>
    </header>
  );
};
export default Header;
