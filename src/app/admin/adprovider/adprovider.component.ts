import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Account} from 'src/app/model/Account';
import {Provider} from 'src/app/model/Provider';
import {AccountService} from 'src/app/service/account/account.service';
import {ProviderService} from 'src/app/service/provider/provider.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-adprovider',
    templateUrl: './adprovider.component.html',
    styleUrls: ['./adprovider.component.css']
})
export class AdproviderComponent implements OnInit {
    providers: Provider[] = [];
    page: number = 1;
    formSearch: FormGroup = new FormGroup({
        search: new FormControl()
    });

    stringSearch: any;
    account: any;

    p: number = 1;
    total: number = 0;

    constructor(private accountService: AccountService, private router: Router, private providerService: ProviderService) {
    }

    ngOnInit(): void {
        this.getProviderAcc()
    }

    getProviderAcc() {
        this.providerService.getAllProvider(this.page).subscribe(data=>{
            this.providers = data;
            this.total = this.providers.length;
        })
    }
    pageChangeEvent(event: number){
        this.page = event;
        this.getProviderAcc();
    }

    acceptProvider(providerId:number){
        this.providerService.findProviderById(providerId).subscribe(res=>{
            res.statusProvider=1;
            this.providerService.acceptProvider(res).subscribe(data=>{
                this.providerService.getAllProvider(this.page).subscribe(data=>{
                    this.providers = data;
                    this.total = this.providers.length;
                })
                Swal.fire('Done!', 'Accepted!', 'success')
            })
        })
    }

    search() {
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

    goToShowAllBill() {
        this.router.navigate(['/showAllBill'])
    }

}
