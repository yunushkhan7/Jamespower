import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import { SidebarDataService } from 'src/zsoonServices/sidebar-data.service';
import Swal from 'sweetalert2';
import { loginServices } from '../../zsoonServices/loginservices';
const redirectChnagePass = environment.redirectChangePassword;

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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  modal = false;
  otp: string;
  url = 'https://stjamespowerstation.sg/wp-content/uploads/2022/02/logo.png';
  Sent = false;
  showOtpComponent = true;
  otpForm: FormGroup;
  userNameFormControl = new FormControl('', [Validators.required]);
  Password = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  hide = true;
  public arr: any = [];
  public bindingvalue;
  attempt = false;
  submitted = false;
  error: string;
  ischeck = false;
  otpPage = false;
  login = true;
  OTP = false;
  MobileNo: any;
  returnUrl1 = '/otp';
  returnUrl = '/visitor-log';
  Email: any;

  public logindata = {
    email: '',
    password: '',
  };

  public addOtp = {
    otp: '',
  };

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private loginservices: loginServices,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private sidebar: SidebarDataService
  ) { }

  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      Otp: ['', Validators.required],
    });

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  isChecked() {
    if (this.ischeck == false) {
      this.ischeck = true;
    } else {
      this.ischeck = false;
    }
  }

  submit(data) {
    if (data.uname != '' && data.password != '') {
      const payload = {
        email: 'kiran@gmail.com',
        deviceUUID: 'string',
        userName: data.uname,
        password: data.password,
      };
      this.spinner.show();
      this.loginservices.authenticateUser(payload).subscribe((result: any) => {
        localStorage.setItem('something', btoa(payload.password));
        // this.sidebar.sideNavBarSubject.next(result.parentNodes)
        this.spinner.hide();
        this.Email = result.email?.substring(0, 3) + '*****@' + result.email?.split('@')[1];
        this.Sent = true;
        localStorage.setItem('Email', this.Email);

        if (result?.success) {
          if (result?.roleId == 1) {
            if (result?.passwordchange) {
              // localStorage.setItem('token', result.token); //remove and replace
              // localStorage.setItem('userDetails', JSON.stringify(result)); //remove and replace
              localStorage.setItem('userId', result?.userGuid);
              localStorage.setItem('roleId', result?.roleId);
              // localStorage.setItem('userName', result.userName);
              // localStorage.setItem('password', result.password); //remove and replace
              // localStorage.setItem('mobile', result.mobile);
              Swal.fire({
                title: 'Change Password',
                text: 'Password Is Expired Please Change Your Passsword',
                icon: 'warning',
              }).then((result) => {
                if (result?.isConfirmed) {
                  window.location.href = redirectChnagePass;
                  //window.location.href ='/#/changepassword'
                }
              });
            } else {
              // localStorage.setItem('token', result.token);
              // localStorage.setItem('userDetails', JSON.stringify(result));
              localStorage.setItem('userId', result?.userGuid);
              localStorage.setItem('roleId', result?.roleId);
              // localStorage.setItem('userName', result.userName);
              // localStorage.setItem('mobile', result.mobile);
              this.router.navigate([this.returnUrl1]);
            }
          } else if (result?.roleId == 9 || result?.roleId == 10) {
            // localStorage.setItem('token', result.token);
            // localStorage.setItem('userDetails', JSON.stringify(result));
            localStorage.setItem('userId', result.userGuid);
            localStorage.setItem('roleId', result.roleId);
            // localStorage.setItem('userName', result.userName);
            // localStorage.setItem('mobile', result.mobile);
            this.router.navigate([this.returnUrl1]);
          }
        } else if (result?.UserExists) {
          Swal.fire({
            title: 'Invalid',
            text: 'You have entered invalid details',
            icon: 'warning',
          });
        } else if (result?.isBlocked) {
          Swal.fire({
            title: 'This user is blocked please contact server-admin',
            allowOutsideClick: false,
            icon: 'info',
          });
        } else if (result?.passwordAttempts) {
          this.Sent = false;
          Swal.fire({
            title: 'Invalid',
            html:
              'Incorrect login credentials' +
              '<br> <br>' +
              'You have  ' +
              result?.passwordAttempts +
              ' more chances left before locking the account',
            icon: 'warning',
          });
        }
      });
    } else {
      this.userNameFormControl.markAsTouched();
      this.Password.markAsTouched();
    }
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, { disableClose: true });
  }
}
