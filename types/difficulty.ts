import { User } from "./user";

export type Difficulty = {
  difficulty: string;
  _id: string;
  min: number;
  max: number;
  value: number;
  color: string;
  attempts: number;
  expires: Date;
  created: string;
  global_user_guesses: number;
  correct_user_guesses: number;
  correct_users: User;
  v: string;
};
