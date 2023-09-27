import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { loginServices } from '../../zsoonServices/loginservices';
import { MatStepper } from '@angular/material/stepper';
import { environment } from 'src/environments/environment';
const redirectSessionTimeout = environment.redirectSessionTimeout;

/** Error when invalid control is dirty, touched, or submitted. */
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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  reset: any
  url = 'assets/logo-en.png'
  Error = false
  emailFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  returnUrl = '/login';
  emailField: any
  public UserName = '';
  submitted = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isEditable = false;
  uemail;
  uname;
  NotMatch = false;
  password1 = true;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private loginservices: loginServices,
  ) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtnl: ['', [Validators.required, Validators.pattern('^[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,4}$')]]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      TfirstCtrl: ['', [
        Validators.required,
        Validators.pattern('^(?=.*?[a-z])(.{23,}|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{14,23})$'),
        Validators.minLength(14),
      ]],
      TsecondCtnl: ['', [
        Validators.required,
        Validators.pattern('^(?=.*?[a-z])(.{23,}|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{14,23})$'),
        Validators.minLength(14),
      ]],
      otp: this.reset
    });
  }

  get f() { return this.firstFormGroup.controls }
  get g() { return this.secondFormGroup.controls }
  get h() { return this.thirdFormGroup.controls }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  forgotPassword() {
    if (this.emailField != '') {
      this.loginservices.forgotdata(this.emailField).subscribe((data: any) => {
        if (data.issuccessfull == true) {
          if (data.sucess == true) {
            Swal.fire({
              title: 'Password sent',
              text: 'Please check your mail',
              icon: 'success',
              confirmButtonColor: '#ff8084',
            });
            this.router.navigate([this.returnUrl]);
          } else if (data.sucess == false) {
            Swal.fire({
              title: 'Password not sent',
              text: 'Mail not available contact admin',
              icon: 'warning',
            });
          } else if (data.message == "User Account is Blocked") {
            Swal.fire({
              title: 'Blocked',
              text: 'Password reset email cannot be sent as the user account is currently blocked. Please contact your system administrator',
              icon: 'warning'
            })
          }
        } else if (data.issuccessful == false) {
          Swal.fire({
            title: 'Account not registered ',
            icon: 'warning',
          });
        } else {
          Swal.fire({
            title: 'Invalid Username',
            text: 'The mail is invaild',
            icon: 'warning',
          });
        }
      });
    } else {
      this.emailFormControl.markAsTouched();
    }
  }

  PasswordReset(stepper: MatStepper) {
    this.uname = this.firstFormGroup.value.firstCtrl;
    this.uemail = this.firstFormGroup.value.secondCtnl;
    if (this.firstFormGroup.valid) {
      this.spinner.show();
      this.loginservices.PasswordRest(this.uname, this.uemail).subscribe((data: any) => {
        console.log('res', data);
        this.spinner.hide();
        if (data.issuccessful) {
          Swal.fire({
            title: 'Password reset email sent',
            text: 'An email has been sent to your rescue email address. Follow the directions in the email to reset your password',
            allowOutsideClick: false,
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed)
              stepper.next()
          });
        } else {
          Swal.fire({
            title: 'Warning',
            text: 'Plese check your Username & Email',
            icon: 'warning'
          })
        }
      })
    }
  }

  PasswordResetCode(stepper: MatStepper) {
    this.reset = this.secondFormGroup.value.secondCtrl
    var uotp = this.secondFormGroup.value.secondCtrl
    if (this.secondFormGroup.valid) {
      this.spinner.show();
      this.loginservices.PasswordResetCode(this.uemail, uotp).subscribe((data: any) => {
        console.log(data);
        this.spinner.hide();
        if (data.issuccessfull == true) {
          this.Error = false
          stepper.next();
        }
        if (data.issuccessfull == false) {
          this.Error = true;
        }
      })
    }
  }

  CreateNewPassword() {
    var upass = this.thirdFormGroup.value.TsecondCtnl
    if (this.thirdFormGroup.value.TfirstCtrl != this.thirdFormGroup.value.TsecondCtnl) {
      this.NotMatch = true;
    } else if (this.thirdFormGroup.valid && this.thirdFormGroup.value.TfirstCtrl == this.thirdFormGroup.value.TsecondCtnl) {
      this.spinner.show();
      this.loginservices.CreateNewPassword(this.uemail, upass, this.reset).subscribe((data: any) => {
        this.spinner.hide();
        if (data?.isSuccessfull == true) {
          window.location.href = environment.redirectSessionTimeout;
        }
        if (data.isSuccessfull == false) {
          Swal.fire({
            title: 'Something',
            text: 'went wrong',
            icon: 'warning'
          })
        }
      })
    }
  }

  onKey(event) {
    this.password1 = (this.h.TfirstCtrl.value === this.h.TsecondCtnl.value) ? true : false;
  }

  keyPressContact(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else if (/[1-9]{1}[0-9]{9}/.test(event.keyCode)) {
      event.preventDefault(); return true;
    } else { return true; }
  }
}
