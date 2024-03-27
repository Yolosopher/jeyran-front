import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type UsernameProps = {
  id: string;
  username: string;
  isCreator?: boolean;
};

const Username = ({ id, isCreator, username }: UsernameProps) => {
  return (
    <div className="username">
      <div className="username-info">
        <div className="username-name">@{username}</div>
      </div>
      {isCreator !== undefined && (
        <div className="username-creator">
          <FontAwesomeIcon size="1x" icon={faUserTie} />
        </div>
      )}
    </div>
  );
};
export default Username;
