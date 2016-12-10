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
        kd.appendChild(this.createConditions(knart));
        kd.appendChild(this.createActionGroup(knart.actionGroup));
        return this.document;
    }
    createKnartElement(tag: string): Element {
        return this.document.createElementNS(Knart.KNART_NAMESPACE, tag);
    }

    createDTElement(tag: string): Element {
        return this.document.createElementNS('urn:hl7-org:cdsdt:r2', tag);
    }

    createConditions(knart: Knart): Element {
        let conditions = this.createKnartElement('conditions');
        for (let kc of knart.conditions) {
            let condition = this.createKnartElement('condition');
            condition.appendChild(this.createTagValueElement('conditionRole', kc.role));
			// let logic = this.createKnartElement('logic')
			// logic.setAttribute('xsi:type', kc.);
            // id.setAttribute('root', kid.root);
            // id.setAttribute('extension', kid.extension);
            // id.setAttribute('version', kid.version);
            conditions.appendChild(condition);
        }
        return conditions;
    }

    createIdentifiers(knart: Knart): Element {
        let ids = this.createKnartElement('identifiers');
        for (let kid of knart.identifiers) {
            let id = this.createKnartElement('identifier');
            id.setAttribute('root', kid.root);
            id.setAttribute('extension', kid.extension);
            id.setAttribute('version', kid.version);
            ids.appendChild(id);
        }
        return ids;
    }


    createDataModels(knart: Knart): Element {
        let dataModels = this.createKnartElement('dataModels');
        for (let kmr of knart.modelReferences) {
            let modelReference = this.createKnartElement('modelReference');
            let description = this.createKnartElement('description');
            description.setAttribute('value', kmr.description);
            let referencedModel = this.createKnartElement('referencedModel');
            referencedModel.setAttribute('value', kmr.referencedModel);
            modelReference.appendChild(description);
            modelReference.appendChild(referencedModel);
            dataModels.appendChild(modelReference);
        }
        return dataModels;
    }

    createRelatedResources(knart: Knart): Element {
        let relatedResources = this.createKnartElement('relatedResources');
        for (let krr of knart.relatedResources) {
            let relatedResource = this.createKnartElement('relatedResource');
            relatedResource.appendChild(this.createTagValueElement('relationship', krr.relationship));
            let resources = this.createKnartElement('resources');
            for (let kr of krr.resources) {
                let resource = this.createKnartElement('resource');
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


    createSupportingEvidence(knart: Knart): Element {
        let supportingEvidence = this.createKnartElement('supportingEvidence');
        for (let kse of knart.supportingEvidence) {
            let evidence = this.createKnartElement('evidence');
            let resources = this.createKnartElement('resources');
            evidence.appendChild(resources);
            let resource = this.createKnartElement('resource');
            resources.appendChild(resource);
            resource.appendChild(this.createTagValueElement('citation', kse.citation));
            supportingEvidence.appendChild(evidence);
        }
        return supportingEvidence;
    }

    createValueElement(value: Value): Element {
        let v = this.createKnartElement('value');
        v.setAttribute('code', value.code);
        v.setAttribute('codeSystem', value.codeSystem);
        v.setAttribute('codeSystemName', value.codeSystemName);
        let displayName = this.createDTElement('displayName');
        displayName.setAttribute('value', value.displayName);
        v.appendChild(displayName);
        return v;
    }

    createApplicability(knart: Knart): Element {
        let applicability = this.createKnartElement('applicability');
        for (let kc of knart.coverages) {
            let coverage = this.createKnartElement('coverage');
            coverage.appendChild(this.createTagValueElement('focus', kc.focus));
            coverage.appendChild(this.createTagValueElement('description', kc.description));
            coverage.appendChild(this.createValueElement(kc.value));
            applicability.appendChild(coverage);
        }
        return applicability;
    }


    createEventHistory(knart: Knart): Element {
        let eventHistory = this.createKnartElement('eventHistory');
        for (let ke of knart.lifeCycleEvents) {
            let event = this.createKnartElement('artifactLifeCycleEvent');
            event.appendChild(this.createTagValueElement('eventType', ke.type));
            event.appendChild(this.createTagValueElement('eventDateTime', ke.datetime));
            eventHistory.appendChild(event);
        }
        return eventHistory;
    }

    createAddress(address: Address): Element {
        let a = this.createKnartElement('address');
        let street = this.createDTElement('part');
        let city = this.createDTElement('part');
        let zip = this.createDTElement('part');
        let state = this.createDTElement('part');
        let country = this.createDTElement('part');
        street.setAttribute('type', address.street);
        city.setAttribute('type', address.city);
        zip.setAttribute('type', address.zip);
        state.setAttribute('type', address.state);
        country.setAttribute('type', address.country);
        street.setAttribute('type', 'SAL');
        city.setAttribute('type', 'CTY');
        zip.setAttribute('type', 'ZIP');
        state.setAttribute('type', 'STA');
        country.setAttribute('type', 'CNT');
        a.appendChild(street);
        a.appendChild(city);
        a.appendChild(zip);
        a.appendChild(state);
        a.appendChild(country);
        return a;
    }


    createName(name: Name): Element {
        let n = this.createKnartElement('name');
        let given = this.createDTElement('part');
        let family = this.createDTElement('part');
        given.setAttribute('type', 'GIV');
        family.setAttribute('type', 'FAM');
        given.setAttribute('value', name.given);
        family.setAttribute('value', name.family);
        n.appendChild(given);
        n.appendChild(family);
        return n;
    }

    createAffiliation(affiliation: Affiliation): Element {
        let a = this.createKnartElement('affiliation');
        let given = this.createDTElement('part');
        let family = this.createDTElement('part');
        let name = this.createTagValueElement('name', affiliation.name);
        a.appendChild(name);
        return a;
    }


    createContact(contact: Contact): Element {
        let c = this.createKnartElement('contact');
        c.setAttribute('use', contact.use);
        c.setAttribute('value', contact.value);
        return c;
    }

    createContributions(knart: Knart): Element {
        let contributions = this.createKnartElement('contributions');
        for (let kc of knart.contributions) {
            let contribution = this.createKnartElement('contribution');
            contributions.appendChild(contribution);

            let contributor = this.createKnartElement('contributor');
            contributor.setAttribute('xsi:type', kc.type);
            contribution.appendChild(contributor);

            let addresses = this.createKnartElement('addresses');
            let names = this.createKnartElement('names');
            let contacts = this.createKnartElement('contacts');
            // let affiliations = this.createKnartElement('affiliations');
            contributor.appendChild(addresses);
            contributor.appendChild(names);
            contributor.appendChild(contacts);
            // contributor.appendChild(affiliations);
            for (let ka of kc.addresses) {
                addresses.appendChild(this.createAddress(ka));
            }
            for (let kn of kc.names) {
                names.appendChild(this.createName(kn));
            }
            for (let tmp of kc.contacts) {
                contacts.appendChild(this.createContact(tmp));
            }
            for (let ka of kc.affiliations) {
                contributor.appendChild(this.createAffiliation(ka));
            }
            contributor.appendChild(this.createTagValueElement('name', kc.name));

            contribution.appendChild(this.createTagValueElement('role', kc.role));
        }
        return contributions;
    }

    createTagValueElement(name: string, value: string): Element {
        let e = this.createKnartElement(name);
        e.setAttribute('value', value);
        return e;
    }

    createMetadata(knart: Knart): Element {
        let md = this.createKnartElement('metadata');

        md.appendChild(this.createIdentifiers(knart));
        md.appendChild(this.createDataModels(knart));

        md.appendChild(this.createTagValueElement('artifactType', knart.artifactType));

        let sid = this.createKnartElement('schemaIdentifier');
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
        md.appendChild(this.createContributions(knart));

        return md;
    }

    createExternalData(knart: Knart): Element {
        let root = this.createKnartElement('externalData');
        return root;
    }
    createExpressions(knart: Knart): Element {
        let root = this.createKnartElement('expressions');
        return root;
    }

    createActionGroup(actionGroup: ActionGroup): Element {
        let ag = this.createKnartElement('actionGroup');
        ag.appendChild(this.createTagValueElement('title', actionGroup.title));

        let behaviors = this.createKnartElement('behaviors');
        let subElements = this.createKnartElement('subElements');

        ag.appendChild(behaviors);
        ag.appendChild(subElements);
        return ag;
    }

}
