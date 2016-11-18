import {Component} from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: '/home.html'
})
export class HomeComponent {

    raw: string = null;

    constructor() {
        console.log("HomeComponent has been initialized.");
    }

	reset() {
		this.raw = null;
	}

    openFile(event) {
        console.log("Reading...");
        let input = event.target;
        if (input.files.length > 0) {
            let reader = new FileReader();
            reader.onload = () => {
                // this 'text' is the content of the file
                this.raw = reader.result;
            }
            reader.readAsText(input.files[0]);
        } else {
            this.raw = null;
        }
    }

}
