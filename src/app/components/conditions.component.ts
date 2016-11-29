import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';

@Component({
    selector: 'conditions',
    templateUrl: '/conditions.html'
})
export class ConditionsComponent {

    @Input() knart: Knart;

    constructor() {
        console.log("ConditionsComponent has been initialized.");
    }

}
