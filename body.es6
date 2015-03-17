import {Component, Template } from 'angular2/angular2';
import { HeaderContent } from 'header';

@Component({
  selector: 'main-content'
})
@Template({
  url: 'body.html'
, directives: [ HeaderContent ]
})


export class MainContentComponent { 
  constructor() {
    this.name = 'weo';

 this.test = function($event, username) {
	//console.dir(username.value);
	this.name = username.value;
  };
  }
}
