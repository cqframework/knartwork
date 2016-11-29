import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {Contribution} from '../models/contribution';
import {Address} from '../models/address';
import {Contact} from '../models/contact';

@Component({
    selector: 'contributions',
    templateUrl: '/contributions.html'
})
export class ContributionsComponent {

    @Input() knart: Knart;

    constructor() {
        console.log("ContributionsComponent has been initialized.");
    }

    contributorTypes(): Array<string> {
        return ["Person"];
    }

    createContribution() {
        let c = new Contribution();
        this.knart.contributions.push(c);
    }

    deleteContribution(c) {
        let index: number = this.knart.contributions.indexOf(c, 0);
        if (index > -1) {
            this.knart.contributions.splice(index, 1);
        }
    }

    createAddress(c: Contribution) {
        c.addresses.push(new Address());
    }
    deleteAddress(c: Contribution, a: Address) {
        let cIndex: number = this.knart.contributions.indexOf(c);
        let aIndex: number = this.knart.contributions[cIndex].addresses.indexOf(a);
        this.knart.contributions[cIndex].addresses.splice(aIndex, 1);
    }

    createContact(c: Contribution) {
        c.contacts.push(new Contact());
    }

}
