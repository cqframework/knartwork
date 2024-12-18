// Author: Preston Lee

import {Component, Input} from '@angular/core';

import {BaseComponent} from './base.component';

import {Knart} from '../knart_model/knart';
import {RelatedResource} from '../knart_model/related_resource';
import {Relationship} from '../knart_model/relationship';
import {Resource} from '../knart_model/resource';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'related_resources',
    templateUrl: '../views/related_resources.html',
    imports: [CommonModule, FormsModule]
})
export class RelatedResourcesComponent extends BaseComponent {

    @Input() knart: Knart | undefined;

    relationshipTypes(): Array<Relationship> {
        return Relationship.ALL
    }

    createRelatedResource() {
        let rr = new RelatedResource();
        // rr.resources.push(new Resource());
        this.knart?.relatedResources.push(rr);
    }

    deleteRelatedResource(rr: RelatedResource) {
        let i = this.knart?.relatedResources.indexOf(rr, 0);
        if (i !== undefined && i > -1) {
            this.knart?.relatedResources.splice(i, 1);
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
