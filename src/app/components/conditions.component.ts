// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {Condition} from '../models/condition';

@Component({
    selector: 'conditions',
    templateUrl: '../views/conditions.html',
})
export class ConditionsComponent {

    @Input() knart: Knart | undefined;


    createCondition() {
        let c = new Condition();
        this.knart?.conditions.push(c);
    }

    deleteCondition(c: Condition) {
        let i = this.knart?.conditions.indexOf(c, 0);
        if (i !== undefined && i > -1) {
            this.knart?.conditions.splice(i, 1);
        }
    }
}
