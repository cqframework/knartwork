// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {SupportingEvidence} from '../models/supporting_evidence';

@Component({
    selector: 'supporting_evidence',
    templateUrl: '../views/supporting_evidence.html'
})
export class SupportingEvidenceComponent {

    @Input() knart: Knart | undefined;

    createSupportingEvidence() {
        let se = new SupportingEvidence();
        this.knart?.supportingEvidence.push(se);
    }

    deleteSupportingEvidence(se: SupportingEvidence) {
        let i = this.knart?.supportingEvidence.indexOf(se, 0);
        if (i && i > -1) {
            this.knart?.supportingEvidence.splice(i, 1);
        }
    }

}
