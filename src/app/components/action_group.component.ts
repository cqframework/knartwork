import {Component, Input} from '@angular/core';

import {ActionComponent} from './action.component';

import {Knart} from '../models/knart';
import {Value} from '../models/value';

import {Action} from '../models/actions/action';
import {ActionGroup} from '../models/actions/action_group';
import {DeclareResponseAction} from '../models/actions/declare_response_action';
import {CollectInformationAction} from '../models/actions/collect_information_action';
import {CreateAction} from '../models/actions/create_action';
import {ResponseItem} from '../models/actions/response_item';

@Component({
    selector: 'action_group',
    templateUrl: '/action_group.html'
})
export class ActionGroupComponent extends ActionComponent {

    @Input() knart: Knart;
    @Input() actionGroup: ActionGroup;

    canDelete() {
        return this.knart.actionGroup != this.actionGroup;
    }

    createRepresentedConcept() {
        this.actionGroup.representedConcepts.push(new Value());
    }

    deleteRepresentedConcept(rc: Value) {
        let i: number = this.actionGroup.representedConcepts.indexOf(rc, 0);
        if (i > -1) {
            this.actionGroup.representedConcepts.splice(i, 1);
        }
    }



    createItemCode(action: CollectInformationAction) {
        action.itemCodes.push(new Value());
    }

    deleteItemCode(action: CollectInformationAction, itemCode: Value) {
        let i: number = action.itemCodes.indexOf(itemCode, 0);
        if (i > -1) {
            action.itemCodes.splice(i, 1);
        }
    }


    createResponseItemCode(responseItem: ResponseItem) {
        responseItem.itemCodes.push(new Value());
    }

    deleteResponseItemCode(responseItem: ResponseItem, itemCode: Value) {
        let i: number = responseItem.itemCodes.indexOf(itemCode, 0);
        if (i > -1) {
            responseItem.itemCodes.splice(i, 1);
        }
    }

    // Action types
    createDeclareResponseAction() {
        this.actionGroup.subElements.push(new DeclareResponseAction());
    }
    createCollectInformationAction() {
        this.actionGroup.subElements.push(new CollectInformationAction());
    }
    createCreateAction() {
        this.actionGroup.subElements.push(new CreateAction());
    }
    createActionGroup() {
        this.actionGroup.subElements.push(new ActionGroup());
    }

    createResponseItem(action: CollectInformationAction) {
        let ri = new ResponseItem();
        action.responseItems.push(ri);
    }


    deleteResponseItem(action: CollectInformationAction, responseItem: ResponseItem) {
        let i: number = action.responseItems.indexOf(responseItem, 0);
        if (i > -1) {
            action.responseItems.splice(i, 1);
        }
    }

    deleteAction(action: Action) {
        let i: number = this.actionGroup.subElements.indexOf(action, 0);
        if (i > -1) {
            this.actionGroup.subElements.splice(i, 1);
        }
    }


}
