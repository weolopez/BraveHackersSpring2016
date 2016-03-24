import {isBlank, isPresent, CONST} from 'angular2/src/facade/lang';
import {Injectable, PipeTransform, WrappedValue, Pipe} from 'angular2/core';

@CONST()
@Pipe({ name: 'o2a' })
@Injectable()
export class ObjectToArray implements PipeTransform {
    transform(value: any, args: any[] = null) {
        var a = [];
        for (var b in value) {
                a.push(value[b]);
        }
        return a;
    }
    filter(o, filter) {
        var a = [];
        for (var b in o) {
            if (b!==filter)
                a.push(o[b]);
        }
        return a;
    }
}



@CONST()
@Pipe({ name: 'o2k'})
@Injectable()
export class ObjectToKey implements PipeTransform {
    transform(value: any, args: any[] = null) {
        if (!value) return;
        var a = [];
        for (var b in value) {
            a.push(b);
        }
        return a;
    }
}