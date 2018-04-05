import {Component, Input, ViewEncapsulation} from '@angular/core';

import {BaseComponent} from './base.component';

import {Knart} from '../models/knart';
import {Identifier} from '../models/identifier';

@Component({
    selector: 'metadata',
    templateUrl: '../views/metadata.pug',
  encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class MetadataComponent extends BaseComponent {

    @Input() knart: Knart;

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
