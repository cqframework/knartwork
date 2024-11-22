// Author: Preston Lee

import { Component, Input } from '@angular/core';

import { Knart } from '../models/knart';
import { ExternalData } from '../models/external_data';
import { BaseComponent } from './base.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'external_data',
    templateUrl: '../views/external_data.html',
    imports: [CommonModule, FormsModule]
})
export class ExternalDataComponent extends BaseComponent {

    @Input() knart: Knart | undefined;

    createExternalData() {
        let ed = new ExternalData();
        this.knart?.externalData.push(ed);
    }

    deleteExternalData(ed: ExternalData) {
        let i = this.knart?.externalData.indexOf(ed, 0);
        if (i !== undefined && i > -1) {
            this.knart?.externalData.splice(i, 1);
        }
    }

}
