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

        this.outline = {
            name: "coral",
            acts: [
                {
                    name: "introduction",
                    scene: [
                        {
                        name: "welcome",    
                        text: "Welcome Maggie!  We have been trying to find you! We know about your super skills and tech that you have developed!  We want to enlist you into our Elite Detective squad."
                        },
                        
                        {
                        name: "next",    
                        text: "We are a mystery solving unit and desperately need your help! Please meet us at the Dolphin Exibit so we can get our first case underway."
                        }
                    ]
                }
            ]
        }
    }
    // 
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
}
