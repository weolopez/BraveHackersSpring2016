import {Page, NavController} from 'ionic-angular';
import {Story} from '../../models/story/story';
import {Notes} from '../../pages/notes/notes';
import {Status} from '../../components/status/status';
import {Gamebar} from '../../components/toolbar/toolbar';
import {Beacons} from '../../models/beacons/beacons';
import {
  Control,
  ControlGroup,
  NgForm,
  Validators,
  NgControl,
  ControlValueAccessor,
  NgControlName,
  NgFormModel,
  FormBuilder
} from 'angular2/common';

@Page({
    templateUrl: 'build/pages/cluemap/cluemap.html',
    directives: [Status, Gamebar],
    providers: [Beacons]
})
export class Cluemap {
    nav: any;
    story: any;
    clues: any;
    clueTool: any;
    beacons: Beacons;
    constructor(nav: NavController, story: Story, beacons: Beacons) {
        this.nav = nav;
        this.story = story;
        this.beacons = beacons;
        //beacons.start()
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
 