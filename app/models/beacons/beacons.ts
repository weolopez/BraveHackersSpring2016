import {Injectable, Inject} from 'angular2/core';
//import {Observable} from 'rxjs/Observable';
//import {Firebase, FirebaseRef, AngularFire} from 'angularfire2';
//import {User} from '../user/user';

//var instance;
@Injectable()
export class Beacons {
    missions: any =
 [
            {
                name: "Secret Mission 1",
                location: "Georgia Aquarium",
                description: "Where are the Sea Lions?"
            },
            {
                name: "Secret Mission 2",
                location: "Fernbank Science Center",
                description: "The Cute Littler T-REX"
            },
            {
                name: "Secret Mission 3",
                location: "Six Flags",
                description: "How Fast Can a Roller Coaster Go?"
            }
           
 ];
    constructor(
      //  private af: AngularFire, 
       // private ref: FirebaseRef
        ) {
     //   this.ref = ref;
       // this.user = User.getInstance();

       this.missions = this.getMissionsFromBeacons()
    }

    
    getMissionsFromBeacons() {
        
       console.log("get missions of beacons in range.") 
       return  [
            {
                name: "Secret Mission 1",
                location: "Georgia Aquarium",
                description: "Where are the Sea Lions?"
            },
            {
                name: "Secret Mission 2",
                location: "Fernbank Science Center",
                description: "The Cute Littler T-REX"
            },
            {
                name: "Secret Mission 3",
                location: "Six Flags",
                description: "How Fast Can a Roller Coaster Go?"
            }
           
      ]
       
    } 
    getMissions() {
        return this.missions;
    } 
}
