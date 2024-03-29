import { AVATARS_ORIGIN } from "../constants";

export const getAvatarLink = (username: string) => {
  return `${AVATARS_ORIGIN}/${username}.jpg`;
};
