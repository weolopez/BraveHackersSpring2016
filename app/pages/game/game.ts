import {Page} from 'ionic-angular';
import {Story} from '../../models/story/story';


@Page({
    templateUrl: 'build/pages/game/game.html',
    providers: [ Story ]
})
export class Game {
    story: any;
    dialog: any;
    dialogIndex: any=0;
    background: any;
    constructor(story: Story) {
        this.story=story;
        this.dialog = this.story.getNextApp().dialog;
        this.background = this.story.getNextApp().background;
        
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
 