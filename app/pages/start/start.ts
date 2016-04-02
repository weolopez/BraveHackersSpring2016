import {Page, NavController, NavParams} from 'ionic-angular';
import {Status} from '../../components/status/status';
import {Backpack} from '../../pages/backpack/backpack';
import {Game} from '../../pages/game/game';
import {Story} from '../../models/story/story';
import {User} from '../../models/user/user';
import {Map} from '../../components/map/map';

@Page({
    templateUrl: 'build/pages/start/start.html',
    directives: [Status, Map]
})
export class Start {
    tab: any = '';
    nav: any;
    story: Story;
    user: User;
    constructor(
        nav: NavController,
        private s: Story,
        u: User
    ) {
        this.nav = nav;
        this.story = s;
        this.user = u;
    }
    openPage() {
        this.nav.setRoot(Game);
    }
    getOtherMissions() {
        var start = this;
        if (start.user.missions != null) {
            start.user.missions.forEach(function(mission) {
                start.story.stories.missions.push(mission);
            });
        }
    }
}
