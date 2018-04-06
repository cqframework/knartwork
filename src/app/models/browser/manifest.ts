import {ManifestGroup} from './manifest_group';

export class Manifest {
    name: string;
    description: string;
    groups: Array<ManifestGroup>;
}