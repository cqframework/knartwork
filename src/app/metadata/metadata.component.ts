// Author: Preston Lee

import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {Knart} from '../knart_model/knart';
import {Identifier} from '../knart_model/identifier';

import { BaseComponent } from '../components/base.component';

@Component({
    selector: 'metadata',
    templateUrl: 'metadata.html',
    imports: [CommonModule, FormsModule]
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
