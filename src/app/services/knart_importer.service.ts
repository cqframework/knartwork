// Author: Preston Lee

import {Injectable} from '@angular/core';
// import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import {Knart} from '../models/knart';
import {Identifier} from '../models/identifier';
import {ModelReference} from '../models/model_reference';
import {Contribution} from '../models/contribution';
import {ActionGroup} from '../models/actions/action_group';
import {ArtifactType} from '../models/artifact_type';
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
import {Affiliation} from '../models/affiliation';

import {Action} from '../models/actions/action';
import {CollectInformationAction} from '../models/actions/collect_information_action';
import {DeclareResponseAction} from '../models/actions/declare_response_action';
import {CreateAction} from '../models/actions/create_action';
import {ResponseItem} from '../models/actions/response_item';
import {Value} from '../models/value';
import {LifeCycleEvent} from '../models/life_cycle_event';
import { XmlImporterService } from './xml_importer.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class KnartImporterService extends XmlImporterService {

    knart: Knart = new Knart();
    private serializer: XMLSerializer = new XMLSerializer();

    constructor(private http: HttpClient) {
        super();
    }

    loadXMLFromURL(url: string): Observable<Response> {
        return this.http.get<Response>(url); //.map(res => res.responseText);
    }

    getString(query: string, base: Node): string {
        return this.knart.document!.evaluate(query, base, Knart.namespaces, XPathResult.ANY_TYPE, null).stringValue;
    }


    getOrdered(query: string, base: Node): XPathResult {
        return this.knart.document!.evaluate(query, base, Knart.namespaces, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    }

    loadFromXMLDocument(doc: Document): Knart {
        this.knart = new Knart();
        this.knart.document = doc;
        var result = doc.evaluate("/k:knowledgeDocument", doc, Knart.namespaces, XPathResult.ANY_TYPE, null);
        var kd: Node = result.iterateNext()!;
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
        this.loadLifeCycleEvents(kd);
        this.loadModelReferences(kd);
        this.loadExternalData(kd);
        this.loadExpressions(kd);
        this.loadConditions(kd);
        this.loadIdentifiers(kd);

        var actionGroup = doc.evaluate("./k:actionGroup", kd, Knart.namespaces, XPathResult.ANY_TYPE, null).iterateNext();
        this.knart.actionGroup = this.loadActionGroup(actionGroup!);

        console.log(this.knart.title);
        console.log("Loaded KNART!");
        return this.knart;
    }

    loadActionGroup(agNode: Node): ActionGroup {
        let ag = new ActionGroup();
        ag.title = this.getString('string(./k:title/@value)', agNode);
        let subElementNodes = this.getOrdered('./k:subElements/k:*', agNode);
        let subElementNode: Node;
        while (subElementNode = subElementNodes.iterateNext()!) {
            let type: string = (subElementNode as any).nodeName;
            switch (type) {
                case 'actionGroup':
                    ag.subElements.push(this.loadActionGroup(subElementNode));
                    break;
                case 'simpleAction':
                    ag.subElements.push(this.loadSimpleAction(subElementNode));
                    break;
                default:
                    console.log("Unsupported subElement: " + type);
            }
        }
        return ag;
    }

    loadSimpleAction(saNode: Node): Action {
        let type: string = this.getString('string(./@xsi:type)', saNode);
        var action: Action;
        switch (type) {
            case 'CollectInformationAction':
                action = this.loadCollectInformationAction(saNode);
                break;
            case 'CreateAction':
                action = this.loadCreateAction(saNode);
                break;
            case 'DeclareResponseAction':
                action = this.loadDeclareResponseAction(saNode);
                break;
            default:
                console.log("Unsupported simpleAction type: " + type);
        }
        return action!;
    }

    loadCollectInformationAction(ciaNode: Node): CollectInformationAction {
        let action = new CollectInformationAction();

        let dcNode = this.getOrdered('./k:documentationConcept', ciaNode).iterateNext()!;
        action.prompt = this.getString('string(./k:prompt/@value)', dcNode);
        action.responseDataType = this.getString('string(./k:responseDataType/@value)', dcNode);
        action.responseCardinality = this.getString('string(./k:responseCardinality/@value)', dcNode);
        action.constraintType = this.getString('string(./k:responseRange/k:constraintType/@value)', dcNode);
        action.responseRangeType = this.getString('string(./k:responseRange/@xsi:range)', dcNode);
        action.textEquivalent = this.getString('string(./k:textEquivalent/@value)', dcNode);
        action.responseBinding = this.getString('string(./k:responseBinding/@property)', ciaNode);

        action.initialValueType = this.getString('string(./k:initialValue/@xsi:type)', ciaNode);
        action.initialValue = this.serializeChildNodesToString('./k:initialValue/*', ciaNode);

        // Question codes
        let itemCodeNodes = this.getOrdered('./k:itemCodes/k:itemCode', dcNode);
        var itemCodeNode: Node;
        while (itemCodeNode = itemCodeNodes.iterateNext()!) {
            let ic = new Value();
            ic.code = this.getString('string(./@code)', itemCodeNode);
            ic.codeSystem = this.getString('string(./@codeSystem)', itemCodeNode);
            ic.codeSystemName = this.getString('string(./@codeSystemName)', itemCodeNode);
            action.itemCodes.push(ic);
        }

        // Responses
        let itemNodes = this.getOrdered('./k:responseRange/k:item', dcNode);
        var itemNode: Node;
        while (itemNode = itemNodes.iterateNext()!) {
            let item = new ResponseItem();
            item.type = this.getString('string(./k:value/@xsi:type)', itemNode);
            item.valueType = this.getString('string(./k:value/@valueType)', itemNode);
            item.value = this.getString('string(./k:value/@value)', itemNode);
            item.displayText = this.getString('string(./k:displayText/@value)', itemNode);
            action.responseItems.push(item);


            let codeNodes = this.getOrdered('./k:codes/k:code', itemNode);
            var codeNode: Node;
            while (codeNode = codeNodes.iterateNext()!) {
                let code = new Value();
                code.code = this.getString('string(./@code)', codeNode);
                code.codeSystem = this.getString('string(./@codeSystem)', codeNode);
                code.codeSystemName = this.getString('string(./@codeSystemName)', codeNode);
                item.itemCodes.push(code);
            }
        }
        console.log("Loaded CollectInformationAction");
        return action;
    }

    serializeChildNodesToString(query: string, base: Node): string {
        let children = this.getOrdered(query, base);
        let childNode: Node;
        let tmp = '';
        while (childNode = children.iterateNext()!) {
            tmp += this.serializer.serializeToString(childNode) + "\n";
        }
        return tmp;
    }

    loadCreateAction(caNode: Node): CreateAction {
        let action = new CreateAction();
        action.sentenceType = this.getString('string(./k:actionSentence/@xsi:type)', caNode);
        action.sentenceClassType = this.getString('string(./k:actionSentence/@classType)', caNode);
        action.textEquivalent = this.getString('string(./k:textEquivalent/@value)', caNode);
        action.sentence = this.serializeChildNodesToString('./k:actionSentence/*', caNode);
        console.log("Loaded CreateAction");
        return action;
    }

    loadDeclareResponseAction(draNode: Node): DeclareResponseAction {
        let action = new DeclareResponseAction();
        action.name = this.getString('string(./@name)', draNode);
        console.log("Loaded DeclareResponseAction");
        return action;
    }

    loadRelatedResources(kd: Node) {
        let relatedResources = this.getOrdered("./k:metadata/k:relatedResources/k:relatedResource", kd);
        var rrNode: Node;
        while (rrNode = relatedResources.iterateNext()!) {
            let rr = new RelatedResource();
            rr.relationship = this.getString('string(./k:relationship/@value)', rrNode);
            let resources = this.getOrdered('./k:resources/k:resource', rrNode);
            var rNode: Node;
            while (rNode = resources.iterateNext()!) {
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
        while (node = supportingEvidence.iterateNext()!) {
            let se = new SupportingEvidence();
            se.citation = node.nodeValue!;
            this.knart.supportingEvidence.push(se);
        }
    }

    loadIdentifiers(kd: Node) {
        let identifiers = this.getOrdered("./k:metadata/k:identifiers/k:identifier", kd);
        var node: Node;
        while (node = identifiers.iterateNext()!) {
            let i = new Identifier();
            i.root = this.getString('string(./@root)', node);
            i.version = this.getString('string(./@version)', node);
            i.extension = this.getString('string(./@extension)', node);
            this.knart.identifiers.push(i);
        }
    }

    loadCoverages(kd: Node) {
        let coverages = this.getOrdered("./k:metadata/k:applicability/k:coverage", kd);
        var node: Node;
        while (node = coverages.iterateNext()!) {
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
        while (node = modelReferences.iterateNext()!) {
            let mr = new ModelReference();
            mr.description = this.getString('string(./k:description/@value)', node);
            mr.referencedModel = this.getString('string(./k:referencedModel/@value)', node);
            this.knart.modelReferences.push(mr);
        }
    }

    loadExternalData(kd: Node) {
        let externalDataDefs = this.getOrdered("./k:externalData/k:def", kd);
        var node: Node;
        while (node = externalDataDefs.iterateNext()!) {
            let ed = new ExternalData();
            ed.name = this.getString('string(./@name)', node);
            ed.content = this.serializer.serializeToString((node as any).children[0]);
            this.knart.externalData.push(ed);
        }
    }

    loadLifeCycleEvents(kd: Node) {
        let artifactLifeCycleEvents = this.getOrdered("./k:metadata/k:eventHistory/k:artifactLifeCycleEvent", kd);
        var node: Node;
        while (node = artifactLifeCycleEvents.iterateNext()!) {
            let e = new LifeCycleEvent();
            e.type = this.getString('string(./k:eventType/@value)', node);
            e.datetime = this.getString('string(./k:eventDateTime/@value)', node);
            this.knart.lifeCycleEvents.push(e);
        }
    }

    loadExpressions(kd: Node) {
        let expressionDefs = this.getOrdered("./k:expressions/k:def", kd);
        var node: Node;
        while (node = expressionDefs.iterateNext()!) {
            let e = new Expression();
            e.name = this.getString('string(./@name)', node);
            e.logic = this.serializer.serializeToString((node as any).children[0]);
            this.knart.expressions.push(e);
        }
    }

    loadConditions(kd: Node) {
        let conditionsNode = this.getOrdered("./k:conditions/k:condition", kd);
        var node: Node;
        while (node = conditionsNode.iterateNext()!) {
            let condition = new Condition();
            condition.role = this.getString('string(./k:conditionRole/@value)', node);
            let logicNode: Node = this.getOrdered('./k:logic', node).iterateNext()!;
            condition.logic = this.serializer.serializeToString(logicNode);
            this.knart.conditions.push(condition);
        }
    }

    loadContributions(kd: Node) {
        let contributionsResult = this.getOrdered("./k:metadata/k:contributions/k:contribution", kd);
        var contributionNode: Node;
        while (contributionNode = contributionsResult.iterateNext()!) {
            let contribution = new Contribution();
            contribution.type = this.getString('string(./k:contributor/@xsi:type)', contributionNode);
            contribution.role = this.getString('string(./k:role/@value)', contributionNode);

            let contactsResult = this.getOrdered('.//k:contacts/k:contact', contributionNode);
            var contactNode: Node;
            while (contactNode = contactsResult.iterateNext()!) {
                let contact = new Contact();
                contact.use = this.getString('string(./@use)', contactNode);
                contact.value = this.getString('string(./@value)', contactNode);
                contribution.contacts.push(contact);
            }

            let affiliationsResult = this.getOrdered('.//k:affiliation', contributionNode);
            var affiliationNode: Node;
            while (affiliationNode = affiliationsResult.iterateNext()!) {
                let affiliation = new Affiliation();
                affiliation.name = this.getString('string(./k:name/@value)', affiliationNode);
                contribution.affiliations.push(affiliation);
            }

            let namesResult = this.getOrdered('.//k:name', contributionNode);
            var nameNode: Node;
            while (nameNode = namesResult.iterateNext()!) {
                let name = new Name();
                name.given = this.getString('string(./dt:part[@type="GIV"]/@value)', nameNode);
                name.family = this.getString('string(./dt:part[@type="FAM"]/@value)', nameNode);
                contribution.names.push(name);
            }

            let addressesResult = this.getOrdered('.//k:address', contributionNode);
            var addressNode: Node;
            while (addressNode = addressesResult.iterateNext()!) {
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
