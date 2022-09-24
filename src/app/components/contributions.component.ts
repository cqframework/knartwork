// Author: Preston Lee

import { Component, Input } from '@angular/core';

import { BaseComponent } from './base.component';

import { Knart } from '../models/knart';
import { Contribution } from '../models/contribution';
import { Address } from '../models/address';
import { Contact } from '../models/contact';
import { Name } from '../models/name';
import { Role } from '../models/role';
import { Affiliation } from '../models/affiliation';

@Component({
    selector: 'contributions',
    templateUrl: '../views/contributions.html'
})
export class ContributionsComponent extends BaseComponent {

    @Input() knart: Knart | undefined;

    contributorTypes(): Array<string> {
        return ["Person"];
    }
    roleTypes(): Array<Role> {
        return Role.ALL;
    }

    createContribution() {
        let c = new Contribution();
        this.knart?.contributions.push(c);
    }

    deleteContribution(c: Contribution) {
        let index = this.knart?.contributions.indexOf(c, 0);
        if (index !== undefined && index > -1) {
            this.knart?.contributions.splice(index, 1);
        }
    }

    createAddress(c: Contribution) {
        c.addresses.push(new Address());
    }
    deleteAddress(c: Contribution, a: Address) {
        let i = this.knart?.contributions.indexOf(c);
        if (i !== undefined && i > -1) {
            let aIndex = this.knart?.contributions[i].addresses.indexOf(a);
            if (aIndex !== undefined) {
                this.knart?.contributions[i].addresses.splice(aIndex, 1);
            }
        }
    }

    createContact(contribution: Contribution) {
        contribution.contacts.push(new Contact());
    }

    deleteContact(contribution: Contribution, contact: Contact) {
        let i = this.knart?.contributions.indexOf(contribution);
        if (i !== undefined && i > -1) {
            let contactIndex = this.knart?.contributions[i].contacts.indexOf(contact);
            if (contactIndex !== undefined) {
                this.knart?.contributions[i].contacts.splice(contactIndex, 1);
            }
        }
    }

    createName(contribution: Contribution) {
        contribution.names.push(new Name());
    }

    deleteName(contribution: Contribution, name: Name) {
        let i = this.knart?.contributions.indexOf(contribution);
        if (i !== undefined && i > -1) {
            let nameIndex = this.knart?.contributions[i].names.indexOf(name);
            if (nameIndex !== undefined) {
                this.knart?.contributions[i].names.splice(nameIndex, 1);
            }
        }
    }

    createAffiliation(contribution: Contribution) {
        contribution.affiliations.push(new Affiliation());
    }

    deleteAffiliation(contribution: Contribution, affiliation: Affiliation) {
        let i = this.knart?.contributions.indexOf(contribution);
        if (i !== undefined && i > -1) {
            let affiliationIndex = this.knart?.contributions[i].affiliations.indexOf(affiliation);
            if (affiliationIndex !== undefined) {
                this.knart?.contributions[i].affiliations.splice(affiliationIndex, 1);
            }
        }
    }

}
