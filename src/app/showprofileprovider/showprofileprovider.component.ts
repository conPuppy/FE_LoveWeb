import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {CreateProvider} from '../model/CreateProvider';
import { OrderLover } from '../model/OrderLover';
import {AccountService} from '../service/account/account.service';
import {OrderLoverService} from '../service/Order/order-lover.service';
import {ProviderService} from '../service/provider/provider.service';
import {ProvisionProviderService} from '../service/provisionprovider/provisionprovider.service';

@Component({
    selector: 'app-showprofileprovider',
    templateUrl: './showprofileprovider.component.html',
    styleUrls: ['./showprofileprovider.component.css']
})
export class ShowprofileproviderComponent implements OnInit {
    account: any;
    statusProvider!: number;
    provider1!: CreateProvider;

    constructor(private accountService: AccountService, private router: Router, private providerService: ProviderService,
                private provisionproviderService: ProvisionProviderService, private orderLoverService: OrderLoverService) {
    }

    ngOnInit(): void {
        this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res => {
            if (res != null) {
                this.statusProvider = res.statusProvider;
                this.showCart(this.accountService.getAccountToken().id,1);
            }
        })
    }
    orderLovers: OrderLover[]=[];
    showCart(id: number, statusOrder: number) {
        this.orderLoverService.getAllBillOfAccountByIdAndStartOrder(id,statusOrder).subscribe(data=> {
            this.orderLovers = data;
        })
    }
    goToTheHome() {
        if(this.account.gender=="Male") {
            this.router.navigate(["/homeBoy"]);
        } else this.router.navigate(["/homeGirl"]);
    }
    goToProviderSetting() {
        this.router.navigate(["/profileProvider"])
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
    goToMyBill() {
        this.router.navigate(["/providerShowBill"])
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
