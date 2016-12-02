import {Value} from '../value';

export class ResponseItem {

    type: string = 'elm:Literal';
    valueType: string = 't:Integer';
    value: string;
    displayText: string
    itemCodes: Array<Value> = new Array<Value>();

}
