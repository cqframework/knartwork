import {Identifier} from './identifier';
import {ModelReference} from './model_reference';
import {Contribution} from './contribution';
import {ActionGroup} from './action_group';


export class Knart {

    identifiers: Array<Identifier>;
    artifactType: string;
    schemaIdentifier: string;
    dataModels: Array<ModelReference>;
    title: string;
    description: string;
    status: string;
    contributions: Array<Contribution>;

    // The meat!
    actionGroup: ActionGroup;
}
