import {Component, Input} from '@angular/core';

import {Knart} from '../models/knart';
import {RelatedResource} from '../models/related_resource';
import {Relationship} from '../models/relationship';
import {Resource} from '../models/resource';

@Component({
    selector: 'related_resources',
    templateUrl: '/related_resources.html'
})
export class RelatedResourcesComponent {

    @Input() knart: Knart;

    constructor() {
        console.log("RelatedResourcesComponent has been initialized.");
    }

    relationshipTypes(): Array<Relationship> {
        return Relationship.ALL
    }

    createRelatedResource() {
        let rr = new RelatedResource();
        this.knart.relatedResources.push(rr);
    }

    deleteRelatedResource(rr) {
        let i: number = this.knart.relatedResources.indexOf(rr, 0);
        if (i > -1) {
            this.knart.relatedResources.splice(i, 1);
        }
    }

}
