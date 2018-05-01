import { ManifestGroup } from "./manifest_group";

export class Manifest {
	name: string;
	description: string;
	groups: Array<ManifestGroup>;

	mimeTypes: Map<String, Array<Object>>;
	tags: Map<String, Array<Object>>;

	public repackage() {
		this.repackageByMimeType();
		this.repackageByTag();
	}

	public repackageByMimeType() {
		this.mimeTypes = new Map<String, Array<Object>>();
		this.groups.forEach(g => {
			if(g.items) {
				g.items.forEach(i => {
					if (this.mimeTypes.get(i.mimeType) == null) {
						this.mimeTypes.set(i.mimeType, []);
					}
					let summary = {
						name: i.name,
						path: i.path,
						tags: i.tags || [],
						url: i.url,
						group: g.name,
						status: g.status
					}
					this.mimeTypes.get(i.mimeType).push(summary);
				});
			}
		});
	}

	public repackageByTag() {
		this.tags = new Map<String, Array<Object>>();
		this.groups.forEach(g => {
			if(g.items) {
				g.items.forEach(i => {
					if(i.tags) {
						i.tags.forEach(t => {
							if (this.tags.get(t) == null) {
								this.tags.set(t, []);
							}
							let summary = {
								name: i.name,
								path: i.path,
								mimeType: i.mimeType,
								url: i.url,
								group: g.name,
								status: g.status
							}
							this.tags.get(t).push(summary);
						})
					}
				});
			}
		});
	}
}
