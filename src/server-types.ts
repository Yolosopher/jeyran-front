import { Role } from "./global-types";

export interface IUser extends Document {
  _id?: string;
  id?: string;
  username: string;
  password: string;
  role: Role;

  deleted: boolean;
}
export type UserPopulatedType = {
  id: string;
  username: string;
};

export enum GameState {
  LOBBY = "lobby",
  IN_PROGRESS = "in-progress",
  FINISHED = "finished",
  STOPPED = "stopped",
}

export enum MoveType {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors",
}

type PlayerMoveType = {
  player: string | IUser;
  move: MoveType;
};
type RoundType = {
  winners: IUser[] | string[];
  playerMoves: PlayerMoveType[];
};

type PlayerMovePopulatedType = {
  player: UserPopulatedType;
  move: MoveType;
};
type RoundPopulatedType = {
  winners: UserPopulatedType[];
  playerMoves: PlayerMovePopulatedType[];
};

export interface IGame {
  _id?: string;
  id?: string;
  gameId: string;
  creator: string | IUser;
  state: GameState;
  players: {
    player: string | IUser;
    score: number;
  }[];
  currentRound: {
    player: string | IUser;
    move: MoveType | "none" | "hidden";
  }[];
  historyRounds: RoundType[];
  inGamePlayers: string[];
  revealed: boolean;
}

export interface IGamePopulated {
  _id?: string;
  id?: string;
  gameId: string;
  creator: UserPopulatedType;
  state: GameState;
  players: {
    player: UserPopulatedType;
    score: number;
  }[];
  currentRound: {
    player: UserPopulatedType;
    move: MoveType | "none" | "hidden";
  }[];
  historyRounds: RoundPopulatedType[];
  inGamePlayers: string[];
  revealed: boolean;
}
