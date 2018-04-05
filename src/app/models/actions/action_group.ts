import {Action} from './action';

import {Value} from '../value';

export class ActionGroup extends Action {

	title: string;
	representedConcepts: Array<Value> = new Array<Value>();
	subElements: Array<Action> = new Array<Action>();
}
