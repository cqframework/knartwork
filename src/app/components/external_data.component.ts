// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {ExternalData} from '../models/external_data';

@Component({
    selector: 'external_data',
    templateUrl: '../views/external_data.html'
})
export class ExternalDataComponent {

    @Input() knart: Knart | undefined;

    createExternalData() {
        let ed = new ExternalData();
        this.knart?.externalData.push(ed);
    }

    deleteExternalData(ed: ExternalData) {
        let i = this.knart?.externalData.indexOf(ed, 0);
        if (i && i > -1) {
            this.knart?.externalData.splice(i, 1);
        }
    }

}
