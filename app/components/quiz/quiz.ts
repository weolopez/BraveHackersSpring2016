import {Component, View, Inject, Input, Output, EventEmitter} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
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
    selector: 'quiz'
})
@View({
    templateUrl: 'build/components/quiz/quiz.html',
    directives: [IONIC_DIRECTIVES]
})
export class Quiz {
    showHint: boolean = false;
    validate: boolean = false;
    selectedAnswer: any;
    @Input() question: any; 
    @Input() answers: any;
    @Input() answer: any;
    @Output() result: EventEmitter<boolean>= new EventEmitter();
    constructor() {
        
    }
    validateClue() { 
        this.showHint = false;
        this.validate = this.answer=== this.selectedAnswer;
        this.result.next(this.validate);
    }
} 