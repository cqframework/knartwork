import {Injectable, Inject} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {Knart} from '../models/knart';
import {Identifier} from '../models/identifier';
import {ModelReference} from '../models/model_reference';
import {Contribution} from '../models/contribution';
import {ActionGroup} from '../models/actions/action_group';
import {ArtifactType} from '../models/artifact_type';
import {Format} from '../models/format';
import {Status} from '../models/status';
import {RelatedResource} from '../models/related_resource';
import {Resource} from '../models/resource';
import {SupportingEvidence} from '../models/supporting_evidence';
import {ExternalData} from '../models/external_data';
import {Coverage} from '../models/coverage';
import {Condition} from '../models/condition';
import {Expression} from '../models/expression';

import {Contact} from '../models/contact';
import {Address} from '../models/address';
import {Name} from '../models/name';
import {Role} from '../models/role';
import {Affiliation} from '../models/affiliation';

import {Action} from '../models/actions/action';
import {CollectInformationAction} from '../models/actions/collect_information_action';
import {DeclareResponseAction} from '../models/actions/declare_response_action';
import {CreateAction} from '../models/actions/create_action';
import {ResponseItem} from '../models/actions/response_item';
import {Value} from '../models/value';


@Injectable()
export class XmlExporterService {

    // knart: Knart;
    document: Document;

    private serializer: XMLSerializer = new XMLSerializer();

    constructor( @Inject('Window') private window: Window, private http: Http) {
        console.log("HomeComponent has been initialized. PROBABLY DELETE THIS CLASS");
    }

    createXMLDocumentFrom(knart: Knart): Document {
        // this.document = this.window.document.implementation.createDocument(Knart.KNART_NAMESPACE, '', null);
        // this.document = new XMLDocument();
        // HACK There must be a better way of creating the Document :-/  -Preston
        let ns = 'xmlns:vmr="urn:hl7-org:vmr:r2" xmlns:dt="urn:hl7-org:cdsdt:r2" xmlns:p1="http://www.w3.org/1999/xhtml" xmlns:elm="urn:hl7-org:elm:r1" xmlns:a="urn:hl7-org:cql-annotations:r1" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
        this.document = (new DOMParser()).parseFromString('<knowledgeDocument xmlns="' + Knart.KNART_NAMESPACE + '" ' + ns + '></knowledgeDocument>', 'text/xml');
        let kd = this.document.childNodes[0];
        kd.appendChild(this.createMetadata(knart));
        kd.appendChild(this.createExternalData(knart));
        kd.appendChild(this.createExpressions(knart));
        kd.appendChild(this.createActionGroup(knart));
        return this.document;
    }

    createIdentifiers(knart: Knart): Node {
        let ids = this.document.createElement('identifiers');
        for (let kid of knart.identifiers) {
            let id = this.document.createElement('identifier');
            id.setAttribute('root', kid.root);
            id.setAttribute('extension', kid.extension);
            id.setAttribute('version', kid.version);
            ids.appendChild(id);
        }
        return ids;
    }


    createDataModels(knart: Knart): Node {
        let dataModels = this.document.createElement('dataModels');
        for (let kmr of knart.modelReferences) {
            let modelReference = this.document.createElement('modelReference');
            let description = this.document.createElement('description');
            description.setAttribute('value', kmr.description);
            let referencedModel = this.document.createElement('referencedModel');
            referencedModel.setAttribute('value', kmr.referencedModel);
            modelReference.appendChild(description);
            modelReference.appendChild(referencedModel);
            dataModels.appendChild(modelReference);
        }
        return dataModels;
    }

    createRelatedResources(knart: Knart): Node {
        let relatedResources = this.document.createElement('relatedResources');
        for (let krr of knart.relatedResources) {
            let relatedResource = this.document.createElement('relatedResource');
            relatedResource.appendChild(this.createTagValueElement('relationship', krr.relationship));
            let resources = this.document.createElement('resources');
            for (let kr of krr.resources) {
                let resource = this.document.createElement('resource');
                resource.appendChild(this.createTagValueElement('title', kr.title));
                resource.appendChild(this.createTagValueElement('location', kr.location));
                resource.appendChild(this.createTagValueElement('description', kr.description));
                resources.appendChild(resource);
            }
            relatedResource.appendChild(resources);
            relatedResources.appendChild(relatedResource);
        }
        return relatedResources;
    }


    createSupportingEvidence(knart: Knart): Node {
        let supportingEvidence = this.document.createElement('supportingEvidence');
        for (let kse of knart.supportingEvidence) {
            let evidence = this.document.createElement('evidence');
            let resources = this.document.createElement('resources');
            evidence.appendChild(resources);
            let resource = this.document.createElement('resource');
            resources.appendChild(resource);
            resource.appendChild(this.createTagValueElement('citation', kse.citation));
            supportingEvidence.appendChild(evidence);
        }
        return supportingEvidence;
    }

    createValueElement(value: Value): Node {
        let v = this.document.createElement('value');
        v.setAttribute('code', value.code);
        v.setAttribute('codeSystem', value.codeSystem);
        v.setAttribute('codeSystemName', value.codeSystemName);
        v.appendChild(this.createTagValueElement('dt:displayName', value.displayName));
        return v;
    }

    createApplicability(knart: Knart): Node {
        let applicability = this.document.createElement('applicability');
        for (let kc of knart.coverages) {
            let coverage = this.document.createElement('coverage');
            coverage.appendChild(this.createTagValueElement('focus', kc.focus));
            coverage.appendChild(this.createTagValueElement('description', kc.description));
            coverage.appendChild(this.createValueElement(kc.value));
            applicability.appendChild(coverage);
        }
        return applicability;
    }


    createEventHistory(knart: Knart): Node {
        let eventHistory = this.document.createElement('eventHistory');
        for (let ke of knart.lifeCycleEvents) {
            let event = this.document.createElement('artifactLifeCycleEvent');
            event.appendChild(this.createTagValueElement('eventType', ke.type));
            event.appendChild(this.createTagValueElement('eventDateTime', ke.datetime));
            eventHistory.appendChild(event);
        }
        return eventHistory;
    }

    createTagValueElement(name: string, value: string): HTMLElement {
        let e = this.document.createElement(name);
        e.setAttribute('value', value);
        return e;
    }

    createMetadata(knart: Knart): Node {
        let md = document.createElement('metadata');

        md.appendChild(this.createIdentifiers(knart));
        md.appendChild(this.createDataModels(knart));

        md.appendChild(this.createTagValueElement('artifactType', knart.artifactType));

        let sid = this.document.createElement('schemaIdentifier');
        sid.setAttribute('root', Knart.KNART_NAMESPACE);
        sid.setAttribute('version', '1'); // Because Friday
        md.appendChild(sid);

        md.appendChild(this.createTagValueElement('title', knart.title));
        md.appendChild(this.createTagValueElement('status', knart.status));
        md.appendChild(this.createTagValueElement('description', knart.description));

        md.appendChild(this.createRelatedResources(knart));
        md.appendChild(this.createSupportingEvidence(knart));
        md.appendChild(this.createApplicability(knart));
        md.appendChild(this.createEventHistory(knart));

        return md;
    }

    createExternalData(knart: Knart): Node {
        let root = document.createElement('externalData');
        return root;
    }
    createExpressions(knart: Knart): Node {
        let root = document.createElement('expressions');
        return root;
    }

    createActionGroup(knart: Knart): Node {
        let root = document.createElement('actionGroup');
        return root;
    }

}
