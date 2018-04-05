import {Component, Input, ViewEncapsulation} from '@angular/core';

import {Knart} from '../models/knart';
import {Relationship} from '../models/relationship';

@Component({
    selector: 'export',
    templateUrl: '../views/export.pug',
  encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class ExportComponent {

    @Input() knart: Knart;

}
