import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';

@Component({
    selector: 'expressions',
    templateUrl: '/expressions.html'
})
export class ExpressionsComponent {

    @Input() knart: Knart;

    constructor() {
        console.log("ExpressionsComponent has been initialized.");
    }

}
