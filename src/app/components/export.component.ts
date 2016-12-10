import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {Relationship} from '../models/relationship';

@Component({
    selector: 'export',
    templateUrl: '/export.html'
})
export class ExportComponent {

    @Input() knart: Knart;

    constructor() {
        console.log("ExportComponent has been initialized.");
    }

}
