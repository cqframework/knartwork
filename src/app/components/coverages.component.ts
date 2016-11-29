import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {Coverage} from '../models/coverage';

@Component({
    selector: 'coverages',
    templateUrl: '/coverages.html'
})
export class CoveragesComponent {

    @Input() knart: Knart;

    constructor() {
        console.log("CoveragesComponent has been initialized.");
    }

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
