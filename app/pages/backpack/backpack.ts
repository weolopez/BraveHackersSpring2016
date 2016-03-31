import {Page, NavController} from 'ionic-angular';
import {Status} from '../../components/status/status';
import {Messages} from '../../pages/messages/messages';
import {Notes} from '../../pages/notes/notes';

@Page({
    templateUrl: 'build/pages/backpack/backpack.html',
    directives: [Status]
})
export class Backpack {
    constructor(private nav: NavController) {
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
