import {Injectable} from '@angular/core';
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
import {Address} from '../models/address';
import {Name} from '../models/name';
import {Contact} from '../models/contact';
import {Role} from '../models/role';
import {Affiliation} from '../models/affiliation';


@Injectable()
export class XmlLoaderService {

    knart: Knart;
    private serializer: XMLSerializer = new XMLSerializer();

    constructor(private http: Http) {
        console.log("HomeComponent has been initialized.");
    }
    loadXMLFromURL(url: string): Observable<Response> {
        return this.http.get(url); //.map(res => res.responseText);
    }

    getString(query: string, base: Node): string {
        return this.knart.document.evaluate(query, base, Knart.namespaces, XPathResult.ANY_TYPE, null).stringValue;
    }


    getOrdered(query: string, base: Node): XPathResult {
        return this.knart.document.evaluate(query, base, Knart.namespaces, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    }

    loadFromXMLDocument(doc: Document): Knart {
        this.knart = new Knart();
        this.knart.document = doc;
        var result = doc.evaluate("/k:knowledgeDocument", doc, Knart.namespaces, XPathResult.ANY_TYPE, null);
        var kd: Node = result.iterateNext();
        // console.log(kd);

        this.knart.title = this.getString("string(./k:metadata/k:title/@value)", kd);
        this.knart.description = this.getString("string(./k:metadata/k:description/@value)", kd);
        this.knart.schemaIdentifier = this.getString("string(./k:metadata/k:schemaIdentifier/@root)", kd);

        let statusString = this.getString("string(./k:metadata/k:status/@value)", kd);
        this.knart.status = Status.fromCode(statusString).code || Status.IN_TEST.code;

        let typeString = this.getString("string(./k:metadata/k:artifactType/@value)", kd);
        this.knart.artifactType = ArtifactType.fromCode(typeString).code || ArtifactType.DOCUMENTATION_TEMPLATE.code;

        this.loadRelatedResources(kd);
        this.loadSupportingEvidence(kd);
        this.loadCoverages(kd);
        this.loadContributions(kd);
        this.loadModelReferences(kd);
        this.loadExternalData(kd);
        this.loadExpressions(kd);
        this.loadConditions(kd);

        // title.attributes.
        console.log(this.knart.title);
        console.log("Loaded KNART!");
        return this.knart;
    }


    loadRelatedResources(kd: Node) {
        let relatedResources = this.getOrdered("./k:metadata/k:relatedResources/k:relatedResource", kd);
        var rrNode: Node;
        while (rrNode = relatedResources.iterateNext()) {
            let rr = new RelatedResource();
            rr.relationship = this.getString('string(./k:relationship/@value)', rrNode);
            let resources = this.getOrdered('./k:resources/k:resource', rrNode);
            var rNode: Node;
            while (rNode = resources.iterateNext()) {
                let resource = new Resource();
                resource.title = this.getString('string(./k:title/@value)', rNode);
                resource.location = this.getString('string(./k:location/@value)', rNode);
                resource.description = this.getString('string(./k:description/@value)', rNode);
                rr.resources.push(resource);
            }
            // console.log("RR: " + rr);
            this.knart.relatedResources.push(rr);
        }
    }


    loadSupportingEvidence(kd: Node) {
        let supportingEvidence = this.getOrdered("./k:metadata/k:supportingEvidence//k:citation/@value", kd);
        var node: Node;
        while (node = supportingEvidence.iterateNext()) {
            let se = new SupportingEvidence();
            se.citation = node.nodeValue;
            this.knart.supportingEvidence.push(se);
        }
    }

    loadCoverages(kd: Node) {
        let coverages = this.getOrdered("./k:metadata/k:applicability/k:coverage", kd);
        var node: Node;
        while (node = coverages.iterateNext()) {
            let coverage = new Coverage();
            coverage.focus = this.getString('string(./k:focus/@value)', node);
            coverage.description = this.getString('string(./k:description/@value)', node);
            coverage.value.code = this.getString('string(./k:value/@code)', node);
            coverage.value.codeSystem = this.getString('string(./k:value/@codeSystem)', node);
            coverage.value.codeSystemName = this.getString('string(./k:value/@codeSystemName)', node);
            coverage.value.displayName = this.getString('string(./k:value/dt:displayName/@value)', node);
            this.knart.coverages.push(coverage);
        }
        console.log("Loaded " + this.knart.coverages.length + " coverages.");
    }

    loadModelReferences(kd: Node) {
        let modelReferences = this.getOrdered("./k:metadata/k:dataModels/k:modelReference", kd);
        var node: Node;
        while (node = modelReferences.iterateNext()) {
            let mr = new ModelReference();
            mr.description = this.getString('string(./k:description/@value)', node);
            mr.referencedModel = this.getString('string(./k:referencedModel/@value)', node);
            this.knart.modelReferences.push(mr);
        }
    }

    loadExternalData(kd: Node) {
        let externalDataDefs = this.getOrdered("./k:externalData/k:def", kd);
        var node: Node;
        while (node = externalDataDefs.iterateNext()) {
            let ed = new ExternalData();
            ed.name = this.getString('string(./@name)', node);
            ed.content = this.serializer.serializeToString((node as any).children[0]);
            this.knart.externalData.push(ed);
        }
    }

    loadExpressions(kd: Node) {
        let expressionDefs = this.getOrdered("./k:expressions/k:def", kd);
        var node: Node;
        while (node = expressionDefs.iterateNext()) {
            let e = new Expression();
            e.name = this.getString('string(./@name)', node);
            e.logic = this.serializer.serializeToString((node as any).children[0]);
            this.knart.expressions.push(e);
        }
    }

    loadConditions(kd: Node) {
        let conditionsNode = this.getOrdered("./k:conditions/k:condition", kd);
        var node: Node;
        while (node = conditionsNode.iterateNext()) {
            let condition = new Condition();
            condition.role = this.getString('string(./k:conditionRole/@value)', node);
            let logicNode: Node = this.getOrdered('./k:logic', node).iterateNext();
            condition.logic = this.serializer.serializeToString(logicNode);
            this.knart.conditions.push(condition);
        }
    }

    loadContributions(kd: Node) {
        let contributionsResult = this.getOrdered("./k:metadata/k:contributions/k:contribution", kd);
        var contributionNode: Node;
        while (contributionNode = contributionsResult.iterateNext()) {
            let contribution = new Contribution();
            contribution.type = this.getString('string(./k:contributor/@xsi:type)', contributionNode);
            contribution.role = this.getString('string(./k:role/@value)', contributionNode);

            let contactsResult = this.getOrdered('.//k:contacts/k:contact', contributionNode);
            var contactNode: Node;
            while (contactNode = contactsResult.iterateNext()) {
                let contact = new Contact();
                contact.use = this.getString('string(./@use)', contactNode);
                contact.value = this.getString('string(./@value)', contactNode);
                contribution.contacts.push(contact);
            }

            let affiliationsResult = this.getOrdered('.//k:affiliation', contributionNode);
            var affiliationNode: Node;
            while (affiliationNode = affiliationsResult.iterateNext()) {
                let affiliation = new Affiliation();
                affiliation.name = this.getString('string(./k:name/@value)', affiliationNode);
                contribution.affiliations.push(affiliation);
            }

            let namesResult = this.getOrdered('.//k:name', contributionNode);
            var nameNode: Node;
            while (nameNode = namesResult.iterateNext()) {
                let name = new Name();
                name.given = this.getString('string(./dt:part[@type="GIV"]/@value)', nameNode);
                name.family = this.getString('string(./dt:part[@type="FAM"]/@value)', nameNode);
                contribution.names.push(name);
            }

            let addressesResult = this.getOrdered('.//k:address', contributionNode);
            var addressNode: Node;
            while (addressNode = addressesResult.iterateNext()) {
                let address = new Address();
                address.street = this.getString('string(./dt:part[@type="SAL"]/@value)', addressNode);
                address.city = this.getString('string(./dt:part[@type="CTY"]/@value)', addressNode);
                address.state = this.getString('string(./dt:part[@type="STA"]/@value)', addressNode);
                address.zip = this.getString('string(./dt:part[@type="ZIP"]/@value)', addressNode);
                address.country = this.getString('string(./dt:part[@type="CNT"]/@value)', addressNode);
                contribution.addresses.push(address);
            }

            this.knart.contributions.push(contribution);
        }
    }
}
