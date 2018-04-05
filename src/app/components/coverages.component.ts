import {Component, Input} from '@angular/core';

import {BaseComponent} from './base.component';

import {Knart} from '../models/knart';
import {Coverage} from '../models/coverage';

@Component({
    selector: 'coverages',
    templateUrl: '../views/coverages.pug'
})
export class CoveragesComponent extends BaseComponent {

    @Input() knart: Knart;

    createCoverage() {
        let c = new Coverage();
        this.knart.coverages.push(c);
    }

    deleteCoverage(c: Coverage) {
        let i: number = this.knart.coverages.indexOf(c, 0);
        if (i > -1) {
            this.knart.coverages.splice(i, 1);
        }
    }

}
