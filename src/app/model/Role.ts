import {Account} from "./Account";

export interface Role {
    id: number;
    role: string;
    accounts?: Account[];
}