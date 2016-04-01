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
    openNotes() {
     //this.nav.setRoot(Notes);
    }
    openHelp() {
        
    }
    openBackpack() {
        this.nav.setRoot(Backpack);
    }
    openMessages() {
       this.nav.setRoot(Messages);
    }
    isAnalysisComplete() {
        return true;
    }
}

