// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {BaseComponent} from './base.component';

import {Knart} from '../models/knart';
import {ModelReference} from '../models/model_reference';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'model_references',
    templateUrl: '../views/model_references.html',
    imports: [CommonModule, FormsModule]
})
export class ModelReferencesComponent extends BaseComponent {

    @Input() knart: Knart | undefined;

    createModelReference() {
        let mr = new ModelReference();
        this.knart?.modelReferences.push(mr);
    }

    deleteModelReference(mr: ModelReference) {
        let i = this.knart?.modelReferences.indexOf(mr, 0);
        if (i !== undefined && i > -1) {
            this.knart?.modelReferences.splice(i, 1);
        }
    }

}
