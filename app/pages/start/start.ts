import {Page, NavController, NavParams} from 'ionic-angular';
import {Status} from '../../components/status/status';
import {Backpack} from '../../pages/backpack/backpack';
import {Game} from '../../pages/game/game';
import {Inject} from 'angular2/core';
import {Story} from '../../models/story/story';

@Page({
    templateUrl: 'build/pages/start/start.html',
    directives: [ Status ],
    providers: [ Story ]
})
export class Start {
    tab: any = '';
    nav: any;
    story: Story;
    constructor(nav: NavController, private s: Story) {
        this.nav = nav;
        this.story = s;
    }
    
    openPage(m) {
        this.nav.setRoot(Game);
    }
}
 