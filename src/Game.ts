/// <reference path="Player.ts" />
module states {
/*
            var game = {
                'language': language,
                'num_players': 1,
                'max_players': numPlayers,
                'state': state,
                'current_round': 1,
                'board': _.shuffle(word),
                'seed': word16._id,
                'used_words': [],
                'doc': new Date().getTime() / 1000,
                'players': [player]
            };

{
  "language": "CA",
  "num_players": 1,
  "max_players": 2,
  "state": "CREATED",
  "current_round": 1,
  "board": [
    "R",
    "U",
    "O",
    "N",
    "R",
    "P",
    "E",
    "I",
    "A",
    "R",
    "A",
    "I",
    "N",
    "A",
    "A",
    "Q"
  ],
  "seed": 14,
  "used_words": [],
  "doc": 1454685427.037,
  "players": [
    {
      "id": 0,
      "rounds": []
    }
  ],
  "_id": "56b4bcf361173e684838697a"
}
 */

    export class Game {
        language: string;
        num_players: number;
        max_players: number;
        state: string;
        current_round: number;
        board: string[];
        seed: number;
        doc: number;
        player: Player[];
        _id: string;

    }
}