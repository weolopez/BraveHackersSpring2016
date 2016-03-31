import {Page, NavController, NavParams} from 'ionic-angular';
import {Map} from '../../components/map/map';

@Page({
    templateUrl: 'build/pages/secretmissions/secretmissions.html',
    directives: [Map]
})
export class Secretmissions {
    constructor() {
    }
}
 