import {Component, Template } from 'angular2/angular2';
//import { RootRouter } from 'router'

@Component({
  selector: 'header-content' 
})
@Template({
  url: 'header.html'
})


export class HeaderContent { 
  constructor() {
    //var r = RootRouter;
  }
}
