/// <reference path="Player.ts" />
module states {
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