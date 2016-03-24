import {Injectable, Inject} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Firebase, FirebaseRef, AngularFire} from 'angularfire2';
import {User} from '../user/user';

//var instance;
@Injectable()
export class Storage {
    static games: Observable<string[]>;
    static teams: Observable<string[]>;
    constructor(af: AngularFire, @Inject(FirebaseRef) ref: Firebase) {
        this.ref = ref;
        this.user = User.getInstance();
        this.pickArray = af.list('/picks');
        this.pickArray.subscribe(function (value) {
            Storage.picks = value;
        });
        this.gameArray = af.list('/games');
        this.gameArray.subscribe(function (value) {
            Storage.games = value;
        });
        this.teamArray = af.list('/teams');
        this.teamArray.subscribe(function (value) {
            Storage.teams = value;
        });
    }
    get(list, name, attribute) {
        if (!Storage[list]) return;
        var game = Storage[list].find(value=> value['name'] === name);
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
            if ( childrenKeys !== null) {
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
 