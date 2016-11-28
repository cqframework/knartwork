export class ArtifactType {

    static DocumentationTemplate = new ArtifactType("Documentation Template");
    static Library = new ArtifactType("Library");
    static OrderSet = new ArtifactType("Order Set");
    static Rule = new ArtifactType("Rule");

    public static All: Array<ArtifactType> = [ArtifactType.DocumentationTemplate, ArtifactType.Library, ArtifactType.OrderSet, ArtifactType.Rule];

    constructor(public value: string) { }

    static fromString(s: string): ArtifactType {
        var t: ArtifactType;
        for (var n of ArtifactType.All) {
            if (n.value == s) {
                t = n; break;
            }
        }
        return t;
    }
}
