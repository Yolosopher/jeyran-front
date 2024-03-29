import { getAvatarLink } from "../../../lib/utils";

type UserAvatarProps = {
  username: string;
};

const UserAvatar = ({ username }: UserAvatarProps) => {
  const defaultAvatar = "default_avatar.jpg";
  const src = getAvatarLink(username);
  return (
    <div className="avatar" title={username}>
      <img
        src={src}
        alt={`${username}_image`}
        onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
          event.currentTarget.src = defaultAvatar;
        }}
      />
    </div>
  );
};
export default UserAvatar;
