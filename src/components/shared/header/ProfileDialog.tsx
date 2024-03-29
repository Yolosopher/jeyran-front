import UserAvatar from "../avatar/UserAvatar";
import selfStore from "../../../store/selfStore";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Dialog from "../Dialog";

const ProfileDialog = () => {
  const username = selfStore((state) => state.info!.username);
  const { handleLogout } = useAuth();

  return (
    <Dialog
      trigger={
        <div className="profile-box">
          <UserAvatar username={username} />
          <span>{username}</span>
        </div>
      }
      content={
        <nav className="profile-nav">
          {/* <div className="profile-nav-item">
            <Link to="/profile" className="nav-link">
              <span>Profile</span>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div> */}
          <div className="profile-nav-item">
            <div
              className="nav-link logout"
              onClick={() => {
                handleLogout();
              }}
              title="Logout"
            >
              <span>Logout</span>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
          </div>
        </nav>
      }
      contentFit
    />
  );
};
export default ProfileDialog;
