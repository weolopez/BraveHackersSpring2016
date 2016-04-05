import {Injectable, Inject} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {User} from '../../models/user/user';
import {Beacons} from '../../models/beacons/beacons';
import {Gamebar} from '../../components/gamebar/gamebar';

//var instance;
@Injectable()
export class Story {
    story: any = {};
    stories: any = {};
    currentStory: any;
    constructor(private http: Http,
        private user: User
    ) {
        var story = this;
        story.http = http; 
        story.http.get("missions/missions.json")
            .subscribe(data => {
                story.stories = data.json();
            }, error => {
                console.log(error);
            });
    }
    save() { 
        var story = this;
        story.user.saveStory(story.story);
    }
    open(page) {
        var story = this;
        story.story.currentApp = page;
        Gamebar.getGamebar().open(story.story[story.story.currentApp].type);
        story.save();
    }
    next() {
        var story = this;
        story.story.next = story.story[story.story.next].next;
        var type = story.story[story.story.next].type;
        console.log("Opening: " + type);
        Gamebar.getGamebar().open(type);
        story.save();
    }
    alertNotes(alert) {
        if (alert)
            Gamebar.getGamebar().alertNote("silver");
        else
            Gamebar.getGamebar().alertNote("none");
    }
    getStoryFile(m) {
        var story = this;

        if (m.file !== undefined) {
            this.http.get(m.file)
                .subscribe(data => {
                    //  new Game(data.json());

                    story.story = data.json();
                    //  if (story.story.hasBeacons) {
                    //ask Weo
                    //      let beacons = new Beacons(this.platform, this);
                    //        beacons.start();
                    // }
                }, error => {
                    console.log(error);
                }); 
        }
        else if (m.type === 'mission') {
            story.story = m;
            story.next();
        }
    }
    getStories() {
        // can we only display missions that are "found"?
        return this.stories;
    }
    getStory() {
        return this.story;
    }
    setCurrentStory(m) {
        this.currentStory = m.name;
        this.getStoryFile(m);
    }
    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    getNextApp() {
        return this.story[this.story.next];
    }
    advanceScene() {
        this.story.next = this.story[this.story.next].next;
    }
    getApp(app) {
        return this.story[app];
    }
    getScene() {
        return this.story
    }
    getClues() {
        return this.story.clueTool.clues;
    }
}
    /*    ,
        {
            "name" : "Which Animal Is It?",
            "file" : "missions/missing.json",
            "info" : "AT&T • 2016",
            "beacon" : "none",
            "found" :  true 
        },
          {
            "name" : "Hello Los Angeles!",
            "file" : "missions/missions.json",
            "info" : "AT&T • 2016",
            "beacon" : "blueberry",
            "found" :  false  
        }*/