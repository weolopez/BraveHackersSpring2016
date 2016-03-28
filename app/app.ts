import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Video} from './pages/video/video';
import {Wikipedia} from './pages/wikipedia/wikipedia';
import {Map} from './pages/map/map';
import {FirebaseUrl, FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';

@App({
  templateUrl: 'build/app.html',
    config: {}, // http://ionicframework.com/docs/v2/api/config/Config/ 
    providers: [ 
        FIREBASE_PROVIDERS,
        defaultFirebase('https://yourpicks.firebaseio.com/') 
    ]
})
class MyApp {
  // make HelloIonicPage the root (or first) page
  rootPage: any = Map;
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
      { title: 'Wikipedia', component: Wikipedia }
    ];
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
  }
}
