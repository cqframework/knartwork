// Author: Preston Lee

export class Status {

    static DRAFT = new Status('Draft', 'Draft');
    static IN_TEST = new Status('InTest', 'In Test');
    static ACTIVE = new Status('Active', 'Active');
    static INACTIVE = new Status('Inactive', 'Inactive');

    public static ALL: Array<Status> = [Status.DRAFT, Status.IN_TEST, Status.ACTIVE, Status.INACTIVE];

    constructor(public code: string, public label: string) { }

    static fromCode(code: string): Status {
        var s: Status;
        for (var n of Status.ALL) {
            if (n.code == code) {
                s = n; break;
            }
        }
        return s!;
    }
}
