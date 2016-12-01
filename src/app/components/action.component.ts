import {BaseComponent} from './base.component';

import {Action} from '../models/actions/action';
import {ActionGroup} from '../models/actions/action_group';
import {DeclareResponseAction} from '../models/actions/declare_response_action';
import {CollectInformationAction} from '../models/actions/collect_information_action';
import {CreateAction} from '../models/actions/create_action';

export abstract class ActionComponent extends BaseComponent {

    // Since instanceof does not work in Angular expressions
    isDeclareResponseAction(action: Action): boolean {
        return action instanceof DeclareResponseAction;
    }
    isCollectInformationAction(action: Action): boolean {
        return action instanceof CollectInformationAction;
    }
    isCreateAction(action: Action): boolean {
        return action instanceof CreateAction;
    }
    isActionGroup(action: Action): boolean {
        return action instanceof ActionGroup;
    }
}
