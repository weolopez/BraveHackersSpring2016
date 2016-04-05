import {Component, View, Inject} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Story} from '../../models/story/story';
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
//import {User} from '../../models/user/user';

@Component({
    selector: 'hypothesis'
})
@View({
    templateUrl: 'build/components/hypothesis/hypothesis.html',
    directives: [IONIC_DIRECTIVES]
}) 
export class Hypothesis {
    story: Story;
    showHint: any;
    clues: any;
    clueTool: any;
    constructor(story: Story) {
        this.story = story;
        this.clues = story.story.clueTool.clues;
        this.clueTool = story.story.clueTool;
        this.clueTool.completedHypothesis=false;
    }
    validateClue(c) {
       c.showHint=false;
       c.validate=true
       c.isCorrect=(c.selectedClue===c.answer.toString());    
       this.story.story.notes.completedHypothesis = this.isCompleted();
    }
    isCompleted() {
        var hypothesis=this;
        var count = hypothesis.clues.reduce(function(n, val) {
            return n + (val.isCorrect === true);
        }, 0);
        if (count >= hypothesis.clues.length) {
             hypothesis.story.story.points[hypothesis.story.story.currentApp] = 250;
              return true;
        }
        else return false;
    }
} 