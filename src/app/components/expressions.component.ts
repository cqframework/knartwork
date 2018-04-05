import {Component, Input, ViewEncapsulation} from '@angular/core';

import {Knart} from '../models/knart';
import {Expression} from '../models/expression';

@Component({
    selector: 'expressions',
    templateUrl: '../views/expressions.pug',
  encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class ExpressionsComponent {

    @Input() knart: Knart;

	createExpression() {
        let c = new Expression();
        this.knart.expressions.push(c);
    }

    deleteExpression(e: Expression) {
        let i: number = this.knart.expressions.indexOf(e, 0);
        if (i > -1) {
            this.knart.expressions.splice(i, 1);
        }
    }

}
