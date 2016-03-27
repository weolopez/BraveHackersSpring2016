import {Page, NavController, NavParams} from 'ionic-angular';
import {Story} from '../../models/story/story';
import {Login} from '../../components/login/login';

@Page({
    templateUrl: 'build/pages/wikipedia/wikipedia.html',
    providers: [ Story ],
    directives: [Login]
})
export class Wikipedia {
    
    app: any;
    currentScene: any = 0;
    selectedArticle: any;
    
    constructor(nav: NavController, navParams: NavParams, story: Story) {
        this.app=story.getApp('wikipedia');
        this.currentScene=0;
        this.selectedArticle = this.app.articles[0].wikipedia;
    }
    advanceScene() {
        this.currentScene++;
    }
    openArticle(v) {
        this.selectedArticle = v.wikipedia;
    }
}
