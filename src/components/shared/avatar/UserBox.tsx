import UserAvatar from "./UserAvatar";

type UserBoxProps = {
  username: string;
  className?: string;
  vertical?: boolean;
};

const UserBox = ({ username, className, vertical }: UserBoxProps) => {
  return (
    <div
      className={`userbox${vertical ? " vertical" : ""}${
        className ? " " + className : ""
      }`}
    >
      <UserAvatar username={username} />
      <span>{username}</span>
    </div>
  );
};
export default UserBox;
