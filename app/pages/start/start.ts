import {Page, NavController, NavParams} from 'ionic-angular';
import {Status} from '../../components/status/status';

@Page({
    templateUrl: 'build/pages/start/start.html',
    directives: [Status]
})
export class Start {
    tab: any = '';
    constructor(
        ) {
    }
}
 