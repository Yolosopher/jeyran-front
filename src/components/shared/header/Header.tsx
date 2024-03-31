import IsChecked from "../current-game/IsChecked";
import "./header.scss";
import ProfileDialog from "./ProfileDialog";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Jeiran - Rock Paper Scissors</h1>
        <div className="menu">
          <IsChecked />
          <ProfileDialog />
        </div>
      </div>
    </header>
  );
};
export default Header;
