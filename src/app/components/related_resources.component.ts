import {Component, Input} from '@angular/core';

import {BaseComponent} from './base.component';

import {Knart} from '../models/knart';
import {RelatedResource} from '../models/related_resource';
import {Relationship} from '../models/relationship';
import {Resource} from '../models/resource';

@Component({
    selector: 'related_resources',
    templateUrl: '../views/related_resources.pug'
})
export class RelatedResourcesComponent extends BaseComponent {

    @Input() knart: Knart;

    relationshipTypes(): Array<Relationship> {
        return Relationship.ALL
    }

    createRelatedResource() {
        let rr = new RelatedResource();
        // rr.resources.push(new Resource());
        this.knart.relatedResources.push(rr);
    }

    deleteRelatedResource(rr) {
        let i: number = this.knart.relatedResources.indexOf(rr, 0);
        if (i > -1) {
            this.knart.relatedResources.splice(i, 1);
        }
    }


    createRelatedResourceResource(relatedResource: RelatedResource) {
        console.log(relatedResource.relationship);
        let r = new Resource();
        relatedResource.resources.push(r);
        var t: Resource;
        for (t of relatedResource.resources) {
            console.log(t.title);
        }
    }

    deleteRelatedResourceResource(rr: RelatedResource, resource: Resource) {
        console.log(rr.relationship);
        let i: number = rr.resources.indexOf(resource, 0);
        if (i > -1) {
            rr.resources.splice(i, 1);
        }
    }

}
