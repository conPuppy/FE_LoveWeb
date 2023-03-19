import { Component, OnInit } from '@angular/core';
import { OrderLover } from 'src/app/model/OrderLover';
import { Provider } from 'src/app/model/Provider';
import { AccountService } from 'src/app/service/account/account.service';
import { ProviderService } from 'src/app/service/provider/provider.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderLoverService } from 'src/app/service/Order/order-lover.service';
import { CreateProvider } from 'src/app/model/CreateProvider';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-show-bill',
  templateUrl: './provider-show-bill.component.html',
  styleUrls: ['./provider-show-bill.component.css']
})
export class ProviderShowBillComponent implements OnInit{

  listBillOfProvider: OrderLover[] = [];

  usernameAccount!: string;
  
  provider: Provider | any;
  
  account: any;
  statusProvider!: number;
  provider1!: CreateProvider;


  orderLovers: OrderLover[] = [];

  showCart(id: number, statusOrder: number) {
    this.orderLoverService.getAllBillOfAccountByIdAndStartOrder(id, statusOrder).subscribe(data => {
      this.orderLovers = data;
    })
  }

  constructor(private providerService: ProviderService, private accountService: AccountService, private orderLoverService: OrderLoverService, private router: Router) {
  }
    ngOnInit(): void {
    this.findProviderByAccountUsername();
      this.accountService.findById(this.accountService.getAccountToken().id).subscribe(res=> {
        this.account = res;
        this.showCart(this.account.id,1);
      })
      this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res => {
        if (res != null) {
          this.statusProvider = res.statusProvider;
          
        }
      })
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
  logout() {
    localStorage.clear();
    this.router.navigate([''])
  };
  goToTheHome() {
    if(this.account.gender=="Male") {
      this.router.navigate(["/homeBoy"]);
    } else this.router.navigate(["/homeGirl"]);
  }

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
  goToProviderSetting() {
    this.router.navigate(["/profileProvider"])
  }
  

  getBillByIdProvider(idProvider: number) {
    this.providerService.getBillByIdProvider(idProvider).subscribe((data) => {
      this.listBillOfProvider = data;
      console.log(data);
    })
  }

  findProviderByAccountUsername() {
    this.usernameAccount = this.accountService.getAccountToken().username;
    this.providerService.findProviderByAccountUsername(this.usernameAccount).subscribe((data) => {
      this.provider = data;
      console.log(data);
      this.getBillByIdProvider(this.provider.id);
    })
  }

  changeToConfirmed(idOrder: number) {
    this.orderLoverService.changeToConfirmed(idOrder).subscribe(() => {
      this.findProviderByAccountUsername();
      this.router.navigate(["/providerShowBill"])
    })
  }

  changeToRejected(idOrder: number) {
    this.orderLoverService.changeToRejected(idOrder).subscribe(() => {
      this.findProviderByAccountUsername();
    })
  }

  getAllBillOfProviderAndStartOrder(idProvider: number, statusOrder: number) {
    this.providerService.getAllBillOfProviderAndStartOrder(idProvider, statusOrder).subscribe((data) => {
      this.listBillOfProvider = data;
    })
  }
  
}
