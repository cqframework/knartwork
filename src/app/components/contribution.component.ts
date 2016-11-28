import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';

@Component({
    selector: 'contribution',
    templateUrl: '/contribution.html'
})
export class ContributionComponent {

    @Input() knart: Knart;

    constructor() {
        console.log("ContributionComponent has been initialized.");
    }

}
