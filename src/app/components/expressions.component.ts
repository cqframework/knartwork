// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {Expression} from '../models/expression';

@Component({
    selector: 'expressions',
    templateUrl: '../views/expressions.html'
})
export class ExpressionsComponent {

    @Input() knart: Knart | undefined;

	createExpression() {
        let c = new Expression();
        this.knart?.expressions.push(c);
    }

    deleteExpression(e: Expression) {
        let i = this.knart?.expressions.indexOf(e, 0);
        if (i !== undefined && i> -1) {
            this.knart?.expressions.splice(i, 1);
        }
    }

}
