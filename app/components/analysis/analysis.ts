import {Component, View, Inject} from 'angular2/core';
import {Story} from '../../models/story/story';
//import {User} from '../../models/user/user';

@Component({ 
    selector: 'analysis',
    providers: [ Story ]
 })
@View({  templateUrl: 'build/components/analysis/analysis.html' })
export class Analysis {

    story: Story;
    constructor(@Inject(Story) story:Story) {
        this.story=story;
    }
}