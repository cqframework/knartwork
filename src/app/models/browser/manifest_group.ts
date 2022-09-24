// Author: Preston Lee

import { ManifestItem } from "./manifest_item";

export class ManifestGroup {
    name: string = '';
    description: string = '';
    status: string = '';
	items: Array<ManifestItem> = [];
}
