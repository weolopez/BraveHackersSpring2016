import {Page, NavController, NavParams} from 'ionic/ionic';
import {Story} from '../../models/story/story';


@Page({
    templateUrl: 'build/pages/sensors/sensors.html',
    providers: [ Story ]
})
export class Sensors {
    constructor(nav: NavController, navParams: NavParams, story: Story) {
        this.nav = nav;        
        this.story=story;
        this.app=story.getApp('phmeter');
        this.currentScene=0;
    }
    advanceScene() {
        this.currentScene++;
    }
}
