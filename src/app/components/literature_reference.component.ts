import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {LiteratureReference} from '../models/literature_reference';

@Component({
    selector: 'literature_reference',
    templateUrl: '../views/literature_reference.pug'
})
export class LiteratureReferenceComponent {

    @Input() knart: Knart;

    createLiteratureReference() {
        let lr = new LiteratureReference();
        this.knart.literatureRefernce.push(lr);
    }

    deleteLiteratureReference(lr: LiteratureReference) {
        let i: number = this.knart.literatureRefernce.indexOf(lr, 0);
        if (i > -1) {
            this.knart.literatureRefernce.splice(i, 1);
        }
    }

}
