import {Component} from '@angular/core';

@Component({
    selector: 'loader',
    templateUrl: '/home.html'
})
export class ViewerComponent {


    raw: string = null;

    constructor() {
        console.log("ViewerComponent has been initialized.");
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
