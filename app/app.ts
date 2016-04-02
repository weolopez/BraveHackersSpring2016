import 'es6-shim';
import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Video} from './pages/video/video';
import {Start} from './pages/start/start';
import {Messages} from './pages/messages/messages';
import {Notes} from './pages/notes/notes';
import {Secretmissions} from './pages/secretmissions/secretmissions';
import {Backpack} from './pages/backpack/backpack';
import {Clues} from './pages/clues/clues'
import {Wikipedia} from './pages/wikipedia/wikipedia'
import {Beacons} from './models/beacons/beacons';
import {Story} from './models/story/story';
//import {FirebaseUrl, FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';

@App({
  templateUrl: 'build/app.html',
    providers: [ Story, Beacons ] ,
    config: {} //,  http://ionicframework.com/docs/v2/api/config/Config/ 
  //  providers: [ 
    //    FIREBASE_PROVIDERS,
      //  defaultFirebase('https://yourpicks.firebaseio.com/') 
  //  ]
})
class MyApp {
  // make HelloIonicPage the root (or first) page 
  rootPage: any = Start;
  pages: Array<{title: string, component: any}>;

  constructor(
    private app: IonicApp,
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Video', component: Video },
      { title: 'Wikipedia', component: Wikipedia },
      { title: 'Secretmissions', component: Secretmissions },
      { title: 'Start', component: Start },
      { title: 'Notes', component: Notes },
      { title: 'Clues', component: Clues },
      { title: 'Messages', component: Messages },
      { title: 'Backpack', component: Backpack }
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
    nav.pages=this.pages;
  }
}
