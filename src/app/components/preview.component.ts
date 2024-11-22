// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {Relationship} from '../models/relationship';
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
