import {Injectable, Inject} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Firebase, FirebaseRef, AngularFire} from 'angularfire2';
import {User} from '../user/user';

//var instance;
@Injectable()
export class Story {
    constructor(af: AngularFire, @Inject(FirebaseRef) ref: Firebase) {
        this.ref = ref;
        this.user = User.getInstance();

        this.currentScene = 0;
        this.currentAct = 0;
        this.outline = {
            name: "coral",
            acts: [
                {
                    name: "introduction",
                    scenes: [
                        {
                            name: "welcome",
                            avatar: "img/female.jpg",
                            text: "Welcome Maggie!  We have been trying to find you! We know about your super skills and tech that you have developed!  We want to enlist you into our Elite Detective squad."
                        },
                        {
                            name: "next",
                            avatar: "img/female.jpg",
                            text: "We are a mystery solving unit and desperately need your help! Please meet us at the Dolphin Exibit so we can get our first case underway."
                        }
                    ],
                    apps: {
                        wikipedia: {
                            articles: [
                                {
                                    title: "pH",
                                    wikipedia: "PH",
                                    icon: "ios-bookmarks"
                                },
                                {
                                    title: "Litmus test",
                                    wikipedia: "Litmus#Uses",
                                    icon: "ios-bookmarks"
                                }
                            ]
                        },
                        video: {
                            videos: [
                                {
                                    title: "pH and pOH: Crash Course Chemistry #30",
                                    youtube: "LS67vS10O5Y",
                                    icon: "logo-youtube"
                                },
                                {
                                    title: "Testing Acids & Bases on Litmus Paper",
                                    youtube: "6DCBWK_Hg5w",
                                    icon: "logo-youtube"
                                }
                            ]
                        },
                        phmeter: {
                            ph: 7.75,
                            scenes: [
                                {
                                    name: "what is pH",
                                    avatar: "img/pHlitmusPaper.jpg",
                                    text: "A pH Meter is a scientific instrument that measures the hydrogen-ion concentration (or pH) in a solution, indicating its acidity or alkalinity. The pH meter measures the difference in electrical potential between a pH electrode and a reference electrode."
                                },
                                {
                                    name: "what is the pH in the ocian",
                                    avatar: "img/pHlitmusPaper.jpg",
                                    text: "The ocian ph is greater than 7.5"
                                },
                                {
                                    name: "what is river pH",
                                    avatar: "img/pHlitmusPaper.jpg",
                                    text: "Rivers ph is less than 7"
                                },
                                {
                                    name: "next",
                                    text: "Since coral live in the ocian. How can we prevent the coral from dieing?",
                                    question:
                                    [
                                        "Increase the pH",
                                        "Decrease the pH"
                                    ],
                                    answer: "0"
                                }
                            ]
                        }
                    }
                }
            ]
        }
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
        return this.outline.acts[this.currentAct].scenes[this.currentScene];
    }
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
                    .then(function (v) {
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
}
