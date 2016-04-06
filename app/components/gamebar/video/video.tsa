import {Page, NavController, NavParams} from 'ionic-angular';
import {Story} from '../../models/story/story';


@Page({
    templateUrl: 'build/pages/video/video.html',
    providers: [ Story ]
})
export class Video {
    app: any;
    currentScene: any = 0;
    selectedVideo: any;
    constructor(
        private nav: NavController, 
        private navParams: NavParams, 
        private story: Story
        ) {
        this.app=this.story.getNextApp().video;
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
 