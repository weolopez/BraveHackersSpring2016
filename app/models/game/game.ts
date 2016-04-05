let game;
export class Game {
    constructor(public story) {
        var g = this;
        
        if (game === undefined) 
             game = g; 
    }
    static getGame() {
        return game;
    }
}