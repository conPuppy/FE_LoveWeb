import {Provider} from "./Provider";
import {Provision} from "./Provision";

export class ProvisionProvider {
    id!: number;
    statusServiceProvider!: number;
    provider!: Provider;
    provision!: Provision;
}