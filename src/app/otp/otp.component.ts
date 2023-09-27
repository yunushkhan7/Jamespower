import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { CountdownComponent } from 'ngx-countdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import Swal from 'sweetalert2';
import { loginServices } from '../../zsoonServices/loginservices';
import * as CryptoJS from 'crypto-js';
import { SidebarDataService } from 'src/zsoonServices/sidebar-data.service';

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
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  @ViewChild("myinput") myInputField: ElementRef;
  @ViewChild('countdown') counter: CountdownComponent;
  Error = false
  isDisabled = false
  modal = false;
  timeData = "60"
  config: any;
  showStop: boolean;
  otp: string;
  showOtpComponent = true;
  otpForm: FormGroup;
  MobileNo: any;
  matcher = new MyErrorStateMatcher();
  submitted = false;
  error: string
  otpPage = false;
  login = true;
  OTP = true;
  returnUrl = '/visitor-log';
  resendbtn = false
  secondshow = false
  firstshow = true;
  expires = false;
  timerSeconds: any
  Email = localStorage.getItem('Email');
  show: any;
  mobileNoshow = localStorage.getItem('userId');
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  public addOtp = {
    "otp": "",
  };

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private loginservices: loginServices,
    private adminstrationservice: adminstrationServices,
    private formBuilder: FormBuilder,
    private sidebarDataService: SidebarDataService
  ) {
    this.otpForm = this.formBuilder.group({
      Otp: ['', Validators.required],
    });
  }
  public jsonStr: string = localStorage.getItem("userDetails");
  public jsonObj = JSON.parse(this.jsonStr)
  userDetails: any = this.jsonObj

  ngOnInit(): void {
    this.timerSeconds = 300
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  handleEvent(data) {
    if (data.action == "done") {
      this.resendbtn = true;
      this.firstshow = false;
      this.secondshow = false;
      this.expires = true;
      this.isDisabled = true
    }
    if (data.action == "restart") {
      this.resendbtn = false;
      this.secondshow = true;
      this.expires = false;
      this.isDisabled = false
    }
  }

  resendotp(data) {
    this.adminstrationservice.ResendOtp(this.mobileNoshow).subscribe((data: any) => {
      console.log('gettingotp', data);
      if (data) {
        this.secondshow = true;
        this.firstshow = false;
      }
    });
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

  SubmitOtp(data) {
    const payload = {
      otp: data.otp,
      userGuid: localStorage.getItem('userId')
    };
    this.loginservices.submitOtp(payload.userGuid, payload.otp).subscribe((response: any) => {
      if (response?.sucess) {
        this.sidebarDataService.sideNavBarSubject.next(response?.data?.parentNodes);
        localStorage.setItem('token', response?.data?.token);
        localStorage.setItem('userDetails', JSON.stringify(response?.data));
        localStorage.setItem('userName', response?.data?.userName);
        localStorage.setItem('mobile', response?.data?.mobile);
        this.router.navigate([this.returnUrl])
      } else {
        this.Error = true;
      }
    })
  }
}
