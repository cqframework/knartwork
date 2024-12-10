// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {Knart} from '../knart_model/knart';
import {Expression} from '../knart_model/expression';
import { BaseComponent } from './base.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'expressions',
    templateUrl: '../views/expressions.html',
    imports: [CommonModule, FormsModule]
})
export class ExpressionsComponent extends BaseComponent {

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
