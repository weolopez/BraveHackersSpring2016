import {Component, View, Inject} from 'angular2/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {Messages} from '../../pages/messages/messages';
import {Backpack} from '../../pages/backpack/backpack';
import {Notes} from '../../pages/notes/notes';
//import {User} from '../../models/user/user';

@Component({ selector: 'toolbar' })
@View({ templateUrl: 'build/components/toolbar/toolbar.html' })
export class Toolbar {
    nav: any;
    messages: Messages;
    constructor( @Inject(NavController) nav: NavController) {
        this.nav = nav;
    }
    
    openNotes() {
      this.nav.setRoot(Notes);
    }
    openHelp() {
        
    }
    openBackpack() {
        this.nav.setRoot(Backpack);
    }
    openMessages() {
       this.nav.setRoot(this.messages);
    }
}