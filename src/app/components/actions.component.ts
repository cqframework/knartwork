import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';

@Component({
    selector: 'actions',
    templateUrl: '/actions.html'
})
export class ActionsComponent {

    @Input() knart: Knart;

    constructor() {
        console.log("ActionsComponent has been initialized.");
    }

}
