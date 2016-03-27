import {Injectable} from 'angular2/core';
import {Firebase, FirebaseRef, AngularFire} from 'angularfire2';

let instance;

@Injectable()
export class User {
    online: any;
    ref: String;
    editRefString: String;
    userRef: Firebase;
    constructor() {
        if (!instance) {
            instance = this;
        } else return instance;
        
        var user=this;
        user.online = 0;
        user.ref = 'https://yourpicks.firebaseio.com';
        user.editRefString = 'users';
        user.usersRef = new Firebase(user.ref);
        user.usersRef.onAuth(user.setUser);
        user.connectedRef = new Firebase(user.ref + '/.info/connected');
        user.getUsers();
        user.user = {name: 'Anonymous User', profileLocation: 'local', 
            profile: {profileImageURL:'http://www.psdgraphics.com/file/male-silhouette.jpg'}};
            
        user.connectedRef.on('value', user.onConnectedRefChange);
    }
    
    static getInstance() {
        if (!instance) return new User();
        return instance;
    }
    onConnectedRefChange(snap) {
        var user = this;
        if ((snap.val() === true) && (user.userConnectionsRef !== undefined)) {
                var con = user.userConnectionsRef.push(true);
                con.onDisconnect().remove();
                user.userLastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
        }
    }
    authUser() {
        var user=this;
        user.usersRef.authWithOAuthPopup('facebook').then(user.setUser);
    }           
    logout() {
        var user=this;
        user.usersRef.unauth();
        user.user = {name: 'Anonymous User', profileLocation: 'local', 
            profile: {profileImageURL:'http://www.psdgraphics.com/file/male-silhouette.jpg'}};
    }
    setLocation(location) {
        user.user.location = location;
        save();
        this.ref.child(codedTeam).set(newTeam);
    }
    save() {
        var user = this;
        user.userRef.set(user.user);
    }
    setProperty(key, value) {
        var user = this;
        user.user[key] = value;
        user.save();
    }
    getProperty(key) {
        return user.user[key];
    }
    setEditLocation(usereditRefString) {
        user.editLocationConnectionsRef = new Firebase(ref + '/' + editRefString + '/' + user.user.name + '/connections');
        user.editLocationLastOnlineRef = new Firebase(ref + '/' + editRefString + '/' + user.user.name + '/lastOnline');
    }
    getImage(userName, source) {
        var returnImage = 'assets/images/logo.png', 
            loggedInImage;
        if (user.user === undefined) return returnImage;
        try {
            loggedInImage = user.user.profile.profileImageURL;
        } catch (err) {
            console.log(err);
        }
        if (source === user.user.profileProvider) {
            if (loggedInImage !== undefined) returnImage = loggedInImage;
        }
        if (source === undefined) {
            if (loggedInImage !== undefined) returnImage = loggedInImage;
        }
        return returnImage;
    }
    getLastOnline(userName) {
        var returnDate;
        try {
            var date = new Date(user.users[userName].lastOnline);
            returnDate = date.toJSON();
        } catch (err) {
            returnDate = 'UNKNOWN';
        }
        if (user.users[userName].connections !== undefined) returnDate = 'Is currently online.';
        return returnDate;
    }
    getUsers() {
        var user=this;
        if ((user.users === undefined) ||
            (user.userRef !== undefined)) {
            var usersConnectionString = user.ref + '/users';
            /**
             * load users list
            $firebaseObject(new Firebase(usersConnectionString))
                                .$loaded(function (value) {
                                    user.users = value;
                                    var count = 0;
                                    angular.forEach(user.users, function (value, key) {
                                        if (value.connections !== undefined)
                                            count = count + 1;
                                    }, count);
                                    online = count;
                                });
                                */
        }
    }
    setUser(authData) {
        var user=User.getInstance();
        if (!authData) {
            console.log('AuthData null');
            return;
        }
        var name = authData[authData.provider].displayName.replace(/\s+/g, '');
        user.userConnectionString = user.ref + '/users/' + name.tobase64url();
        user.userRef = new Firebase(user.userConnectionString);
        user.userRef.once('value').then((d) => {
            user.user = d.val();
            user.user.name = name;
            user.user.id = name.tobase64url();
            user.user.profileProvider = authData.provider;
            user.user.profile = authData[user.user.profileProvider];
            user.userConnectionsRef = new Firebase(user.userConnectionString + '/connections');
            user.userLastOnlineRef = new Firebase(user.userConnectionString + '/lastOnline');
            user.save();
            return d;
        });
                    
    }
}