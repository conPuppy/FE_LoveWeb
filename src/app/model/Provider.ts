import { Account } from "./Account";

export class Provider{
    id!: number;
    linkFB!: string;
    price!: number;
    view!: number;
    statusProvider!:number
    account!: Account
}