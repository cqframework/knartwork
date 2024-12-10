// Author: Preston Lee

export class ManifestItem {
    name: string = '';
    mimeType: string = '';
    tags: string[] = [];
    path: string = '';
    url: string = '';

    // FIXME what are these for???
    group: string = '';
    status: string = '';

	// Audit results
    audit: string = '';
    
    public static AUDIT_AVAILABLE: string = 'available';
    public static AUDIT_UNAVAILABLE: string = 'unavailable';
}
