import { Account } from "./Account";
import { AccountForChange } from "./AccountForChange";

export class Image1{
    url!:String;
    account!:AccountForChange;
    statusImg!:number;

    constructor(url: String, account:AccountForChange, statusImg: number) {
        this.url = url;
        this.account = account;
        this.statusImg = statusImg;
    }
}