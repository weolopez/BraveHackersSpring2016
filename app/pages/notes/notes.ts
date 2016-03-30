import {Page, NavController, NavParams} from 'ionic-angular';
import {Status} from '../../components/status/status';
import {Analysis} from '../../components/analysis/analysis';
import {Hypothesis} from '../../components/hypothesis/hypothesis';

@Page({
    templateUrl: 'build/pages/notes/notes.html',
    directives: [Status, Analysis, Hypothesis]
})
export class Notes {
    tab: any='hypothesis';
    constructor() {
    }
}
 