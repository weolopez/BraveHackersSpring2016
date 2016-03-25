import {Page, NavController, NavParams} from 'ionic/ionic';


@Page({
    templateUrl: 'build/pages/sensors/sensors.html'
})
export class Sensors {
    constructor(nav: NavController, navParams: NavParams) {
        this.nav = nav;        
        // set our app's pages
        this.apps = [
            { icon: 'ios-flask', title: 'pH Meter', component: Sensors },
            { icon: 'ios-flask', title: 'CO2 Meter', component: Sensors }
        ];
    }
    open(app) {
        this.nav.setRoot(HelloIonicPage);
    }
}
