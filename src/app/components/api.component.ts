import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'api',
    templateUrl: '../views/api.pug',
    encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class ApiComponent {

    stringify(obj: any): string {
        return JSON.stringify(obj, null, "\t").trim();
    }

}
