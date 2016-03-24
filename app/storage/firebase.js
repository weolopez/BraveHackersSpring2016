import {Injectable} from 'angular2/core';

export class LocalFirebase {
    constructor() {
        this.ref = new Firebase('https://yourpicks.firebaseio.com');
    }
    setVariable(path, name, callback) {
        if (!name) name = path;
        this[name] = {};
    }

    newObject(path, obj) {
        this.ref.child(path).set(obj);
    }
    //FirebaseConstants.dbname 
}