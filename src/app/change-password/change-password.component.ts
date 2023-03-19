import {Component, OnInit} from '@angular/core';
import {AccountService} from "../service/account/account.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountForChange} from "../model/AccountForChange";
import {Account} from "../model/Account";
import Swal from "sweetalert2";
import { Router } from '@angular/router';
import { CreateProvider } from '../model/CreateProvider';
import { ProviderService } from '../service/provider/provider.service';
import { OrderLoverService } from '../service/Order/order-lover.service';
import { OrderLover } from '../model/OrderLover';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    changeType: String = "password";
    check: number = 1;
    id!: number;
    accountChange!:AccountForChange;
    formChangePassword!: any;
    checkPassword: boolean = false;
    summit1:boolean=true
    summit2:boolean=true
    public checkConfirmPassword: boolean = false;
    statusProvider!:number;
    provider!:CreateProvider;
    orderLovers: OrderLover[] = [];
    account : any;
    constructor(private accountService: AccountService,private router:Router,private providerService:ProviderService, private orderLoverService: OrderLoverService) {
    }


    ngOnInit() {
        this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res=>{
            if (res!=null){
                this.statusProvider=res.statusProvider;
            }
        })
        this.accountService.findById(this.accountService.getAccountToken().id).subscribe(res=> {
            this.accountChange = res;
            this.account = res;
            this.showCart(this.account.id,1);
        })
        this.formChangePassword = new FormGroup({
            password: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]),
            reCheckNewPassword: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(6)])
        })
    }

    validation_messages = {
        password: [
            {type: 'required', message: 'Please enter your password.'}
        ],
        newPassword: [
            {type: 'required', message: 'Please enter your new password.'},
            {type: 'maxlength', message: 'Please enter password less than 16 characters.'},
            {type: 'minlength', message: 'Please enter password more than 6 characters.'},
        ],
        reCheckNewPassword: [
            {type: 'required', message: 'Please enter re-check your new password.'},
            {type: 'maxlength', message: 'Please enter password less than 16 characters.'},
            {type: 'minlength', message: 'Please enter password more than 6 characters.'},
        ],
    };

    funcShowPassword() {
        if (this.check == 1) {
            this.changeType = "text";
            this.check = 2;
        } else {
            this.changeType = "password";
            this.check = 1;
        }
    }

    funcCheckPassword() {
        this.id = this.accountService.getAccountToken().id;
        this.accountService.findById(this.id).subscribe((res) => {
                if (this.formChangePassword?.get('password').value != res.password) {
                    this.checkPassword = true;
                } else {
                    this.checkPassword = false;
                    this.summit1=false
                }

            }
        )
    }
    createProvider(){
        const providerCreate= new CreateProvider("",0,0,3,this.accountChange)
        this.providerService.createProvider(providerCreate).subscribe(res=>{
            Swal.fire('Done!', 'Sended!', 'success');
            this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res=>{
                if (res!=null){
                    this.statusProvider=res.statusProvider;
                }
            })
        })

    }
    public funcCheckConfirmPassword(): boolean {
        if (this.formChangePassword.get("newPassword")?.value != this.formChangePassword.get("reCheckNewPassword")?.value) {
            return this.checkConfirmPassword = true;
        } else {
            this.summit2=false;
            return this.checkConfirmPassword = false;
        }
    }
    checkSummit():boolean{
        if(this.summit1==true&&this.summit2==true){
            return true;
        }
        if(this.summit1==false&&this.summit2==false){
            return false
        }
        return true;
    }
    funcChangePassword(){
        this.id = this.accountService.getAccountToken().id;
        this.accountService.findById(this.id).subscribe((res) => {
            this.accountChange=res
            this.accountChange.password=this.formChangePassword.value.newPassword;
            this.accountService.changeInfo(this.accountChange).subscribe(res=> Swal.fire('Done!', 'Change Password', 'success'))
        })
    }
    requestVip(){
        this.accountChange.statusVip=3
        this.accountService.changeInfo(this.accountChange).subscribe((res)=>{
            this.accountService.findById(this.accountService.getAccountToken().id).subscribe((data)=>{
                this.accountChange=res;
                Swal.fire('Done!', 'Request sent successfully!', 'success')
            })
        })
    }
    goToTheHome() {
        if(this.account.gender=="Male") {
            this.router.navigate(["/homeBoy"]);
        } else this.router.navigate(["/homeGirl"]);
    }

    logout(){
        localStorage.clear();
        this.router.navigate([''])
    }
    goToProfile(){
        this.router.navigate(['/showProfile'])
    }
    goToProviderSetting() {
        this.router.navigate(["/profileProvider"])
    }
    goToEditProfile(){
        this.router.navigate(['/changeInfo'])
    }
    goToProvider(){
        this.router.navigate(['/supplier'])
    }
    showCart(id: number, statusOrder: number) {
        this.orderLoverService.getAllBillOfAccountByIdAndStartOrder(id, statusOrder).subscribe(data => {
            this.orderLovers = data;
        })
    }

    goToMyOrder() {
        this.router.navigate(["/userShowBill"])
    }

}
