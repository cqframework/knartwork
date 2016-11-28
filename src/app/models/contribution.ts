import {Address} from './address';
import {Name} from './name';
import {Contact} from './contact';

export class Contribution {

    type: string;
    addresses: Array<Address> = new Array<Address>();
    names: Array<Name> = new Array<Name>();
    contacts: Array<Contact> = new Array<Contact>();
    affiliations: Array<string> = new Array<string>();

    static TYPES = ['Person'];

    constructor() {
        this.type = Contribution.TYPES[0];
    }

}
