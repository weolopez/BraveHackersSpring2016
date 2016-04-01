import {Injectable, Inject} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
//import {Observable} from 'rxjs/Observable';
//import {Firebase, FirebaseRef, AngularFire} from 'angularfire2';
//import {User} from '../user/user';

//var instance;
@Injectable()
export class Story {
    story: any = {};
    stories: any = {};
    currentStory: any;
    constructor(private http: Http) {
        var story = this;
        this.http = http;
        
        this.http.get("missions/missions.json")
            .subscribe(data => {
                story.stories = data.json();
            }, error=> {
                console.log(error);
            });            
    }
    getStoryFile(m) {
        var story = this;
        this.http.get(m.file)
            .subscribe(data => {
                story.story = data.json();
                story.story.next = this.story.start;
                if (story.story.hasBeacons) {
               //     this.beacons.start();
                }
            }, error=> {
                console.log(error);
            });
    }
    getStories() {
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
    getScene() {
        return this.story
    }
    getClues() {
        return this.story.clueTool.clues;
    }
}
