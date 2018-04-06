import { ManifestItem } from "./manifest_item";

export class ManifestGroup {
    name: string;
    status: string;
	items: Array<ManifestItem>;
}
