import {Page, NavController} from 'ionic-angular';
import {Phmeter} from '../phmeter/phmeter'

@Page({
    templateUrl: 'build/pages/sensors/sensors.html'
})
export class Sensors {
  static get parameters() {
    return [[NavController]];
  }
    constructor(nav) {
        this.nav = nav;        
        // set our app's pages
        this.apps = [
            { icon: 'ios-flask', title: 'pH Meter', component: Phmeter },
            { icon: 'ios-flask', title: 'CO2 Meter', component: Phmeter }
        ];
    }
    openPage(app) {
        this.nav.setRoot(app.component);
    }
}
