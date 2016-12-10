import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {Relationship} from '../models/relationship';

@Component({
    selector: 'preview',
    templateUrl: '/preview/preview.html'
})
export class PreviewComponent {

    @Input() knart: Knart;

    relationshipLabelForCode(code: string): string {
        return Relationship.fromCode(code).label;
    }

}
