import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {Relationship} from '../models/relationship';

@Component({
    selector: 'preview',
    templateUrl: '/preview.html'
})
export class PreviewComponent {

    @Input() knart: Knart;

    constructor() {
        console.log("PreviewComponent has been initialized.");
    }

    relationshipLabelForCode(code: string): string {
        return Relationship.fromCode(code).label;
    }

}
