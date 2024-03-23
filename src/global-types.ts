export type Role = 0 | 1 | 2;

export interface UserInfoInterface {
  id: string;
  username: string;
  role: Role;
}

export interface SelfInfoInterface extends UserInfoInterface {
  accessToken: string;
}
