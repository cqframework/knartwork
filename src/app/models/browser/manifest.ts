// Author: Preston Lee

import { ManifestGroup } from "./manifest_group";
import { ManifestItem } from "./manifest_item";

export class Manifest {
	name: string = '';
	description: string = '';
	groups: Array<ManifestGroup> = [];

	mimeTypes: Map<string, Array<ManifestItem>> = new Map<string, Array<ManifestItem>>();
	tags: Map<string, Array<ManifestItem>> = new Map<string, Array<ManifestItem>>();

	public repackage() {
		this.repackageByMimeType();
		this.repackageByTag();
	}

	public repackageByMimeType() {
		this.mimeTypes = new Map<string, Array<ManifestItem>>();
		this.groups.forEach(g => {
			if (g.items) {
				g.items.forEach(i => {
					if (this.mimeTypes.get(i.mimeType) == null) {
						this.mimeTypes.set(i.mimeType, []);
					}
					let summary: ManifestItem = {
						name: i.name,
						path: i.path,
						tags: i.tags || [],
						url: i.url,
						group: g.name,
						status: g.status,
						mimeType: i.mimeType,
						audit: ''
					}
					this.mimeTypes.get(i.mimeType)?.push(summary);
				});
			}
		});
	}

	public repackageByTag() {
		this.tags = new Map<string, Array<ManifestItem>>();
		this.groups.forEach(g => {
			if (g.items) {
				g.items.forEach(i => {
					if (i.tags) {
						i.tags.forEach(t => {
							if (this.tags.get(t) == null) {
								this.tags.set(t, []);
							}
							let summary: ManifestItem = {
								name: i.name,
								path: i.path,
								mimeType: i.mimeType,
								tags: i.tags || [],
								url: i.url,
								group: g.name,
								status: g.status, 
								audit: ''
							}
							this.tags.get(t)?.push(summary);
						})
					}
				});
			}
		});
	}
}
