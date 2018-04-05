import {Component, Input, ViewEncapsulation} from '@angular/core';

import {BaseComponent} from './base.component';

import {Knart} from '../models/knart';
import {Contribution} from '../models/contribution';
import {Address} from '../models/address';
import {Contact} from '../models/contact';
import {Name} from '../models/name';
import {Role} from '../models/role';
import {Affiliation} from '../models/affiliation';

@Component({
    selector: 'contributions',
    templateUrl: '../views/contributions.pug',
  encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class ContributionsComponent extends BaseComponent {

    @Input() knart: Knart;

    contributorTypes(): Array<string> {
        return ["Person"];
    }
    roleTypes(): Array<Role> {
        return Role.ALL;
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

    createContact(contribution: Contribution) {
        contribution.contacts.push(new Contact());
    }

    deleteContact(contribution: Contribution, contact: Contact) {
        let contributionIndex: number = this.knart.contributions.indexOf(contribution);
        let contactIndex: number = this.knart.contributions[contributionIndex].contacts.indexOf(contact);
        this.knart.contributions[contributionIndex].contacts.splice(contactIndex, 1);
    }


    createName(contribution: Contribution) {
        contribution.names.push(new Name());
    }

    deleteName(contribution: Contribution, name: Name) {
        let contributionIndex: number = this.knart.contributions.indexOf(contribution);
        let nameIndex: number = this.knart.contributions[contributionIndex].names.indexOf(name);
        this.knart.contributions[contributionIndex].names.splice(nameIndex, 1);
    }

    createAffiliation(contribution: Contribution) {
        contribution.affiliations.push(new Affiliation());
    }

    deleteAffiliation(contribution: Contribution, affiliation: Affiliation) {
        let contributionIndex: number = this.knart.contributions.indexOf(contribution);
        let affiliationIndex: number = this.knart.contributions[contributionIndex].affiliations.indexOf(affiliation);
        this.knart.contributions[contributionIndex].affiliations.splice(affiliationIndex, 1);
    }

}
