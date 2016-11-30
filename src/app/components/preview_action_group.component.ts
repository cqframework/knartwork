import {Component, Input} from '@angular/core';

import {ActionComponent} from './action.component';

import {Knart} from '../models/knart';

import {Action} from '../models/actions/action';
import {ActionGroup} from '../models/actions/action_group';

@Component({
    selector: 'preview_action_group',
    templateUrl: '/preview/action_group.html'
})
export class PreviewActionGroupComponent extends ActionComponent {

    @Input() knart: Knart;
    @Input() actionGroup: ActionGroup;

}
