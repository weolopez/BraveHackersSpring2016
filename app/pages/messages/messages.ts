import {Page, NavController, NavParams} from 'ionic-angular';
import {Inject, Injectable} from 'angular2/core';
import {Backpack} from '../../pages/backpack/backpack';
import {Notes} from '../../pages/notes/notes';

import {Status} from '../../components/status/status';

@Page({
    templateUrl: 'build/pages/messages/messages.html',
    directives: [Status]
})

export class Messages {
    tab: any = 'hypothesis';
    nav: any;
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
       this.nav.setRoot(Messages);
    }
}
