import {Page, NavController, NavParams} from 'ionic-angular';
import {Inject} from 'angular2/core';
import {Analysis} from '../../components/analysis/analysis';
import {Hypothesis} from '../../components/hypothesis/hypothesis';
import {Status} from '../../components/status/status';
import {Story} from '../../models/story/story';
import {Messages} from '../../pages/messages/messages';
import {Backpack} from '../../pages/backpack/backpack';
import {Gamebar} from '../../components/toolbar/toolbar';

@Page({
    templateUrl: 'build/pages/notes/notes.html',
    directives: [Status, Analysis, Hypothesis, Gamebar]
})
export class Notes {
    tab: any = 'hypothesis';
    nav: any; 
    story: Story;
    clues: any;
    clueTool: any;
    analysisComplete: any;
    constructor(story: Story, @Inject(NavController) nav: NavController) {
        this.nav = nav;
        this.story = story;
        this.clues = story.story.clueTool.clues;
        this.clueTool = story.story.clueTool;
    }
    isAnalysisComplete() {
        return true;
        //don't know why this is required but it will crash without the following line
        this.nav.setRoot(Messages);
    }
}

