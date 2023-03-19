import {Component, OnInit} from '@angular/core';
import {AccountForChange} from "../model/AccountForChange";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../service/account/account.service";
import Swal from "sweetalert2";
import { Router } from '@angular/router';
import { ProviderService } from '../service/provider/provider.service';
import { CreateProvider } from '../model/CreateProvider';
import { OrderLoverService } from '../service/Order/order-lover.service';
import { OrderLover } from '../model/OrderLover';

@Component({
    selector: 'app-change-appearance',
    templateUrl: './change-appearance.component.html',
    styleUrls: ['./change-appearance.component.css']
})
export class ChangeAppearanceComponent implements OnInit {
    constructor(private accountsService: AccountService,private router:Router,private providerService:ProviderService, private orderLoverService: OrderLoverService) {
    }

    account!: AccountForChange;
    accountChange!: AccountForChange
    id!: number;
    formChangeAppearance: any;
    statusProvider!:number;
    provider!:CreateProvider;
    orderLovers: OrderLover[] = [];

    ngOnInit() {
        this.providerService.findProviderByAccount_Id(this.accountsService.getAccountToken().id).subscribe(res=>{
            if (res!=null){
                this.statusProvider=res.statusProvider;
            }
        })
        this.formChangeAppearance = new FormGroup({
            id: new FormControl(),
            height: new FormControl('', [Validators.required, Validators.maxLength(3)]),
            weight: new FormControl('', [Validators.required, Validators.maxLength(3)]),
            hobby: new FormControl('', [Validators.required, Validators.maxLength(256)]),
            description: new FormControl('', [Validators.required, Validators.maxLength(256)]),
        })
        this.id = this.accountsService.getAccountToken().id;
        this.showCart(this.id,1);
        this.accountsService.findById(this.id).subscribe((res) => {
            this.account = res
            this.formChangeAppearance.get('id').setValue(res.id)
            this.formChangeAppearance.get('height').setValue(res.height)
            this.formChangeAppearance.get('weight').setValue(res.weight)
            this.formChangeAppearance.get('hobby').setValue(res.hobby)
            this.formChangeAppearance.get('description').setValue(res.description)
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
        this.orderLoverService.getAllBillOfAccountByIdAndStartOrder(id, statusOrder).subscribe(data => {
            this.orderLovers = data;
        })
    }
    goToMyOrder() {
        this.router.navigate(["/userShowBill"])
    }
    createProvider(){
        const providerCreate= new CreateProvider("",0,0,3,this.account)
        this.providerService.createProvider(providerCreate).subscribe(res=>{
            Swal.fire('Done!', 'Sended!', 'success');
            this.providerService.findProviderByAccount_Id(this.accountsService.getAccountToken().id).subscribe(res=>{
                if (res!=null){
                    this.statusProvider=res.statusProvider;
                }
            })
        })

    }

    validation_messages = {
        height: [
            {type: 'required', message: 'Please enter your height.'},
            {type: 'maxlength', message: 'Please enter username less than 3 characters.'}
        ],
        weight: [
            {type: 'required', message: 'Please enter your weight.'},
            {type: 'maxlength', message: 'Please enter username less than 3 characters.'}
        ],
        hobby: [
            {type: 'required', message: 'Please enter your hobby.'},
            {
                type: 'maxlength',
                message: 'Please enter username less than 256 characters.'
            }
        ],
        description: [
            {type: 'required', message: 'Please enter your description.'},
            {
                type: 'maxlength',
                message: 'Please enter username less than 256 characters.'
            }
        ]
    };
    changeAppearance(){
        this.accountChange=this.formChangeAppearance.value;
        this.accountChange.gender=this.account.gender;
        this.accountChange.avatar=this.account.avatar;
        this.accountChange.dateOfRegister=this.account.dateOfRegister;
        this.accountChange.username=this.account.username;
        this.accountChange.password=this.account.password;
        this.accountChange.email=this.account.email;
        this.accountChange.logoutTime=this.account.logoutTime;
        this.accountChange.birthday=this.account.birthday;
        this.accountChange.fullName=this.account.fullName;
        this.accountChange.city=this.account.city;
        this.accountChange.country=this.account.country;
        this.accountChange.statusAccount=this.account.statusAccount;
        this.accountChange.statusComment=this.account.statusComment;
        this.accountChange.statusVip=this.account.statusVip;
        this.accountChange.phoneNumber=this.account.phoneNumber;
        this.accountChange.roles=this.account.roles;
        this.accountChange.wallet=this.account.wallet;
        this.accountsService.changeInfo(this.accountChange).subscribe(res=> Swal.fire('Done!', 'Change Appearance', 'success'))
    };
    
    requestVip(){
        this.account.statusVip=3
        this.accountsService.changeInfo(this.account).subscribe((res)=>{
            this.accountsService.findById(this.accountsService.getAccountToken().id).subscribe((data)=>{
                this.account=res;
                Swal.fire('Done!', 'Request sent successfully!', 'success')
            })
        })
    }

    logout(){
        localStorage.clear();
        this.router.navigate([''])
    };
    goToProfile(){
        this.router.navigate(['/showProfile'])
    };
    goToEditProfile(){
        this.router.navigate(['/changeInfo'])
    }
    goToProvider(){
        this.router.navigate(['/supplier'])
    };
}