import {Page, NavController, NavParams} from 'ionic/ionic';
import {Story} from '../../models/story/story';


@Page({
    templateUrl: 'build/pages/video/video.html',
    providers: [ Story ]
})
export class Video {
    constructor(nav: NavController, navParams: NavParams, story: Story) {
        this.nav = nav;        
        this.story=story;
        this.app=story.getApp('video');
        this.currentScene=0;
        this.selectedVideo = this.app.videos[0].youtube;
    }
    advanceScene() {
        this.currentScene++;
    }
    openVideo(v) {
        this.selectedVideo = v.youtube;
    }
}
