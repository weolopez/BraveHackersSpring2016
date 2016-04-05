import 'es6-shim';
import {StatusBar} from 'ionic-native';
import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {Start} from './pages/start/start';
import {Beacons} from './models/beacons/beacons';
import {Story} from './models/story/story';
import {User} from './models/user/user';
import {FIREBASE_PROVIDERS,
    defaultFirebase,
    AngularFire,
    firebaseAuthConfig,
    AuthProviders,
    AuthMethods
} from 'angularfire2';

@App({
    templateUrl: 'build/app.html',
    config: {}, // http://ionicframework.com/docs/v2/api/config/Config/ 
    providers: [
        Story,
        User,
        Beacons,
        FIREBASE_PROVIDERS,
        defaultFirebase('https://aofs.firebaseio.com/'),
        firebaseAuthConfig({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup,
            remember: 'default',
            scope: ['email']
        })
    ]
})
class MyApp {
    rootPage: any = Start;

    constructor(
        private app: IonicApp,
        private platform: Platform,
        private menu: MenuController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            StatusBar.styleDefault();
        });
    }
}