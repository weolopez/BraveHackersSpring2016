import {Injectable, Inject} from 'angular2/core';
import {FirebaseAuth, AuthProviders, FirebaseAuthState} from 'angularfire2';

@Injectable()
export class User {
    firebaseAuthState: FirebaseAuthState;
    user: any;
    ref: String;
    userConnectionString: any;
    userRef: Firebase;
    userConnectionsRef: Firebase;
    userLastOnlineRef: Firebase;
    connectedRef: Firebase;
    users: any;
    missions: any;
    online: any;
    constructor(
        @Inject(FirebaseAuth) public auth: FirebaseAuth
        ) {
        var user = this;    
        user.ref = 'https://aofs.firebaseio.com';
        
        this.auth.subscribe(
            function(x) {
                if (!x) return; 
                console.log('Next: ' + x.toString());
                user.setUser(x);
            },
            function(err) {
                console.log('Error: ' + err);
            },
            function() {
                console.log('Completed');
            });
            
        user.getUsers();
        
        user.connectedRef = new Firebase(user.ref + '/.info/connected');
        user.user = {name: 'Anonymous User', profileLocation: 'local', 
            profile: {profileImageURL:'http://www.psdgraphics.com/file/male-silhouette.jpg'}};
            
        user.connectedRef.on('value', user.onConnectedRefChange);
        user.getMissions();
    }
    
    onConnectedRefChange(snap) {
        var user = this;
        return;
        if ((snap.val() === true) && (user.userConnectionsRef !== undefined)) {
                var con = user.userConnectionsRef.push(true);
                con.onDisconnect().remove();
                user.userLastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
        }
    }
    save() {
        var user = this;
        user.userRef.set(user.user);
    }
    setUser(authData) {
        var user=this;
        if (!authData) {
            console.log('AuthData null');
            return;
        }
        var name = authData[authData.auth.provider].displayName.replace(/\s+/g, '');
        user.userConnectionString = user.ref + '/users/' + name.tobase64url();
        user.userRef = new Firebase(user.userConnectionString);
        user.userRef.once('value').then((d) => {
            user.user = d.val();
            if (user.user === null) user.user = {};
            user.user.name = name;
            user.user.id = name.tobase64url();
            user.user.profileProvider = authData.auth.provider;
            user.user.profile = authData[user.user.profileProvider];
            user.userConnectionsRef = new Firebase(user.userConnectionString + '/connections');
            user.userLastOnlineRef = new Firebase(user.userConnectionString + '/lastOnline');
            user.save();
            return d;
        });
    }
    public doLogin() {
        var start = this;
        // This will perform popup auth with google oauth and the scope will be email
        // Because those options were provided through bootstrap to DI, and we're overriding the provider.
        this.auth.login({
            provider: AuthProviders.Facebook
        }).then(function(value) {
            start.firebaseAuthState = value;
        });;
    }
    public doLogout() {
        this.auth.logout();
        this.user = {name: 'Anonymous User', profileLocation: 'local', 
            profile: {profileImageURL:'http://www.psdgraphics.com/file/male-silhouette.jpg'}};
    }
    
    getLastOnline(userName) {
        var user = this;
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
            var us = new Firebase(usersConnectionString);
            us.once('value').then((d) => {
                    user.users = d.val();
                    user.online = Object.keys(user.users).length;
             });
        }
    }
    
    getMissions() {
        var user = this;
        var missionsConnectionString = user.ref + '/missions';
            var us = new Firebase(missionsConnectionString);
            us.once('value').then((d) => {
                user.missions = d.val();
                
             });
    }
}
  
  
  
  /*
        
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
}
                                */