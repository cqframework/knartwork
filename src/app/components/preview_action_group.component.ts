import {Component, Input, ViewEncapsulation} from '@angular/core';

import {ActionComponent} from './action.component';

import {Knart} from '../models/knart';

import {Action} from '../models/actions/action';
import {ActionGroup} from '../models/actions/action_group';

@Component({
    selector: 'preview_action_group',
    templateUrl: '../views/preview/action_group.pug',
  encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class PreviewActionGroupComponent extends ActionComponent {

    @Input() knart: Knart;
    @Input() actionGroup: ActionGroup;

}
