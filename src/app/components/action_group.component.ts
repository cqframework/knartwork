import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {Value} from '../models/value';

import {Action} from '../models/actions/action';
import {ActionGroup} from '../models/actions/action_group';
import {DeclareResponseAction} from '../models/actions/declare_response_action';
import {CollectInformationAction} from '../models/actions/collect_information_action';
import {CreateAction} from '../models/actions/create_action';

@Component({
    selector: 'action_group',
    templateUrl: '/action_group.html'
})
export class ActionGroupComponent {

    @Input() knart: Knart;
    @Input() actionGroup: ActionGroup;

    constructor() {
        console.log("ActionGroupComponent has been initialized.");
    }

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


    deleteAction(action: Action) {
        let i: number = this.actionGroup.subElements.indexOf(action, 0);
        if (i > -1) {
            this.actionGroup.subElements.splice(i, 1);
        }
    }

    moveUp(action: Action) {
        if (this.actionGroup.subElements.length > 1) {
            let i: number = this.actionGroup.subElements.indexOf(action, 0);
            if (i > 0) {
                let tmp: Action = this.actionGroup.subElements[i - 1];
                this.actionGroup.subElements[i - 1] = this.actionGroup.subElements[i];
                this.actionGroup.subElements[i] = tmp;
            }

        }
    }
    moveDown(action: Action) {
        if (this.actionGroup.subElements.length > 1) {
            let i: number = this.actionGroup.subElements.indexOf(action, 0);
            if (i < this.actionGroup.subElements.length - 1) {
                let tmp: Action = this.actionGroup.subElements[i + 1];
                this.actionGroup.subElements[i + 1] = this.actionGroup.subElements[i];
                this.actionGroup.subElements[i] = tmp;
            }
        }
    }
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
