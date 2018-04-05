import {Input} from '@angular/core';

import {Relationship} from './relationship';
import {Resource} from './resource';

export class RelatedResource {

    relationship: string = Relationship.ADAPTED_FROM.code;
    resources: Array<Resource> = new Array<Resource>();

}
