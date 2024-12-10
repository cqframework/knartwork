// Author: Preston Lee

import { Component, Input } from '@angular/core';

import { BaseComponent } from './base.component';

import { Knart } from '../knart_model/knart';
import { Coverage } from '../knart_model/coverage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'coverages',
    templateUrl: '../views/coverages.html',
    imports: [CommonModule, FormsModule]
})
export class CoveragesComponent extends BaseComponent {

    @Input() knart: Knart | undefined;

    createCoverage() {
        let c = new Coverage();
        this.knart?.coverages.push(c);
    }

    deleteCoverage(c: Coverage) {
        let i = this.knart?.coverages.indexOf(c, 0);
        if (i !== undefined && i > -1) {
            this.knart?.coverages.splice(i, 1);
        }
    }

}
