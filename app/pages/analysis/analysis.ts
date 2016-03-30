import {Page, NavController, NavParams} from 'ionic-angular';
import {Status} from '../../components/status/status';

@Page({
    templateUrl: 'build/pages/analysis/analysis.html',
    directives: [Status]
})
export class Notes {
    clues: any;
    constructor() {
        this.clues=[
            {
                text: "The majority of fish",
                question: "why",
                answers: [
                    {
                        name: "Answer 1",
                        text: "fish lack energy"
                    },
                    {
                        name: "Answer 1",
                        text: "fish lack energy"
                    },
                    {
                        name: "Answer 1",
                        text: "fish lack energy"
                    }
                ]
            },
            {
                text: "The majority of fish",
                question: "why",
                answers: [
                    {
                        name: "Answer 1",
                        text: "fish lack energy"
                    },
                    {
                        name: "Answer 1",
                        text: "fish lack energy"
                    },
                    {
                        name: "Answer 1",
                        text: "fish lack energy"
                    }
                ]
            },
            {
                text: "The majority of fish",
                question: "why",
                answers: [
                    {
                        name: "Answer 1",
                        text: "fish lack energy"
                    },
                    {
                        name: "Answer 1",
                        text: "fish lack energy"
                    },
                    {
                        name: "Answer 1",
                        text: "fish lack energy"
                    }
                ]
            },
            {
                text: "The majority of fish",
                question: "why",
                answers: [
                    {
                        name: "Answer 1",
                        text: "fish lack energy"
                    },
                    {
                        name: "Answer 1",
                        text: "fish lack energy"
                    },
                    {
                        name: "Answer 1",
                        text: "fish lack energy"
                    }
                ]
            }
        ]
    }
}
 