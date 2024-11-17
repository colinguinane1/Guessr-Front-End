export type Difficulty = {
  [key: string]: {
    difficulty: string;
    created: Date;
    expires: Date;
    global_user_guesses: number;
    _id: string;
    min: number;
    max: number;
    value: number;
    attempts: number;
  };
};
