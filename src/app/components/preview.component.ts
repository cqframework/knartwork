import {Component, Input, ViewEncapsulation} from '@angular/core';

import {Knart} from '../models/knart';
import {Relationship} from '../models/relationship';

@Component({
    selector: 'preview',
    templateUrl: '../views/preview/preview.pug',
  encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class PreviewComponent {

    @Input() knart: Knart;

    relationshipLabelForCode(code: string): string {
        return Relationship.fromCode(code).label;
    }

}
