// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {ActionComponent} from './action.component';
import {Knart} from '../models/knart';
import {ActionGroup} from '../models/actions/action_group';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'preview_action_group',
    templateUrl: '../views/preview/action_group.html',
    imports: [CommonModule]
})
export class PreviewActionGroupComponent extends ActionComponent {

    @Input() knart: Knart | undefined;
    @Input() actionGroup: ActionGroup | undefined;

}
