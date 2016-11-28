import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';

@Component({
    selector: 'metadata',
    templateUrl: '/metadata.html'
})
export class MetadataComponent {

    @Input() knart: Knart;

    constructor() {
        console.log("MetadataComponent has been initialized.");
		// console.log("KNART: " + this.knart);
    }

}
