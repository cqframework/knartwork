// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {BaseComponent} from './base.component';

import {Knart} from '../models/knart';
import {Identifier} from '../models/identifier';

@Component({
    selector: 'metadata',
    templateUrl: '../views/metadata.html'
})
export class MetadataComponent extends BaseComponent {

    @Input() knart: Knart | undefined;

    createIdentifier() {
        let i = new Identifier();
        this.knart?.identifiers.push(i);
    }

    deleteIdentifier(i: Identifier) {
        let index = this.knart?.identifiers.indexOf(i, 0);
        if (index !== undefined && index > -1) {
            this.knart?.identifiers.splice(index, 1);
        }
    }

}
