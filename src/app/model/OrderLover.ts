
import { Account } from "./Account";
import { Provider } from "./Provider";

export class OrderLover{
    id!:number;

    statusOrder!: number;
    orderTime!: number;
    total!: number;
    dateOfOrder!: String;
    startOrder!: String
    account!: Account;
    endOrder!: String
    provider!: Provider;

}