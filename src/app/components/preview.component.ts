// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {Knart} from '../knart_model/knart';
import {Relationship} from '../knart_model/relationship';
import { CommonModule } from '@angular/common';
import { PreviewActionGroupComponent } from './preview_action_group.component';

@Component({
    selector: 'preview',
    templateUrl: '../views/preview/preview.html',
    imports: [CommonModule, PreviewActionGroupComponent]
})
export class PreviewComponent {

    @Input() knart: Knart | undefined;

    relationshipLabelForCode(code: string): string {
        return Relationship.fromCode(code).label;
    }

}
