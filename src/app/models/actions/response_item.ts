import {Value} from '../value';

export class ResponseItem {

    type: 'elm:Literal' = 'elm:Literal';
    valueType: 't:Integer' = 't:Integer';
    value: string;
    displayText: string
    itemCodes: Array<Value> = new Array<Value>();

}
