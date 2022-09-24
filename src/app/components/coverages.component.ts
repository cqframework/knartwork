// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {BaseComponent} from './base.component';

import {Knart} from '../models/knart';
import {Coverage} from '../models/coverage';

@Component({
    selector: 'coverages',
    templateUrl: '../views/coverages.html'
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
