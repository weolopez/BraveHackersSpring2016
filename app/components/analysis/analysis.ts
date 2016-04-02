import {Component, View, Inject} from 'angular2/core';
import {Story} from '../../models/story/story';
//import {User} from '../../models/user/user';

@Component({ 
    selector: 'analysis',
    providers: [ Story ]
 })
@View({  templateUrl: 'build/components/analysis/analysis.html' })
export class Analysis {

    story: Story;
    clues: any;
    clueTool: any;
    
    constructor(story:Story) {
        this.story=story;
        this.clues = story.story.clueTool.clues;
        this.clueTool = story.story.clueTool;
        this.clueTool.completedHypothesis=false;
    }
}