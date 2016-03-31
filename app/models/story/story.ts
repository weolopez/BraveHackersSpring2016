import {Injectable, Inject} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
//import {Observable} from 'rxjs/Observable';
//import {Firebase, FirebaseRef, AngularFire} from 'angularfire2';
//import {User} from '../user/user';

//var instance;
@Injectable()
export class Story {

    currentScene: any = 0;
    currentAct: any = 0;
    clues: any =
    [
        {
            text: "The majority of fish",
            question: "why",
            answers: [
                {
                    name: "Answer 1",
                    text: "fish lack energy"
                },
                {
                    name: "Answer 2",
                    text: "fish lack energy"
                },
                {
                    name: "Answer 3",
                    text: "fish lack energy"
                }
            ]
        },
        {
            text: "The majority of fish smell",
            question: "why",
            answers: [
                {
                    name: "Answer 1",
                    text: "fish lack energy"
                },
                {
                    name: "Answer 2",
                    text: "fish lack energy"
                },
                {
                    name: "Answer 3",
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
                    name: "Answer 2",
                    text: "fish lack energy"
                },
                {
                    name: "Answer 3",
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
                    name: "Answer 2",
                    text: "fish lack energy"
                },
                {
                    name: "Answer 3",
                    text: "fish lack energy"
                }
            ]
        }
    ];
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
        this.currentScene++;
    }
    getApp(app) {
        return this.outline.acts[this.currentAct].apps[app];
    }
    getAct() {
        return this.outline.acts[this.currentAct];
    }
    getScene() {
        return this.story
    }
    getClues() {
        return this.clues;
    }
    /*
    get(list, name, attribute) {
        if (!Storage[list]) return;
        var game = Storage[list].find(value => value['name'] === name);
        return game[attribute];
    }
    add(value, list, name, attribute) {
        var user = this.user.user.id;
        var timestamp = new Date().getTime();
        if (!name) {
            value.user = user;
            value.create = timestamp;
            this.ref.child(list).push(value);
        }
        else {
            var children = this.ref.child(list).orderByChild('name');
            var childrenKeys = children.key();
            if (childrenKeys !== null) {
                children.equalTo(name).once('child_added')
                    .then(function(v) {
                        var foundkey = v.key();
                        var key = v.ref().child(attribute).push(value).key();
                        var auditRecord = {
                            collection: list,
                            name: name,
                            user: user,
                            create: timestamp,
                            key: key,
                            value: value
                        };
                        v.ref().child('audit').push(auditRecord);
                    });

            }
        }
    }
    */
}
