import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/notes/notes.html'
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
 