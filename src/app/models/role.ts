export class Role {

    static AUTHOR = new Role('Author', 'Author');
    static EDITOR = new Role('Editor', 'Editor');
    static ENDORSER = new Role('Endorser', 'Endorser');
    static REVIEWER = new Role('Reviewer', 'Reviewer');

    public static ALL: Array<Role> = [Role.AUTHOR, Role.EDITOR, Role.ENDORSER, Role.REVIEWER];

    constructor(public code: string, public label: string) { }

    static fromCode(code: string): Role {
        var s: Role;
        for (var n of Role.ALL) {
            if (n.code == code) {
                s = n; break;
            }
        }
        return s;
    }
}
