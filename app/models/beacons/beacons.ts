import {Injectable, Inject} from 'angular2/core';
import {Platform} from 'ionic-angular';
//import {Observable} from 'rxjs/Observable';
//import {Firebase, FirebaseRef, AngularFire} from 'angularfire2';
//import {User} from '../user/user';

//var instance;
@Injectable()
export class Beacons {
    nearest_beacon: any;
    platform: any;
    mission: any ;
    all_missions: any =
 [
            {
                name: "Secret Mission 1",
                location: "Georgia Aquarium",
                description: "Where are the Sea Lions?",
                beacon: "mint"
            },
            {
                name: "Secret Mission 2",
                location: "Fernbank Science Center",
                description: "The Cute Littler T-REX",
                beacon: "ice"
            },
            {
                name: "Secret Mission 3",
                location: "Six Flags",
                description: "How Fast Can a Roller Coaster Go?",
                beacon: "blueberry"
            }
           
 ];
   
       constructor(platform: Platform
      //  private af: AngularFire, 
       // private ref: FirebaseRef
        ) {
     //   this.ref = ref;
       // this.user = User.getInstance();
          this.nearest_beacon = "mint"
          this.platform = platform;
          this.mission = this.setMission()
         // this.startRanging();
         // this.checkRange();
       }
      
    
       setMission() {
      //    var mymission = {}
      //    this.all_missions.forEach( function (m) {
      //       if (m.beacon==="mint") {
      //          mymission = m
      //       }
      //    });
          return  {
                name: "Secret Mission 2",
                location: "Fernbank Science Center",
                description: "The Cute Littler T-REX",
                beacon: "ice"
            }
       }
       
        getMission() {
          return this.mission;
        } 
   
       startRanging() {
          this.platform.ready().then(() => {
            console.log("get missions of beacons in range.") 
            var context = {
            "17648" : "mint",
            "38104" : "blueberry",
            "40654" : "ice",
            "3605"  : "mint", 
            "44231" : "ice", 
            "39109" : "blueberry"
            }

            if(this.platform.is('ios')) {
               cordova.plugins.notification.local.promptForPermission();
               //window.plugins.notification.local.promptForPermission();
            }

            cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
          
            var beaconRegion = new cordova.plugins.locationManager.BeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d");
            cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
          
          });
       }
       checkRange() {
          var delegate = new cordova.plugins.locationManager.Delegate();
          
          delegate.didRangeBeaconsInRegion = function (pluginResult) {
              if(pluginResult.beacons.length > 0) {
                 console.log("******** didRangeBeaconsInRegion *********");
                 var uniqueBeaconKey;
              
                 for(var i = 0; i < pluginResult.beacons.length; i++) {
                     uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                     this.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
                 }

              var nearest =  this.beacons[uniqueBeaconKey];
              //Set nearest to the last beacon added. We will use this as the default to start checking against.

              for(var key in this.beacons) {
                  if (nearest.rssi == 0) {
                    nearest = this.beacons[key];
                  }
                  else if ( (this.beacons[key].rssi != 0) && ( this.beacons[key].rssi > nearest.rssi)) {
                    nearest = this.beacons[key];
                  }
              }
              this.nearest_beacon = this.context[nearest.major];
              console.log("nearest beacon is " + this.nearest_beacon);
              console.log("nearest beacon rssi is " + nearest.rssi);
              this.setMission();
              
            }
       };
    }
}
