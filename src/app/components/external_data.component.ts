import {Component, Input, ViewEncapsulation} from '@angular/core';

import {Knart} from '../models/knart';
import {ExternalData} from '../models/external_data';

@Component({
    selector: 'external_data',
    templateUrl: '../views/external_data.pug',
  encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class ExternalDataComponent {

    @Input() knart: Knart;

    createExternalData() {
        let ed = new ExternalData();
        this.knart.externalData.push(ed);
    }

    deleteExternalData(ed: ExternalData) {
        let i: number = this.knart.externalData.indexOf(ed, 0);
        if (i > -1) {
            this.knart.externalData.splice(i, 1);
        }
    }

}
