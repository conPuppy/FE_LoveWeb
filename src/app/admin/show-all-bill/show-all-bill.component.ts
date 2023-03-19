import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderLover } from 'src/app/model/OrderLover';
import { AccountService } from 'src/app/service/account/account.service';
import { OrderLoverService } from 'src/app/service/Order/order-lover.service';

@Component({
  selector: 'app-show-all-bill',
  templateUrl: './show-all-bill.component.html',
  styleUrls: ['./show-all-bill.component.css']
})
export class ShowAllBillComponent implements OnInit{
  
  listOrderLover: OrderLover[] = [];
  account: any;
  
  constructor(private orderLoverService: OrderLoverService, private accountService: AccountService, private router:Router) {
  }
  
    ngOnInit(): void {
      this.getAllOrder();
      this.accountService.findById(this.accountService.getAccountToken().id).subscribe(res => {
        this.account = res})
    }
    
    
    getAllOrder() {
    this.orderLoverService.getAllOrder().subscribe((data) => {
      this.listOrderLover = data;
    })
    }

  getOrderByStatus(statusOrder: number) {
    this.orderLoverService.getOrderByStatus(statusOrder).subscribe((data) =>{
      this.listOrderLover = data;
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate([''])
  }
  goToShowAllAccount(){
    this.router.navigate(['/admin'])
  }
  goToShowAllProvider(){
    this.router.navigate(['/showAllProvider'])
  }
  goToShowAllBill() {
    this.router.navigate(['/showAllBill'])
  }
}
