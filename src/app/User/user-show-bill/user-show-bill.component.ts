import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CreateProvider} from 'src/app/model/CreateProvider';
import {OrderLover} from 'src/app/model/OrderLover';
import {AccountService} from 'src/app/service/account/account.service';
import {OrderLoverService} from 'src/app/service/Order/order-lover.service';
import { ProviderService } from 'src/app/service/provider/provider.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-user-show-bill',
    templateUrl: './user-show-bill.component.html',
    styleUrls: ['./user-show-bill.component.css']
})
export class UserShowBillComponent implements OnInit {

    listBillOfAccount: OrderLover[] = [];

    idAccount: number = -1;

    account: any;
    roleString: string = '';
    statusProvider!: number;
    provider!: CreateProvider;
    orderLovers: OrderLover[] = [];

    showCart(id: number, statusOrder: number) {
        this.orderLoverService.getAllBillOfAccountByIdAndStartOrder(id, statusOrder).subscribe((data: OrderLover[]) => {
            this.orderLovers = data;
        })
    }

    constructor(private orderLoverService: OrderLoverService, private accountService: AccountService, private router: Router,private providerService: ProviderService) {
    }

    ngOnInit(): void {
        this.getAllBillOfAccountById();
        this.accountService.findById(this.accountService.getAccountToken().id).subscribe(res => {
            this.account = res;
            this.showCart(this.account.id, 1);
            this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res => {
                if (res != null) {
                    this.statusProvider = res.statusProvider;
                }
            })
        });
    }
    goToTheHome() {
        if(this.account.gender=="Male") {
            this.router.navigate(["/homeBoy"]);
        } else this.router.navigate(["/homeGirl"]);
    }
    goToProviderSetting() {
        this.router.navigate(["/profileProvider"])
    }
    createProvider() {
        const providerCreate = new CreateProvider("", 0, 0, 3, this.account)
        this.providerService.createProvider(providerCreate).subscribe((res: any) => {
            Swal.fire('Done!', 'Sended!', 'success');
            this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res => {
                if (res != null) {
                    this.statusProvider = res.statusProvider;
                }
            })
        })

    }
    getAllBillOfAccountById() {
        this.idAccount = this.accountService.getAccountToken().id;
        this.orderLoverService.getAllBillOfAccountById(this.idAccount).subscribe((data) => {
            this.listBillOfAccount = data;
            console.log(data);
        })
    }

    changeToCompleted(idOrder: number) {
        this.orderLoverService.changeToCompleted(idOrder).subscribe(() => {
            this.getAllBillOfAccountById();
        })
    }

    getAllBillOfAccountByIdAndStartOrder(idAccount: number, statusOrder: number) {
        this.orderLoverService.getAllBillOfAccountByIdAndStartOrder(idAccount, statusOrder).subscribe((data) => {
            this.listBillOfAccount = data;
        })
    }

    goToMyOrder() {
        this.router.navigate(['/userShowBill'])
    }
    goToMyBill() {
        this.router.navigate(['/providerShowBill'])
    }

    logout() {
        localStorage.clear();
        this.router.navigate([''])
    }

    goToProfile() {
        this.router.navigate(['/showProfile'])
    }

    goToEditProfile() {
        this.router.navigate(['/changeInfo'])
    }
}
