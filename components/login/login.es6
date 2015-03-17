import {Component, Template, bootstrap, ControlGroupDirective, ControlDirective } from 'angular2/angular2';

@Component({
  selector: 'my-app' // Defines the <my-app></my-app> tag
})
@Template({
  inline: '<input type="text" (keyup)="test($event, username)" #username placeholder="Enter a name here"/><hr><h1 [text]=>Hello {{ name }}</h1>'// Defines the inline template for the component
})

export class MyAppComponent { 
  constructor() {
    this.name = 'weo';
 this.test = function($event, username) {
	//console.dir(username.value);
	if (username !== undefined) this.name = username.value;
  };
  }
}

bootstrap(MyAppComponent);


