import {Identifier} from './identifier';
import {ModelReference} from './model_reference';
import {Contribution} from './contribution';
import {ActionGroup} from './actions/action_group';
import {ArtifactType} from './artifact_type';
import {Format} from './format';
import {Status} from './status';
import {RelatedResource} from './related_resource';
import {SupportingEvidence} from './supporting_evidence';
import {ExternalData} from './external_data';
import {Coverage} from './coverage';
import {Condition} from './condition';
import {Expression} from './expression';

export class Knart {

    // Simple metadata elements
    title: string;
    description: string;
    schemaIdentifier: string;
    status: string = Status.DRAFT.code; // Reasonable default
    artifactType: string = ArtifactType.DOCUMENTATION_TEMPLATE.code; // Reasonable default

    static DEFAULT_SCHEMA_IDENTIFIER = 'urn:hl7-org:knowledgeartifact:r1';

    // Complex metadata elements
    identifiers: Array<Identifier> = new Array<Identifier>();
    modelReferences: Array<ModelReference> = new Array<ModelReference>();
    contributions: Array<Contribution> = new Array<Contribution>();
    relatedResources: Array<RelatedResource> = new Array<RelatedResource>();
    supportingEvidence: Array<SupportingEvidence> = new Array<SupportingEvidence>();
    externalData: Array<ExternalData> = new Array<ExternalData>();
    coverages: Array<Coverage> = new Array<Coverage>();
    conditions: Array<Condition> = new Array<Condition>();
    expressions: Array<Expression> = new Array<Expression>();

    // The meat!
    actionGroup: ActionGroup = new ActionGroup();

    document: Document;

    artifactTypes(): Array<ArtifactType> {
        return ArtifactType.ALL;
    }

    statuses(): Array<Status> {
        return Status.ALL;
    }

    static namespaces: XPathNSResolver = <any>function nsResolver(prefix) {
        var ns = {
            'k': 'urn:hl7-org:knowledgeartifact:r1',
            'vmr': 'urn:hl7-org:vmr:r2',
            'dt': 'urn:hl7-org:cdsdt:r2',
            'elm': 'urn:hl7-org:elm:r1',
            't': 'urn:hl7-org:elm-types:r1',
            'a': 'urn:hl7-org:cql-annotations:r1',
            'xml': 'http://www.w3.org/XML/1998/namespace',
            'xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            'xhtml': 'http://www.w3.org/1999/xhtml'
        };
        return ns[prefix] || null;
    };
}
