import {Component, Input} from '@angular/core';

import {BaseComponent} from './base.component';

import {Knart} from '../models/knart';
import {Identifier} from '../models/identifier';

@Component({
    selector: 'metadata',
    templateUrl: '/metadata.html'
})
export class MetadataComponent extends BaseComponent {

    @Input() knart: Knart;

    constructor() {
        super();
        console.log("MetadataComponent has been initialized.");
    }

    createIdentifier() {
        let i = new Identifier();
        this.knart.identifiers.push(i);
    }

    deleteIdentifier(i) {
        let index: number = this.knart.identifiers.indexOf(i, 0);
        if (index > -1) {
            this.knart.identifiers.splice(index, 1);
        }
    }

}
