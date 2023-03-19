import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountForChange} from 'src/app/model/AccountForChange';
import {CreateProvider} from 'src/app/model/CreateProvider';
import { OrderLover } from 'src/app/model/OrderLover';
import {Provider} from 'src/app/model/Provider';
import {AccountService} from 'src/app/service/account/account.service';
import { OrderLoverService } from 'src/app/service/Order/order-lover.service';
import {ProviderService} from 'src/app/service/provider/provider.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-show-profile',
    templateUrl: './show-profile.component.html',
    styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {
    constructor(private router: Router, private accountService: AccountService, private providerService: ProviderService, private orderLoverService: OrderLoverService) {
    }

    account!: AccountForChange;
    roleString: string = '';
    statusProvider!: number;
    provider!: CreateProvider;


    orderLovers: OrderLover[] = [];

    showCart(id: number, statusOrder: number) {
        this.orderLoverService.getAllBillOfAccountByIdAndStartOrder(id, statusOrder).subscribe((data: OrderLover[]) => {
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

    ngOnInit(): void {
        this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res => {
            if (res != null) {
                this.statusProvider = res.statusProvider;
            }
        })
        this.accountService.findById(this.accountService.getAccountToken().id).subscribe(res => {
            this.account = res;
            for (let i = 0; i < res.roles.length; i++) {
                this.roleString += res.roles[i].name + ","
            }
            this.showCart(this.account.id,1);
        })
    }

    createProvider() {
        const providerCreate = new CreateProvider("", 0, 0, 3, this.account)
        this.providerService.createProvider(providerCreate).subscribe(res => {
            Swal.fire('Done!', 'Sended!', 'success');
            this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res => {
                if (res != null) {
                    this.statusProvider = res.statusProvider;
                }
            })
        })

    }

    logout() {
        localStorage.clear();
        this.router.navigate([''])
    }

    goToMyOrder() {
        this.router.navigate(['/userShowBill'])
    }
    goToMyBill() {
        this.router.navigate(['/providerShowBill']);
    }

    goToProfile() {
        this.router.navigate(['/showProfile'])
    }

    goToEditProfile() {
        this.router.navigate(['/changeInfo'])
    }

    goToProvider() {
        this.router.navigate(['/supplier'])
    }

}
