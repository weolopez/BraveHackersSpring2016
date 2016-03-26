import {Page, NavController, NavParams} from 'ionic/ionic';
import {PHMeter} from '../phmeter/phmeter'

@Page({
    templateUrl: 'build/pages/sensors/sensors.html'
})
export class Sensors {
    constructor(nav: NavController, navParams: NavParams) {
        this.nav = nav;        
        // set our app's pages
        this.apps = [
            { icon: 'ios-flask', title: 'pH Meter', component: PHMeter },
            { icon: 'ios-flask', title: 'CO2 Meter', component: PHMeter }
        ];
    }
    openPage(app) {
        this.nav.setRoot(app.component);
    }
}
