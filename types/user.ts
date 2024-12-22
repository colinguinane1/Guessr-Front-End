import { Difficulty } from "./difficulty";

export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  guessed_numbers: Difficulty[];
  current_number_data: Map<string, number>,
  xp: number;
  profile_views: number;
}
