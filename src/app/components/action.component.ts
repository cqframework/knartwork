// Author: Preston Lee

import {BaseComponent} from './base.component';

import {Action} from '../knart_model/actions/action';
import {ActionGroup} from '../knart_model/actions/action_group';
import {DeclareResponseAction} from '../knart_model/actions/declare_response_action';
import {CollectInformationAction} from '../knart_model/actions/collect_information_action';
import {CreateAction} from '../knart_model/actions/create_action';

export abstract class ActionComponent extends BaseComponent {

    // Since instanceof does not work in Angular expressions
    isDeclareResponseAction(action: Action): action is DeclareResponseAction {
        return action instanceof DeclareResponseAction;
    }
    isCollectInformationAction(action: Action): action is CollectInformationAction {
        return action instanceof CollectInformationAction;
    }
    isCreateAction(action: Action): action is CreateAction {
        return action instanceof CreateAction;
    }
    isActionGroup(action: Action): action is ActionGroup {
        return action instanceof ActionGroup;
    }
}
