import {Component, View, Input} from 'angular2/core';
//import {Story} from '../../models/story/story';

@Component({ selector: 'status' })
@View({  templateUrl: 'build/components/status/status.html' })

export class Status {
  @Input() userTotal: any; 
  @Input() pointsTotal: any;
  constructor()  {
      
  }
} 