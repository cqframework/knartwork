// Author: Preston Lee

export class ArtifactType {

    static DOCUMENTATION_TEMPLATE = new ArtifactType('Documentation Template', 'Questionnaire / Documentation Template');
    static LIBRARY = new ArtifactType('Library', 'Library');
    static ORDER_SET = new ArtifactType('Order Set', 'Order Set');
    static RULE = new ArtifactType('Rule', 'Rule');

    public static ALL: Array<ArtifactType> = [ArtifactType.DOCUMENTATION_TEMPLATE, ArtifactType.LIBRARY, ArtifactType.ORDER_SET, ArtifactType.RULE];

    constructor(public code: string, public label: string) { }

    static fromCode(code: string): ArtifactType {
        var t: ArtifactType;
        for (var n of ArtifactType.ALL) {
            if (n.code == code) {
                t = n; break;
            }
        }
        return t!;
    }
}
