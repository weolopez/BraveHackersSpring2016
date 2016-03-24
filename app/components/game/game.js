import {Component, View} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic/ionic';
import {ObjectToArray} from '../../pipes/object_to_pipe';
import {Storage} from '../../models/storage/storage';


@Component({
    selector: 'game-edit',
    providers: [Storage, ObjectToArray],
    inputs: ['game', 'selected']
})
@View({
    pipes: [ObjectToArray],
    templateUrl: 'build/components/game/game.html',
    directives: [IONIC_DIRECTIVES]
})
export class GameEdit {
    game;
    selected;
    constructor(storage: Storage, objectToArray: ObjectToArray) {
        this.storage = storage;
        this.objectToArray = objectToArray;
    }
    ngOnInit() {
       // console.log(this.game); // object here
        if (!this.game) return;
        this.homeplayers = this.objectToArray.filter(this.game.home, 'name');
        this.awayplayers = this.objectToArray.filter(this.game.away, 'name');

        this.players = this.game.players;
        if (!this.players) this.players = {};
    }
    addPlayer(player) {
        var gep = this;
        this.storage.add(player, 'picks', this.game.name, this.isHome)

        if (this.isHome === 'home')
            gep.homeplayers.push(player);
        else
            gep.awayplayers.push(player);
    }
}