import {Component, View} from 'angular2/core';
import {Select, Option, Item, List} from 'ionic/ionic';
import {ObjectToArray, ObjectToKey} from '../../pipes/object_to_pipe';
import {Storage} from '../../models/storage/storage';

@Component({ 
    selector: 'edit'
    ,inputs: ['type','object'] 
   })
@View({  templateUrl: 'build/components/edit/edit.html' 
    ,pipes: [ObjectToArray, ObjectToKey],
    directives: [Select, Option, Item, List]})
export class Edit {
  type: String;
  object: Object;
  constructor(storage: Storage) {
      this.storage=storage;
  }
  toString(o) {
      return JSON.stringify(o);
  }
}