import {Component, OnInit} from '@angular/core';
import {ProvisionProvider} from "../model/ProvisionProvider";
import {AccountService} from "../service/account/account.service";
import {Router} from "@angular/router";
import {ProviderService} from "../service/provider/provider.service";
import {ProvisionProviderService} from "../service/provisionprovider/provisionprovider.service";
import {Provider} from '../model/Provider';
import {Account} from '../model/Account';
import {OrderLover} from '../model/OrderLover';
import {CreateProvider} from '../model/CreateProvider';
import { OrderLoverService } from '../service/Order/order-lover.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-showtopview',
    templateUrl: './showtopview.component.html',
    styleUrls: ['./showtopview.component.css']
})
export class ShowtopviewComponent implements OnInit {
    providers: Provider[] = [];
    provider = new Provider;
    provisionproviders: ProvisionProvider[] = [];
    page: number = 1;
    total: number = 0;

    constructor(private accountService: AccountService, private router: Router, private providerService: ProviderService,
                private provisionproviderService: ProvisionProviderService, private orderLoverService: OrderLoverService) {
    }


    ngOnInit(): void {
        this.providerService.getProviderTopView().subscribe(data => {
            this.providers = data;
            this.provisionproviderService.getAllProvisionProvider().subscribe(data => {
                this.provisionproviders = data;
                this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res => {
                    if (res != null) {
                        this.statusProvider = res.statusProvider;
                        this.showCart(this.accountService.getAccountToken().id, 1);
                    }
                })
            })
        })
    }

    findProviderById(id: number) {
        this.providerService.findProviderById(id).subscribe(data => {
            console.log(data)
            this.provider = data;
        })
    }

    increaseViewProviderById(id: number) {
        this.providerService.increaseViewProviderById(id).subscribe(data => {
            this.provider = data;
            this.ngOnInit();
        })
    }

    account: any;
    statusProvider!: number;
    provider1!: CreateProvider;


    orderLovers: OrderLover[] = [];

    showCart(id: number, statusOrder: number) {
        this.orderLoverService.getAllBillOfAccountByIdAndStartOrder(id, statusOrder).subscribe(data => {
            this.orderLovers = data;
        })
    }

    logout() {
        localStorage.clear();
        this.router.navigate([''])
    };

    goToProfile() {
        this.router.navigate(['/showProfile'])
    };

    goToEditProfile() {
        this.router.navigate(['/changeInfo'])
    }

    goToProvider() {
        this.router.navigate(['/supplier'])
    };
    goToMyOrder() {
        this.router.navigate(["/userShowBill"])
    }
    createProvider(){
        const providerCreate= new CreateProvider("",0,0,3,this.account)
        this.providerService.createProvider(providerCreate).subscribe(res=>{
            Swal.fire('Done!', 'Sended!', 'success');
            this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res=>{
                if (res!=null){
                    this.statusProvider=res.statusProvider;
                }
            })
        })

    }
}
