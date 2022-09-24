// Author: Preston Lee

import {Component} from '@angular/core';

@Component({
    selector: 'api',
    templateUrl: '../views/api.html',
})
export class ApiComponent {

    stringify(obj: any): string {
        return JSON.stringify(obj, null, "\t").trim();
    }

}
