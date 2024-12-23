import { Difficulty } from "./difficulty";

interface IModeData {
  attempts: number;
  win: boolean;
  guesses: number[];
}

export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  guessed_numbers: Difficulty[];
  current_number_data: Map<string, IModeData>,
  xp: number;
  profile_views: number;
}
