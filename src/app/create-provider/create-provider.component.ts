import {Component, OnInit } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import {FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AccountForChange } from "../model/AccountForChange";
import { ImageUrlDTO } from "../model/ImageUrlDTO/ImageUrlDTO";
import { Provider } from "../model/Provider";
import { ProvisionProvider } from "../model/ProvisionProvider";
import { AccountService } from "../service/account/account.service";
import { ImageService } from "../service/image/image.service";
import { ProviderService } from "../service/provider/provider.service";
import { ProvisionService } from "../service/provision/provision.service";
import { ProvisionProviderService } from "../service/provisionprovider/provisionprovider.service";


@Component({
    selector: 'app-create-provider',
    templateUrl: './create-provider.component.html',
    styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent implements OnInit {
    account!: AccountForChange;
    statusProvider!: number;
    provider!: Provider;
    allServicesOfProvider!: ProvisionProvider[];

    showImgActive:ImageUrlDTO[]=[];
    id!:number;
    formChangePrice!:any;

    constructor(private router: Router,
                private storage: AngularFireStorage,
                private accountService: AccountService,
                private providerService: ProviderService,
                private provisionProviderService: ProvisionProviderService,
                private provisionService: ProvisionService,
                private imageService:ImageService
    ) {
    }
    ngOnInit() {
        this.formChangePrice= new FormGroup({
            price: new FormControl()
        })
        this.id=this.accountService.getAccountToken().id
        this.imageService.findByAccount_IdAAndStatusImg1(this.id).subscribe(res=>{this.showImgActive=res})
        this.accountService.findById(this.accountService.getAccountToken().id).subscribe(res=>{this.account=res;})
        this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res => {
            if (res != null) {
                this.provider=res;
                this.formChangePrice.get('price').setValue(this.provider.price);
                this.statusProvider = res.statusProvider;
            }
        })
        this.getAllService()

    }
    changePrice(){
        this.provider.price=this.formChangePrice.value.price
        console.log(this.formChangePrice.value.price)
        this.providerService.editProvider(this.provider).subscribe()
    }
    changeFreeAndExtend(id:number){
        this.provisionProviderService.findById(id).subscribe(res=>{
            if(res.statusServiceProvider==1){
                res.statusServiceProvider=2
            }else {
                res.statusServiceProvider=1
            }this.provisionProviderService.saveProvisionProvider(res).subscribe(res=>this.getAllService());
        });
    }

    getAllService() {
        this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res=>{
            this.provisionProviderService.findProvisionProviderByProviderId(res.id).subscribe(res1=>this.allServicesOfProvider=res1);
        })

    }
    requestVip() {
        this.account.statusVip = 3
        this.accountService.changeInfo(this.account).subscribe((res) => {
            this.accountService.findById(this.accountService.getAccountToken().id).subscribe((data) => {
                this.account = res;
                Swal.fire('Done!', 'Request sent successfully!', 'success')
            })
        })
    }
    goToTheHome() {
        if(this.account.gender=="Male") {
            this.router.navigate(["/homeBoy"]);
        } else this.router.navigate(["/homeGirl"]);
    }
    logout() {
        localStorage.clear();
        this.router.navigate([''])
    }
    goToProviderSetting() {
        this.router.navigate(["/profileProvider"])
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
    goToEditProvider(){
        this.router.navigate(['/profileProvider'])
    }
    goToMyOrder() {
        this.router.navigate(["/userShowBill"])
    }
    goToMyBill() {
        this.router.navigate(["/providerShowBill"])
    }

    goToEditImages() {
        this.router.navigate([`/image/${this.account.id}`])
    }

}

