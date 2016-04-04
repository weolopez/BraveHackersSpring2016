import {Component, View, Inject} from 'angular2/core';
import {Story} from '../../models/story/story';
//import {User} from '../../models/user/user';
import {IONIC_DIRECTIVES} from 'ionic-angular';
    
@Component({ 
    selector: 'analysis',   
 })
@View({  templateUrl: 'build/components/analysis/analysis.html',
    directives: [IONIC_DIRECTIVES]
 })
export class Analysis {

    story: Story;
    clues: any;
    clueTool: any;
    numberOfTests: any;
    completedAnalysis: any;
    constructor(story:Story) {
        var analysis = this;
        this.story=story;
        this.clues = story.story.clueTool.clues;
        this.clueTool = story.story.clueTool;
        this.clueTool.completedHypothesis=false;
        
        analysis.numberOfTests = this.clues.reduce(function(n, val) { 
            var index = Number(val.id)-1;
            var itr = analysis.clues[index].isTestingRequired;
            return n + (itr === true);
        }, 0);
    }
    isDone() {
        var analysis = this;
        var count = this.clues.reduce(function(n, val) {
            var index = Number(val.id)-1;
            var itr = analysis.clues[index].isTestingRequired;
            return n + (val.selectedClue === itr);
        }, 0);
        if (count === analysis.numberOfTests) {
           analysis.completedAnalysis = true;
           return true;
        } else false;
        
    }
    next() {
        var analysis = this;
        this.story.story.notes.completedAnalysis = analysis.completedAnalysis;
        this.story.next();
    }
} 