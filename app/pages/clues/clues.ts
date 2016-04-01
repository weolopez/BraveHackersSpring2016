import {Page, NavController} from 'ionic-angular';
import {Story} from '../../models/story/story';
import {Backpack} from '../../pages/backpack/backpack';


@Page({
    templateUrl: 'build/pages/clues/clues.html'
})
export class Clues {
     nav: any;
    story: any;
    clues : any;
    dialogIndex: any = 0;
    clueTool: any;
    constructor(nav: NavController, story: Story) {
        this.nav = nav;
        this.story = story;
        this.clues = this.story.story.clueTool.clues;
        this.clueTool = this.story.story.clueTool;

    }
    stringify(o) {
        return JSON.stringify(o);
    }
    next() {
        
        this.story.advanceScene();
        var app = this.story.getNextApp();
        if (app) {
            if (app.type === 'scene') {
            }
        } else {
            this.nav.setRoot(Backpack);
        }
    }
}
 