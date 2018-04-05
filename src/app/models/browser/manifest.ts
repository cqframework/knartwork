import {ManifestItem} from './manifest_item';

export class Manifest {
    name: string;
    description: string;
    content: Array<ManifestItem>;
}