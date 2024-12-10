// Author: Preston Lee

import { Action } from './action';
import { Value } from '../value';
import { ResponseItem } from './response_item';

export class CollectInformationAction extends Action {

    prompt: string = '';
    responseDataType: string = 'String' //'String' | 'Integer'
    responseCardinality: string = 'Single'; // 'Multiple' | 'Single'
    responseItems: Array<ResponseItem> = new Array<ResponseItem>();
    responseRangeType: string = '';
    responseBinding: string = '';
    responseMinimum: number = 0;
    responseMaximum: number = 0;
    initialValue: string = '';
    initialValueType: string = '';
    constraintType: string = '';
    itemCodes: Array<Value> = new Array<Value>();

}
