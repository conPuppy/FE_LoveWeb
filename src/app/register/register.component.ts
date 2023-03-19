import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {AccountCreate} from "../model/AccountCreate";
import {AccountService} from "../service/account/account.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    constructor(private accountService: AccountService, private router: Router) {
    }
    changeType: String = "password";
    check: number = 1;
    formRegister!: FormGroup;
    public checkDuplicateUsername: boolean = false;
    public checkDuplicateEmail: boolean = false;
    public checkConfirmPassword: boolean = false;
    public checkConfirmPhoneNumber: boolean = false;
    today!: any
    accountCreate!:AccountCreate;

    ngOnInit() {
        this.today = new Date().toISOString().split("T")[0];
        this.formRegister = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.maxLength(40)]),
            fullName: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$'), Validators.maxLength(40)]),
            email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
            phoneNumber: new FormControl('',[Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
            password: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]),
            confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]),
            birthday: new FormControl('', [Validators.required, this.checkDateOfBirth]),
            genderObj: new FormGroup({
                gender: new FormControl('Orther')
            }),
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
        ],
        fullName: [
            {type: 'required', message: 'Vui lòng nhập tên'},
            {type: 'maxlength', message: 'Vui lòng nhập tên > 40.'},
            {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc số'}
        ],
        phoneNumber: [
            {type: 'required', message: 'Vui lòng nhập số điện thoại'},
            {
                type: 'pattern',
                message: 'Vui lòng nhập số địa thoại đúng định dạng đầu số của Việt Nam'
            }
        ],

        password: [
            {type: 'required', message: 'Please enter a password.'},
            {type: 'maxlength', message: 'Please enter password less than 16 characters.'},
            {type: 'minlength', message: 'Please enter password more than 6 characters.'},
        ],
        confirmPassword: [
            {type: 'required', message: 'Please re-enter your password.'},
            {type: 'maxlength', message: 'Please enter password less than 16 characters.'},
            {type: 'minlength', message: 'Please enter password more than 6 characters.'},
        ]
    };

    public funcCheckConfirmPassword(): boolean {
        if (this.formRegister.get("password")?.value != this.formRegister.get("confirmPassword")?.value) {
            return this.checkConfirmPassword = true;
        } else {
            return this.checkConfirmPassword = false;
        }
    }

    checkDateOfBirth(control: AbstractControl) {
        const dateOfBirth = new Date(control.value);
        if (new Date().getFullYear() - dateOfBirth.getFullYear() < 18) {
            return {checkAge: true};
        }
        return null;
    }
    funcShowPassword() {
        if (this.check == 1) {
            this.changeType = "text";
            this.check = 2;
        } else {
            this.changeType = "password";
            this.check = 1;
        }
    }
    funcCheckDuplicateUsername(username: String) {
        this.accountService.findAccountByUsername(username).subscribe(res => {
            if (res != null) {
                this.checkDuplicateUsername = true;
            } else {
                this.checkDuplicateUsername = false
            }
        })
    }
    funcCheckDuplicatephoneNumber(phoneNumber: String) {
        console.log(phoneNumber)
        this.accountService.findAccountByPhoneNumber(phoneNumber).subscribe(res => {
            if (res != null) {
                this.checkConfirmPhoneNumber = true;
            } else {
                this.checkConfirmPhoneNumber = false
            }
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

    createAccount() {
        this.accountCreate=new AccountCreate(this.formRegister.value.username,this.formRegister.value.fullName,this.formRegister.value.email,this.formRegister.value.phoneNumber,this.formRegister.value.password,this.formRegister.value.birthday,this.formRegister.value.genderObj.gender)
        this.accountService.createAccount(this.accountCreate).subscribe(
            (res) => {
                Swal.fire('Done!', 'Congratulations on your successful registration', 'success');
                this.router.navigate(["/login"]);
            }
        )

    }


}
