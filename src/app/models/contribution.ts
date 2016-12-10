import {Address} from './address';
import {Name} from './name';
import {Contact} from './contact';
import {Role} from './role';
import {Affiliation} from './affiliation';

export class Contribution {

    type: string = '';
	role: string = Role.AUTHOR.code;

    addresses: Array<Address> = new Array<Address>();
    names: Array<Name> = new Array<Name>();
    contacts: Array<Contact> = new Array<Contact>();
    affiliations: Array<Affiliation> = new Array<Affiliation>();

    static TYPES = ['Person'];

    constructor() {
        this.type = Contribution.TYPES[0];
    }

}
