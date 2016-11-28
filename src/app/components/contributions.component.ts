import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {Contribution} from '../models/contribution';

@Component({
    selector: 'contributions',
    templateUrl: '/contributions.html'
})
export class ContributionsComponent {

    @Input() knart: Knart;

    constructor() {
        console.log("ContributionsComponent has been initialized.");
    }

    contributorTypes(): Array<string> {
        return ["Person"];
    }
    createContribution() {
        let c = new Contribution();
        // c.type‘’
        this.knart.contributions.push(c);
    }

}
