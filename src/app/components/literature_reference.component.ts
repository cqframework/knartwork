// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {LiteratureReference} from '../models/literature_reference';

@Component({
    selector: 'literature_reference',
    templateUrl: '../views/literature_reference.html'
})
export class LiteratureReferenceComponent {

    @Input() knart: Knart | undefined;

    createLiteratureReference() {
        let lr = new LiteratureReference();
        this.knart?.literatureReference.push(lr);
    }

    deleteLiteratureReference(lr: LiteratureReference) {
        let i = this.knart?.literatureReference.indexOf(lr, 0);
        if (i && i > -1) {
            this.knart?.literatureReference.splice(i, 1);
        }
    }

}
