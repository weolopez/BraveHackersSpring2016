import {Component, View, Inject} from 'angular2/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {Messages} from '../../pages/messages/messages';
import {Backpack} from '../../pages/backpack/backpack';
import {Notes} from '../../pages/notes/notes';
import {Game} from '../../pages/game/game';
//import {User} from '../../models/user/user';

@Component({ selector: 'gamebar' })
@View({ templateUrl: 'build/components/toolbar/toolbar.html' })
export class Gamebar {
    nav: any;
    constructor(nav: NavController) {
        this.nav = nav;
    }
    
    openNotes() {
      this.nav.setRoot(Notes);
    }
    openHelp() {
       this.nav.setRoot(Messages);  
    }
    openBackpack() {
        this.nav.setRoot(Backpack);
    }
    openMessages() {
       this.nav.setRoot(Game); 
    }
}
