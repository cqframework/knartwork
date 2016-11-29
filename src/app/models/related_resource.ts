import {Relationship} from './relationship';
import {Resource} from './resource';

export class RelatedResource {
    relationship: string = Relationship.ADAPTED_FROM.code;
    resource: Resource = new Resource();
}
