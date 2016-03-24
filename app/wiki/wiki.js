import {Page, NavController, NavParams} from 'ionic/ionic';
import {HelloIonicPage} from '../pages/hello-ionic/hello-ionic';
import {Login} from '../components/login/login';

@Page({
    templateUrl: 'build/wiki/wiki.html',
    directives: [Login]
})
export class Wiki {
    constructor(nav: NavController, navParams: NavParams) {
        this.nav = nav;
    }
    itemTapped(event, item) {
    }
    getTypeList() {
        var t = this;
        for (var key of Object.keys(t.types)) {
            var ref = new Firebase('https://yourpicks.firebaseio.com/' + key);
            t.types[key].ref = ref;
            ref.once('value').then((value) => {
                var name = value.key();
                t.types[name].list = value.val();
            });
        }
    }

    openPage() {
        // close the menu when clicking a link from the menu
        //this.app.getComponent('leftMenu').close();
        // navigate to the new page if it is not the current page
        //let nav = this.app.getComponent('nav');
        this.nav.setRoot(HelloIonicPage);
    }

}
