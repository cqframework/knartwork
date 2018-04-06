import {Component, Input} from '@angular/core';

import {BaseComponent} from './base.component';

import {Knart} from '../models/knart';
import {LifeCycleEvent} from '../models/life_cycle_event';

@Component({
    selector: 'history',
    templateUrl: '../views/history.pug'
})
export class HistoryComponent extends BaseComponent {

    @Input() knart: Knart;

	lifeCycleEventTypes(): Array<string> {
		return LifeCycleEvent.TYPES;
	}

    createLifeCycleEvent() {
        let e = new LifeCycleEvent();
        this.knart.lifeCycleEvents.push(e);
    }

    deleteLifeCycleEvent(e: LifeCycleEvent) {
        let i: number = this.knart.lifeCycleEvents.indexOf(e, 0);
        if (i > -1) {
            this.knart.lifeCycleEvents.splice(i, 1);
        }
    }

}
