/// <reference path="Dictionary.ts" />

module states {
  export interface GameResult {
    winner: string;
    result: Dictionary<number>;
  }
}