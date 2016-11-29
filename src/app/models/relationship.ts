export class Relationship {
    public static DERIVED_FROM = new Relationship('DerivedFrom', 'Derived From');
    public static ADAPTED_FROM = new Relationship('AdaptedFrom', 'Adapted From');
    public static ASSOCIATED_RESOURCE = new Relationship('AssociatedResource', 'Associated Resource');
    public static DEPENDS_ON = new Relationship('DependsOn', 'Depends On');
    public static SIMILAR_TO = new Relationship('SimilarTo', 'Similar To');
    public static VERSION_OF = new Relationship('VersionOf', 'Version Of');

    public static ALL: Array<Relationship> = [Relationship.DERIVED_FROM, Relationship.ADAPTED_FROM, Relationship.ASSOCIATED_RESOURCE, Relationship.DEPENDS_ON, Relationship.SIMILAR_TO, Relationship.VERSION_OF];

    constructor(public code: string, public label: string) { }

    static fromCode(code: string): Relationship {
        var s: Relationship;
        for (var n of Relationship.ALL) {
            if (n.code == code) {
                s = n; break;
            }
        }
        return s;
    }
}
