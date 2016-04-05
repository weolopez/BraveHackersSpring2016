import {Component, View, Inject} from 'angular2/core';
//import {Status} from '../../components/status/status';
import {IonicApp, Modal, Platform,
    NavController, NavParams, Page,
    ViewController
} from 'ionic-angular';
import {Quiz} from '../../components/quiz/quiz';
import {Analysis} from '../../components/analysis/analysis';
import {Hypothesis} from '../../components/hypothesis/hypothesis';
import {Test} from '../../components/test/test';
import {IONIC_DIRECTIVES} from 'ionic-angular';
//import {User} from '../../models/user/user';
import {Story} from '../../models/story/story';
import {Status} from '../../components/status/status';

let gamebar;
@Component({ selector: 'gamebar' })
@View({
    templateUrl: 'build/components/gamebar/gamebar.html',
    directives: [IONIC_DIRECTIVES]
})
export class Gamebar {
    pages: any = {
        "Backpack": Backpack,
        "Clues": Clues,
        "Notes": Notes,
        "Messages": Messages,
        "GenericTest": GenericTest
    }
    currentApp: any = "";
    alertNotes: any = "none";
    constructor(
        private nav: NavController,
        private viewCtrl: ViewController,
        private story: Story
    ) { 
        var g = this;
        if (gamebar === undefined)
            gamebar = g;
        else return;

    }
    static getGamebar() {
        return gamebar;
    }
    alertNote(color) {
        this.alertNotes = color;
    }
    open(page) {
        var g = this;
        if (Gamebar.getGamebar().currentApp !== page) {
            if (Gamebar.getGamebar().currentApp !== "") {
                g.viewCtrl.dismiss();
            }
            setTimeout(() => {
                Gamebar.getGamebar().currentApp = page;
                let modal = Modal.create(g.pages[page]);
                g.nav.present(modal);
            }, 500);
        }
        else {
            Gamebar.getGamebar().currentApp = "";
            g.viewCtrl.dismiss();
        }
    }
}

@Page({
    templateUrl: 'build/components/gamebar/backpack.html',
    directives: [Gamebar]
})
class Backpack {
    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        private story: Story
    ) {
    }
    openTool(tool) {
        this.story.open(tool);
    }
} 
@Page({
    templateUrl: 'build/components/gamebar/messages/messages.html',
    directives: [Status, Gamebar]
})
class Messages {
    dialog: any;
    dialogIndex: any = 0;
    background: any;
    messages: any;
    app: any;
    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        private story: Story
    ) {
        if (!story.story.name) return;
        this.init(story.getNextApp());
    }
    init(app) {
        this.app = app;
        this.dialog = this.app.dialog;
        this.background = this.app.background;
    }
    stringify(o) {
        return JSON.stringify(o);
    }
    next() {
        let next = this.app.next;
        let type = this.story.story[next].type;
        if (type === "Messages") {
            this.story.story.next = this.story.getNextApp().next;
            this.init(this.story.getNextApp());
        }
        else this.story.next();
    }
}

@Page({
    templateUrl: 'build/components/gamebar/clues/clues.html',
    directives: [Status, Gamebar]
})
class Clues {
    app: any;
    clues: any;
    clueTool: any;
    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        private story: Story
    ) {
        this.init(story.getNextApp());

    }
    init(app) {

        if (!app) {
            this.clues = [
                {
                    "id": "1",
                    "text": "No clues yet."
                }
            ];
            return;
        }
        this.app = app;
        this.clues = app.clues;
    }
    isCompleted() {
        var count = this.clues.reduce(function(n, val) {
            return n + (val.found === true);
        }, 0);
        if (count >= this.clues.length) return true;
        else return false;
    }
    stringify(o) {
        return JSON.stringify(o);
    }
    next() {
        this.story.next();
    }
}
@Page({
    templateUrl: 'build/components/gamebar/notes/notes.html',
    directives: [Status, Analysis, Hypothesis, Test, Gamebar]
})
export class Notes {
    tab: any = 'hypothesis';
    app: any;
    clues: any;
    clueTool: any;
    analysisComplete: any;
    
    constructor(
        private story: Story
        ) {
        this.init(story.getNextApp());

    }
    init(app) {

        if (!app) {
            this.clues = [
                {
                    "id": "1",
                    "text": "No clues yet."
                }
            ];
            return;
        }
        this.app = app;
        this.clues = app.clues;
    }
}
@Page({
    templateUrl: 'build/components/gamebar/genericTest/genericTest.html',
    directives: [Status, Gamebar, Quiz]
})
export class GenericTest {
    app: any;
    currentScene: any;
    background:any;
    question: any;
    answers: any;
    answer: any;
    constructor(private story: Story) {
        var phmeter = this;  
        phmeter.story=story;
        phmeter.app=story.getApp(story.story.currentApp);
        
        phmeter.currentScene=0;
        phmeter.background = phmeter.app.background; 
        phmeter.question = phmeter.app.test[0].question;
        phmeter.answers = phmeter.app.test[0].answers;
        phmeter.answer = phmeter.app.test[0].answer;
    }
    advanceScene() {
        this.currentScene++;
    }
    checkResult(correct) { 
        var phmeter = this;  
        phmeter.app.complete = correct;
        this.story.story.notes.testing[phmeter.app.testIndex].complete = true;
        this.story.alertNotes(true);
    }
}
 