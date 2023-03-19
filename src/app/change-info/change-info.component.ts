import {Component, OnInit} from '@angular/core';
import {AccountService} from "../service/account/account.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountForChange} from "../model/AccountForChange";
import Swal from "sweetalert2";
import {Router} from '@angular/router';
import {CreateProvider} from '../model/CreateProvider';
import {ProviderService} from '../service/provider/provider.service';
import {OrderLover} from '../model/OrderLover';
import {OrderLoverService} from '../service/Order/order-lover.service';

@Component({
    selector: 'app-change-info',
    templateUrl: './change-info.component.html',
    styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit {
    constructor(private accountService: AccountService, private router: Router, private providerService: ProviderService, private orderLoverService: OrderLoverService) {
    }

    public checkDuplicateEmail: boolean = false;
    public checkDuplicateUsername: boolean = false;
    accountChange!: AccountForChange
    accountChangeTemp!: AccountForChange
    id!: number;
    formChangeInfo: any;
    statusProvider!: number;
    provider!: CreateProvider;
    account: any;
    orderLovers: OrderLover[] = [];

    ngOnInit() {
        this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res => {
            if (res != null) {
                this.statusProvider = res.statusProvider;
            }
        })
        this.formChangeInfo = new FormGroup({
            id: new FormControl(),
            fullName: new FormControl(),
            username: new FormControl('', [Validators.required, Validators.maxLength(40)]),
            email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
            birthday: new FormControl('', [Validators.required, this.checkDateOfBirth]),
            city: new FormControl(),
            country: new FormControl(),
            genderObj: new FormGroup({
                gender: new FormControl('Orther')
            }),
        })
        
        this.id = this.accountService.getAccountToken().id
        this.accountService.findById(this.id).subscribe((res) => {
            this.accountChange = res;
            this.accountChangeTemp = res;
            this.formChangeInfo.get('id').setValue(res.id);
            this.formChangeInfo.get('fullName').setValue(res.fullName);
            this.formChangeInfo.get('username').setValue(res.username);
            this.formChangeInfo.get('email').setValue(res.email);
            this.formChangeInfo.get('birthday').setValue(res.birthday);
            this.formChangeInfo.get('city').setValue(res.city);
            this.formChangeInfo.get('country').setValue(res.country);
            this.formChangeInfo.get('genderObj').get('gender').setValue(res.gender);
        })
        this.accountService.findById(this.accountService.getAccountToken().id).subscribe((res) => {
            this.account = res;
            this.showCart(this.account.id, 1);
        })
    }

    validation_messages = {
        username: [
            {type: 'required', message: 'Please enter username.'},
            {type: 'maxlength', message: 'Please enter username less than 40 characters.'}
        ],
        birthday: [
            {type: 'required', message: 'Please select date of birth.'},
            {type: 'checkAge', message: 'Age must be 18 years old.'}
        ],
        email: [
            {type: 'required', message: 'Please enter your email.'},
            {
                type: 'pattern',
                message: 'Please enter your email in the format abc@xyz.jqk!'
            }
        ]
    };

    funcCheckDuplicateUsername(username: String) {
        this.accountService.findAccountByUsername(username).subscribe(res => {
            if (res != null) {
                this.checkDuplicateUsername = true;
            } else {
                this.checkDuplicateUsername = false
            }
        })
    }

    showCart(id: number, statusOrder: number) {
        this.orderLoverService.getAllBillOfAccountByIdAndStartOrder(id, statusOrder).subscribe(data => {
            this.orderLovers = data;
        })
    }

    goToMyOrder() {
        this.router.navigate(["/userShowBill"])
    }

    createProvider() {
        const providerCreate = new CreateProvider("", 0, 0, 3, this.accountChange)
        this.providerService.createProvider(providerCreate).subscribe(res => {
            Swal.fire('Done!', 'Sended!', 'success');
            this.providerService.findProviderByAccount_Id(this.accountService.getAccountToken().id).subscribe(res => {
                if (res != null) {
                    this.statusProvider = res.statusProvider;
                }
            })
        })

    }

    funcCheckDuplicateEmail(email: String) {
        this.accountService.findAccountByEmail(email).subscribe(res => {
            if (res != null) {
                this.checkDuplicateEmail = true;
            } else {
                this.checkDuplicateEmail = false
            }
        })
    }

    checkDateOfBirth(control: AbstractControl) {
        const dateOfBirth = new Date(control.value);
        if (new Date().getFullYear() - dateOfBirth.getFullYear() < 18) {
            return {checkAge: true};
        }
        return null;
    }

    changeInfo() {
        this.accountChange = this.formChangeInfo.value;
        this.accountChange.gender = this.formChangeInfo.value.genderObj.gender;
        this.accountChange.avatar = this.accountChangeTemp.avatar;
        this.accountChange.dateOfRegister = this.accountChangeTemp.dateOfRegister;
        this.accountChange.description = this.accountChangeTemp.description;
        this.accountChange.height = this.accountChangeTemp.height;
        this.accountChange.weight = this.accountChangeTemp.weight;
        this.accountChange.hobby = this.accountChangeTemp.hobby;
        this.accountChange.logoutTime = this.accountChangeTemp.logoutTime;
        this.accountChange.password = this.accountChangeTemp.password;
        this.accountChange.statusAccount = this.accountChangeTemp.statusAccount;
        this.accountChange.statusComment = this.accountChangeTemp.statusComment;
        this.accountChange.statusVip = this.accountChangeTemp.statusVip;
        this.accountChange.wallet = this.accountChangeTemp.wallet;
        this.accountChange.phoneNumber = this.accountChangeTemp.phoneNumber;
        this.accountChange.roles = this.accountChangeTemp.roles;
        this.accountService.changeInfo(this.accountChange).subscribe(res => Swal.fire('Done!', 'Change Info', 'success'))
    }

    requestVip() {
        this.accountChange.statusVip = 3
        this.accountService.changeInfo(this.accountChange).subscribe((res) => {
            this.accountService.findById(this.accountService.getAccountToken().id).subscribe((data) => {
                this.accountChange = res;
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

    goToProfile() {
        this.router.navigate(['/showProfile'])
    }

    goToEditProfile() {
        this.router.navigate(['/changeInfo'])
    }

    goToProvider() {
        this.router.navigate(['/supplier'])
    }
    goToProviderSetting() {
        this.router.navigate(["/profileProvider"])
    }
}
