import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {Condition} from '../models/condition';

@Component({
    selector: 'conditions',
    templateUrl: '../views/conditions.pug',
})
export class ConditionsComponent {

    @Input() knart: Knart;


    createCondition() {
        let c = new Condition();
        this.knart.conditions.push(c);
    }

    deleteCondition(c: Condition) {
        let i: number = this.knart.conditions.indexOf(c, 0);
        if (i > -1) {
            this.knart.conditions.splice(i, 1);
        }
    }
}
