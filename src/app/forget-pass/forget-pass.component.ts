import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AccountService} from '../service/account/account.service';

@Component({
    selector: 'app-forget-pass',
    templateUrl: './forget-pass.component.html',
    styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
    formForgetPass!: any

    constructor(private accountService: AccountService, private router: Router) {
    }

    ngOnInit() {
        this.formForgetPass = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')])
        })
    }
  validation_messages = {
    email: [
      {type: 'required', message: 'Please enter your email.'},
      {
        type: 'pattern',
        message: 'Please enter your email in the format abc@xyz.jqk!'
      }
    ]
  }

    sendEmailForgetPass() {
        console.log(this.formForgetPass.value.email)
        this.accountService.findAccountByEmail(this.formForgetPass.value.email).subscribe((res) => {
            if(res!=null){
                this.accountService.forgotPass(res).subscribe(data => Swal.fire('Done!', 'Check your email', 'success'))
            }else {
                Swal.fire('Oops!', 'Email does not exist', 'question')
            }
        })
    }
}
