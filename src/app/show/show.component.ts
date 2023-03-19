import {Component, OnInit} from '@angular/core';
import {Account} from "../model/Account";
import {AccountService} from "../service/account/account.service";
import {Router} from "@angular/router";
import {Provider} from "../model/Provider";
import {ProviderService} from "../service/provider/provider.service";
import {ProvisionProviderService} from "../service/provisionprovider/provisionprovider.service";
import {ProvisionProvider} from "../model/ProvisionProvider";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit{
  accounts: Account[] = [];
  providers: Provider[] = [];
  provisionproviders: ProvisionProvider[] = [];
  page: number = 1;
  total: number =0;


  constructor(private accountService: AccountService, private router: Router, private providerService: ProviderService,
              private provisionproviderService: ProvisionProviderService) {
  }




  ngOnInit(): void {
    this.getProviderAcc();
  }
  getProviderAcc() {
    this.providerService.getAllProviderAcc(this.page).subscribe(data=>{
      this.providers = data;
      this.total = this.providers.length;
      this.provisionproviderService.getAllProvisionProvider().subscribe(data=>{
        this.provisionproviders = data;
      })
    })
  }
  pageChangeEvent(event: number){
    this.page = event;
    this.getProviderAcc();
  }
  logout(){
    localStorage.clear();
    this.router.navigate([''])
  }
  goToProfile(){
    this.router.navigate(['/showProfile'])
  }
  goToEditProfile(){
    this.router.navigate(['/changeInfo'])
  }
}
