import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { loginServices } from '../../zsoonServices/loginservices';

/ Error when invalid control is dirty, touched, or submitted. /;
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangepasswordComponent implements OnInit {
  url = 'https://stjamespowerstation.sg/wp-content/uploads/2022/02/logo.png';
  error: string;
  name = 'angular';
  password1 = false;
  oldpass = false;
  text = '';
  returnUrl = '/patient-log';
  returnUrl1 = '/login';
  oldPassword = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '^(?=.*?[a-z])(.{14,}|(?=.*?[A-Z])(?=.*?[0-13])(?=.*?[#?!@$%^&*-]).{14,14})$'
    ),
    Validators.minLength(8),
    Validators.maxLength(12),
  ]);
  confPassword1 = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  dataobject: any;
  changedata = {
    userGuid: '',
    oldPassword: '',
    newPassword: '',
    confpassword: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private loginservices: loginServices
  ) {}

  public jsonStr: string = localStorage.getItem('userDetails');
  public jsonObj = JSON.parse(this.jsonStr);
  userDetails: any = this.jsonObj;

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  changePassword(changedata) {
    if (
      changedata.oldPassword != '' &&
      changedata.newPassword != '' &&
      changedata.confpassword != ''
    ) {
      let pass = new RegExp(
        '^(?=.*?[a-z])(.{14,}|(?=.*?[A-Z])(?=.*?[0-13])(?=.*?[#?!@$%^&*-]).{14,14})$'
      );
      let pv = pass.test(changedata.confpassword);
      if (changedata.newPassword == changedata.confpassword) {
        if (pv == true) {
          const datachange = {
            userGuid: localStorage.getItem('userId'),
            oldPassword: changedata.oldPassword,
            newPassword: changedata.newPassword,
          };

          console.log('data is changed', datachange);
          this.loginservices
            .changePasswordpreauth(datachange)
            .subscribe((res: any) => {
              console.log('respon', res);
              // this.dataobject = data;

              if (res.data.message == 'Done') {
                Swal.fire({
                  title: 'Success',
                  text: 'Password changed successfully!',
                  icon: 'success',
                  confirmButtonColor: '#ff8084',
                });

                // this.router.navigate([this.returnUrl]);

                window.location.href = environment.redirectSessionTimeout;

                (error) => {
                  this.error = error;
                };
              } else if (res.data.message == 'Password is already there') {
                Swal.fire({
                  title: 'Alert',
                  text: 'You used this password recently , please choose a different one',
                  icon: 'warning',
                });
              } else if (res.data.message == 'Credentials not matching') {
                Swal.fire({
                  title: 'Invalid',
                  text: 'Invalid old password',
                  icon: 'warning',
                });
              } else if (res.data.sucess) {
                Swal.fire({
                  title: 'Error',
                  text: 'Something went wrong',
                  icon: 'warning',
                });
              } else {
                this.oldpass = true;
              }
            });

          this.oldPassword.markAsUntouched();
          this.newPassword.markAsUntouched();
          this.confPassword1.markAsUntouched();
        }
      } else {
        this.password1 = true;
      }
    } else {
      console.log('why');
      this.oldPassword.markAsTouched();
      this.newPassword.markAsTouched();
      this.confPassword1.markAsTouched();
    }
  }

  onKey(event) {
    this.text += event.target.value + ' | ';
    this.password1 = this.newPassword === this.confPassword1 ? true : false;
  }

  signOut() {
    this.loginservices.Logout().subscribe((data) => {
      console.log('loggouttt!!', data);
    });
    localStorage.clear();
  }

  cancel() {
    if (this.userDetails.isFirstLogin) {
      console.log('firstlogin');
      // this.router.navigate([this.returnUrl])
      window.location.href =
        'https://evvoindia01.ddns.net/SJPSAdmin/#/visitor-log';
    }

    if (this.userDetails.passwordchange) {
      // this.router.navigate([this.returnUrl1]);
      window.location.href = environment.redirectSessionTimeout;
      this.signOut();
    } else {
      window.location.href = environment.redirectSessionTimeout;
    }
  }

  hide = true;
  hide1 = true;
  hide2 = true;
}
