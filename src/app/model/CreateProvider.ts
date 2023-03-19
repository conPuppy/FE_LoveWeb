import { AccountForChange } from "./AccountForChange";

export class CreateProvider{
    linkFB!: string;
    price!: number;
    view!: number;
    statusProvider!:number
    account!: AccountForChange;

    constructor(linkFB: string, price: number, view: number, statusProvider: number, account:AccountForChange) {
        this.linkFB = linkFB;
        this.price = price;
        this.view = view;
        this.statusProvider = statusProvider;
        this.account = account;
    }
}