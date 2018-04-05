import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {Relationship} from '../models/relationship';

@Component({
    selector: 'export',
    templateUrl: '../views/export.pug'
})
export class ExportComponent {

    @Input() knart: Knart;

}
