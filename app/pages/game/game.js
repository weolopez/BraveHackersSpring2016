import {Page} from 'ionic/ionic';
import {Story} from '../../models/story/story';


@Page({
    templateUrl: 'build/pages/game/game.html',
    providers: [ Story ]
})
export class Game {
    constructor(story: Story) {
        this.story=story;
    }
    stringify(o) {
        return JSON.stringify(o);
    }
    getAct() {
        return this.story.getAct();
    }
    getScene() {
        return this.story.getScene();
    }
}
