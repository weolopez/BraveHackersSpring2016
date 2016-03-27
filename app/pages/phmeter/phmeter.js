import {Page, NavController} from 'ionic-angular';
import {Story} from '../../models/story/story';


@Page({
    templateUrl: 'build/pages/phmeter/phmeter.html',
    providers: [ Story ]
})
export class PHMeter {
  static get parameters() {
    return [[NavController],[Story]];
  }
    constructor(nav, story) {
        this.nav = nav;        
        this.story=story;
        this.app=story.getApp('phmeter');
        this.currentScene=0;
        /*
        0	10 000 000	battery acid
1	1 000 000	gastric acid
2	100 000	lemon juice, vinegar
3	10 000	orange juice, soda
4	1 000	tomato juice, acid rain
5	100	black coffee, bananas
6	10	urine, milk
7	1	pure water
8	0.1	sea water, eggs
9	0.01	baking soda
10	0.001	Great Salt Lake, milk of magnesia
11	0.000 1	ammonia solution
12	0.000 01	soapy water
13	0.000 001	bleach, oven cleaner
14	0.000 000 1	liquid drain cleaner
*/
        
    }
    advanceScene() {
        this.currentScene++;
    }
}
