import {Component, View, Inject} from 'angular2/core';
import {Story} from '../../models/story/story';
//import {User} from '../../models/user/user';
import {IONIC_DIRECTIVES} from 'ionic-angular';
    
@Component({ 
    selector: 'test',   
 })
@View({  templateUrl: 'build/components/test/test.html',
    directives: [IONIC_DIRECTIVES]
 })
export class Test {

    story: Story;
    testing: any;
    clueTool: any;
    numberOfTests: any;
    completedTest: any;
    constructor(story:Story) {
        var test = this;
        this.story=story;
        this.testing = story.story.notes.testing;
        this.clueTool = story.story.clueTool;
        this.clueTool.completedHypothesis=false;
        /*
        test.numberOfTests = this.clues.reduce(function(n, val) { 
            var index = Number(val.id)-1;
            var itr = test.clues[index].isTestingRequired;
            return n + (itr === true);
        }, 0);*/
    }
    isDone() {/*
        var test = this;
        var count = this.clues.reduce(function(n, val) {
            var index = Number(val.id)-1;
            var itr = test.clues[index].isTestingRequired;
            return n + (val.selectedClue === itr);
        }, 0);
        if (count >= test.numberOfTests) {
           test.completedTest = true;
           return true;
        } else false;
        */
    }
    next() {
        var test = this;
        test.clueTool.completedAnalysis = test.completedTest;
        window.scrollTo(0, 0);
    }
    noop() {
        
    }
} 