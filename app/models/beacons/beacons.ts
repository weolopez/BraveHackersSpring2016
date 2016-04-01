import {Injectable, Inject} from 'angular2/core';
import {Platform} from 'ionic-angular';
import {Story} from '../../models/story/story';


@Injectable()
export class Beacons {
    story: Story;
    nearest_beacon: any;
    platform: any;
   
       constructor(platform: Platform, @Inject(Story) story: Story
      //  private af: AngularFire, 
       // private ref: FirebaseRef
        ) {
     //   this.ref = ref;
       // this.user = User.getInstance();
          this.story = story;
          this.nearest_beacon = "mint"
          this.platform = platform;
       }
       
       start() {
           this.startRanging();
           this.checkRange();   
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
              //update clues
              this.story.getClues().forEach(function(clue) {
                 if (clue.beacon===this.nearest_beacon) {
                     clue.found = true;
                 }
              }, this);
              //unlock missions
              
            }
       };
    }
}
