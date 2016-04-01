import {Page, NavController, NavParams} from 'ionic-angular';
import {Status} from '../../components/status/status';
import {Backpack} from '../../pages/backpack/backpack';
import {Game} from '../../pages/game/game';
import {Inject} from 'angular2/core';
import {Story} from '../../models/story/story';
import {Map} from '../../components/map/map';

@Page({
    templateUrl: 'build/pages/start/start.html',
    directives: [ Status, Map ]
})
export class Start {
    tab: any = '';
    nav: any;
    story: Story;
    constructor(nav: NavController, private s: Story) {
        this.nav = nav;
        this.story = s;
    }
    
    openPage() {
        this.nav.setRoot(Game);
    }
}
 