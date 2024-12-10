// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {Knart} from '../knart_model/knart';
import {LiteratureReference} from '../knart_model/literature_reference';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'literature_reference',
    templateUrl: '../views/literature_reference.html',
    imports: [CommonModule]
})
export class LiteratureReferenceComponent {

    @Input() knart: Knart | undefined;

    createLiteratureReference() {
        let lr = new LiteratureReference();
        this.knart?.literatureReference.push(lr);
    }

    deleteLiteratureReference(lr: LiteratureReference) {
        let i = this.knart?.literatureReference.indexOf(lr, 0);
        if (i !== undefined && i > -1) {
            this.knart?.literatureReference.splice(i, 1);
        }
    }

}
