import {Page, NavController, NavParams} from 'ionic-angular';
import {Status} from '../../components/status/status';
import {Backpack} from '../../pages/backpack/backpack';
import {Inject} from 'angular2/core';

@Page({
    templateUrl: 'build/pages/start/start.html',
    directives: [Status]
})
export class Start {
    tab: any = '';
    nav: any;
    constructor(nav: NavController) {
        this.nav = nav;
    }
    
    openPage() {
        this.nav.setRoot(Backpack);
    }
}
 