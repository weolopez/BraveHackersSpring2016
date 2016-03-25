import {Page} from 'ionic/ionic';
import {Story} from '../../models/story/story';


@Page({
    templateUrl: 'build/pages/game/game.html',
    providers: [ Story ], 
})
export class Game {
    constructor(story: Story) {
        this.story=story;
        this.currentScene=0;
        this.currentAct=0;
    }
    stringify(o) {
        return JSON.stringify(o);
    }
    advance() {
        this.currentScene++;
    }
}
