import {Action} from './action';
import {Value} from '../value';
import {ResponseItem} from './response_item';

export class CollectInformationAction extends Action {

    prompt: string;
	textEquivalent: string;
    responseDataType: 'String' | 'Integer' = 'String';
    responseCardinality: 'Multiple' | 'Single' = 'Single';
    responseItems: Array<ResponseItem> = new Array<ResponseItem>();
    responseBinding: string;
    responseMinimum: number;
    responseMaximum: number;
    initialValue: string;
    itemCodes: Array<Value> = new Array<Value>();

}
