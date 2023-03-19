import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Account} from '../model/Account';
import {OrderLover} from '../model/OrderLover';
import {Provider} from '../model/Provider';
import {AccountService} from '../service/account/account.service';
import {ProviderService} from '../service/provider/provider.service';
import * as moment from 'moment';
import {OrderLoverService} from '../service/Order/order-lover.service';
import Swal from 'sweetalert2';
import { ProvisionProviderService } from '../service/provisionprovider/provisionprovider.service';
import { ProvisionProvider } from '../model/ProvisionProvider';
import { CreateProvider } from '../model/CreateProvider';
import { AccountForChange } from '../model/AccountForChange';

@Component({
    selector: 'app-profile-provider',
    templateUrl: './profile-provider.component.html',
    styleUrls: ['./profile-provider.component.css']
})
export class ProfileProviderComponent implements OnInit {
    provider!: Provider;
    orderLover: OrderLover = new OrderLover();
    orderLovers: OrderLover[]=[];
    formOrder!: any;
    account!:Account;
    account1!: AccountForChange;
    startTimeConvert!:String;
    endTimeConvert!:String;
    allServicesOfProvider:ProvisionProvider[]=[];
    statusProvider!: number;

    constructor(private providerService: ProviderService,
                private route: ActivatedRoute,
                private router: Router,
                private accountService: AccountService,
                private orderLoverService: OrderLoverService,
                private provisionProviderService: ProvisionProviderService) {
    }

    ngOnInit() {

        this.accountService.findById(this.accountService.getAccountToken().id).subscribe(res=> {
            this.account = res;
            this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res => {
                if (res != null) {
                    this.statusProvider = res.statusProvider;
                    this.showCart(this.account.id,1);
                }
            })
        })
        this.provisionProviderService.findProvisionProviderByProviderIdStatus1(+this.route.snapshot.params['id']).subscribe(data=>this.allServicesOfProvider=data)
        this.providerService.findProviderById(+this.route.snapshot.params['id']).subscribe(res => this.provider = res)
        this.formOrder = new FormGroup({
            startOrder: new FormControl(),
            selectTime: new FormGroup({
                orderTime: new FormControl(),
            }),
            total: new FormControl()
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
    showCart(id: number, statusOrder: number) {
        this.orderLoverService.getAllBillOfAccountByIdAndStartOrder(id,statusOrder).subscribe(data=> {
            this.orderLovers = data;
        })
    }
    caculatorTotal(){
        this.formOrder.get('total').setValue(this.formOrder.value.selectTime.orderTime * this.provider.price)
    }
    goToMyOrder() {
        this.router.navigate(["/userShowBill"])
    }
    goToMyBill() {
        this.router.navigate(["/providerShowBill"])
    }
    createProvider(){
        const providerCreate= new CreateProvider("",0,0,3,this.account1)
        this.providerService.createProvider(providerCreate).subscribe(res=>{
            Swal.fire('Done!', 'Sended!', 'success');
            this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res=>{
                if (res!=null){
                    this.statusProvider=res.statusProvider;
                }
            })
        })

    }


    createOrderLover() {
        // @ts-ignore
        this.startTimeConvert = document.getElementById('startOrder').value;
        this.orderLover.startOrder = this.startTimeConvert;
        this.orderLover.orderTime = this.formOrder.value.selectTime.orderTime;
        this.orderLover.total = this.formOrder.value.total;
        // @ts-ignore
        this.startTimeConvert = moment(this.startTimeConvert).format('x');
        this.orderLover.endOrder = moment.unix(+this.startTimeConvert + this.orderLover.orderTime * 3600).format(" DD MM YYYY, h:mm A")
        this.orderLover.statusOrder = 2;
        this.orderLover.account = this.account
        this.orderLover.provider = this.provider
        if (this.account.wallet > this.orderLover.total) {
            this.orderLoverService.createOrder(this.orderLover).subscribe((res) => {
                Swal.fire('Done!', 'Sended!', 'success')
                this.router.navigate(["/userShowBill"])
            });
        } else {
            Swal.fire('Your balance is not enough! please refill')
        }
    }

    closeOrderLover() {

        // @ts-ignore
        this.startTimeConvert = document.getElementById('startOrder').value;
        this.orderLover.startOrder = this.startTimeConvert;
        this.orderLover.orderTime = this.formOrder.value.selectTime.orderTime;
        this.orderLover.total = this.formOrder.value.total;
        // @ts-ignore
        this.startTimeConvert = moment(this.startTimeConvert).format('x');
        this.orderLover.endOrder = moment.unix(+this.startTimeConvert + this.orderLover.orderTime * 3600).format(" DD MM YYYY, h:mm A")
        this.orderLover.statusOrder = 1;
        this.orderLover.account = this.account
        this.orderLover.provider = this.provider

        this.orderLoverService.createOrder(this.orderLover).subscribe((res)=> {
        Swal.fire({icon: 'error',
            title: 'Cancel...',
            text: 'See you again',}),
            this.showCart(this.account.id,1);
        });
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
}
