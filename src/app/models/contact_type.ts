export class ContactType {

    public static WP = new ContactType('WP', 'Work Phone');

    public static ALL: Array<ContactType> = [ContactType.WP];

    constructor(public code: string, public label: string) { }

    static fromCode(code: string): ContactType {
        var s: ContactType;
        for (var n of ContactType.ALL) {
            if (n.code == code) {
                s = n; break;
            }
        }
        return s;
    }
}
