import {Identifier} from './identifier';
import {ModelReference} from './model_reference';
import {Contribution} from './contribution';
import {ActionGroup} from './action_group';
import {ArtifactType} from './artifact_type';


export class Knart {

    // Simple metadata elements
    title: string;
    description: string;
    status: string;
    schemaIdentifier: string;
    artifactType: string;

	static DEFAULT_SCHEMA_IDENTIFIER = 'urn:hl7-org:knowledgeartifact:r1';

    // Complex metadata elements
    identifiers: Array<Identifier> = new Array<Identifier>();
    dataModels: Array<ModelReference> = new Array<ModelReference>();
    contributions: Array<Contribution> = new Array<Contribution>();

    // The meat!
    actionGroup: ActionGroup;

    document: Document;

	artifactTypes(): Array<ArtifactType> {
		return ArtifactType.All;
	}

    loadFromXMLDocument(doc: Document) {
        this.document = doc;
        let k = new Knart;
        var result = doc.evaluate("/k:knowledgeDocument", doc, Knart.namespaces, XPathResult.ANY_TYPE, null);
        var kd: Node = result.iterateNext();
        console.log(kd);

        this.title = doc.evaluate("string(./k:metadata/k:title/@value)", kd, Knart.namespaces, XPathResult.ANY_TYPE, null).stringValue;
        this.description = doc.evaluate("string(./k:metadata/k:description/@value)", kd, Knart.namespaces, XPathResult.ANY_TYPE, null).stringValue;
        let typeString = doc.evaluate("string(./k:metadata/k:artifactType/@value)", kd, Knart.namespaces, XPathResult.ANY_TYPE, null).stringValue;
		// this.artifactType = ArtifactType.fromString(typeString).value || ArtifactType.DocumentationTemplate.value;
		this.artifactType = ArtifactType.fromString(typeString).value || ArtifactType.DocumentationTemplate.value;

        // title.attributes.
        console.log(this.title);
		console.log("Loaded KNART!");
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
