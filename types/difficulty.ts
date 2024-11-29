export type Difficulty = {
  _id: string;
  difficulty: string;
  max: number;
  value: number;
  color: string;
  attempts: number;
  expires: string; // ISO 8601 date string
  global_user_guesses: number;
  created: string;
  __v: number;
};