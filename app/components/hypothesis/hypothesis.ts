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

    langs;
    constructor( @Inject(Story) story: Story) {
        this.story = story;
    }
} 