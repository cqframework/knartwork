export class Format {

    constructor(public name: string, public label: string) {

    }
    static HL7CDSKnowledgeArtifact13 = new Format("hl7-cds-knart-1.3", "HL7 CDS Knowledege Artifact r1.3");
    static All = [
        Format.HL7CDSKnowledgeArtifact13
    ]

}
