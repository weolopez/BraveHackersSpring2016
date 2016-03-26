import {Page, NavController, NavParams} from 'ionic/ionic';
import {Story} from '../../models/story/story';


@Page({
    templateUrl: 'build/pages/wikipedia/wikipedia.html',
    providers: [ Story ]
})
export class Wikipedia {
    constructor(nav: NavController, navParams: NavParams, story: Story) {
        this.nav = nav;        
        this.story=story;
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
