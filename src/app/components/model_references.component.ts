import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {ModelReference} from '../models/model_reference';

@Component({
    selector: 'model_references',
    templateUrl: '/model_references.html'
})
export class ModelReferencesComponent {

    @Input() knart: Knart;

    constructor() {
        console.log("ModelReferencesComponent has been initialized.");
    }

    createModelReference() {
        let mr = new ModelReference();
        this.knart.modelReferences.push(mr);
    }

    deleteModelReference(mr) {
        let i: number = this.knart.modelReferences.indexOf(mr, 0);
        if (i > -1) {
            this.knart.modelReferences.splice(i, 1);
        }
    }

}
