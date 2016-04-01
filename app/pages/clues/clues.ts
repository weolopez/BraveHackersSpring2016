import {Page, NavController} from 'ionic-angular';
import {Story} from '../../models/story/story';
import {Notes} from '../../pages/notes/notes';
import {Status} from '../../components/status/status';

@Page({
    templateUrl: 'build/pages/clues/clues.html',
    directives: [Status]
})
export class Clues {
    nav: any;
    story: any;
    clues: any;
    clueTool: any;
    constructor(nav: NavController, story: Story) {
        this.nav = nav;
        this.story = story;
        this.clues = this.story.story.clueTool.clues;
        this.clueTool = this.story.story.clueTool;
        this.story.story.next="clueTool"
    }
    isCompleted() {
        var count = this.clues.reduce(function(n, val) {
            return n + (val.found === true);
        }, 0);
        if (count >= this.clues.length) return true;
        else return false;
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
            this.nav.setRoot(Notes);
        }
    }
}
 