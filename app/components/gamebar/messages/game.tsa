import {Page, NavController} from 'ionic-angular';
import {Story} from '../../models/story/story';
import {PHMeter} from '../../pages/phmeter/phmeter';
import {Clues} from '../../pages/clues/clues';
import {Cluemap} from '../../pages/cluemap/cluemap';
import {Status} from '../../components/status/status';
import {Gamebar} from '../../components/toolbar/toolbar';

@Page({
    templateUrl: 'build/pages/game/game.html',
    directives: [Status, Gamebar]
})
export class Game {
    nav: any;
    story: any;
    dialog: any;
    dialogIndex: any = 0;
    background: any;
    messages: any;
    constructor(nav: NavController, story: Story) {
        this.nav = nav;
        this.story = story;
        this.dialog = this.story.getNextApp().dialog;
        this.background = this.story.getNextApp().background;
    }
    stringify(o) {
        return JSON.stringify(o);
    }
    next() {
        if (this.dialog[this.dialogIndex+1]) {
            this.dialogIndex++;
            return;
        } 
        
        
        this.story.advanceScene();
        var app = this.story.getNextApp();
        if (app) {
            if (app.type === 'scene') {
                this.dialog = app.dialog;
                this.background = app.background;
            }
        } else {
            this.nav.setRoot(PHMeter);
        }
    }
}