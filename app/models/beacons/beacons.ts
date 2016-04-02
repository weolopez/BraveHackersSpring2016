import {Injectable, Inject} from 'angular2/core';
import {Platform} from 'ionic-angular';
import {Story} from '../../models/story/story';
import { ApplicationRef } from 'angular2/src/core/application_ref';


@Injectable()
export class Beacons {
    story: Story;
    platform: any;
    ar: ApplicationRef;
   
       constructor(platform: Platform, story: Story, ar: ApplicationRef ) {
          this.story = story;  
          this.platform = platform;   
          this.ar = ar;
       }
       
       start() {
            
           var beacons = this;
           this.platform.ready().then(() => {
              console.log("Beacons.start()") 
            
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
            
              var delegate = new cordova.plugins.locationManager.Delegate();
              
              delegate.didRangeBeaconsInRegion = function (pluginResult) {
                 
                 if(pluginResult.beacons.length > 0) {
                    //console.log("******** didRangeBeaconsInRegion *********");
                    var major;
                    var color;
              
                    for(var i = 0; i < pluginResult.beacons.length; i++) {
                       major = pluginResult.beacons[i].major;
                       color = context[major];
                       //console.log("Found " + color + " Beacon!!!!");
                     
                       //ask Weo how to make sure that Story is defined in this event
                    //   this.story.getClues().forEach(function(clue) {
                     //     if (clue.beacon===color && clue.found == false) 
                    //      {
                     //         //send notification "Secret Clue"
                     //         console.log("Found Clue" + clue.name);
                      //        clue.found = true;
                      //    }         
                    //   }, this); 
                        beacons.story.stories.missions.forEach(function(mission) {
                           //console.log("Mission Name: " + mission.name )
                              if (mission.beacon===color && !mission.found) 
                              {
                                  console.log("Found Mission, about to send notification" + mission.name);
                                  //send notification "Secret Mission "
                                  cordova.plugins.notification.local.schedule({
                                    id: 1,
                                    title: "Congratulations!",
                                    text: "You Have Unlocked a Secret Mission!!!",
                                    data: { name: mission.name }
                                 });
                                 
                               
                                 console.log("About to set timeout");
                                 mission.found = true;
                                 beacons.ar.tick();
                            
                                
                                 
                            }         
                       }, this);    
                       
                               
                    }
                 }
                   
              };
              cordova.plugins.locationManager.setDelegate(delegate);

              cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
          
              var beaconRegion = new cordova.plugins.locationManager.BeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d");
              
              cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
                .fail(console.error)
                .done();
          
          });
       } //end start
}
