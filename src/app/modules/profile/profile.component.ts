import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import { loginServices } from 'src/zsoonServices/loginservices';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public add = {
    userName: '',
    mobileNo: '',
    email: '',
    roleName: '',
  };

  public password = {
    userGuid: '',
    oldPassword: '',
    newPassword: '',
    confPassword: '',
  };
  registerForm: FormGroup = new FormGroup({});
  userGuid = localStorage.getItem('userId');
  ras = false;
  public jsonStr: string = localStorage.getItem('userDetails');
  public jsonObj = JSON.parse(this.jsonStr);
  userDetails: any = this.jsonObj;
  fileToUpload: any = null;
  url = 'assets/coache-avatar.png';

  eightCharLength = false;
  upperCase = false;
  lowerCase = false;
  numberCase = false;
  specialCase = false;
  isDisplay: boolean = true;
  email = false
  constructor(
    private formBuilder: FormBuilder,
    private admin: adminstrationServices,
    private spinner: NgxSpinnerService,
    private loginservices: loginServices
  ) {
    this.registerForm = this.formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
          Validators.minLength(8),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
          Validators.minLength(8),
        ],
      ],
      code: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }
  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.get();
  }
  get() {
    this.spinner.show();
    this.admin.GetProfileDetailsById().subscribe((data: any) => {
      this.spinner.hide();
      this.add.email = data.issuccessfull.email;
      this.add.mobileNo = data.issuccessfull.mobileNo;
      this.add.roleName = data.issuccessfull.roleName;
      this.add.userName = data.issuccessfull.userName;
    });
  }
  validatePassword(data: any) {
    console.log(data.target.value);
    var valData = data.target.value;

    if (valData.length >= 13) {
      this.isDisplay = true;
      this.eightCharLength = true;
    } else {
      this.eightCharLength = false;
      this.isDisplay = true;
    }

    if (valData.search(/[A-Z]/) < 0) {
      this.upperCase = false;
      this.isDisplay = true;
    } else {
      this.upperCase = true;
      this.isDisplay = true;
    }

    if (valData.search(/[a-z]/) < 0) {
      this.lowerCase = false;
      this.isDisplay = true;
    } else {
      this.lowerCase = true;
      this.isDisplay = true;
    }

    if (valData.search(/[0-9]/) < 0) {
      this.numberCase = false;
      this.isDisplay = true;
    } else {
      this.numberCase = true;
      this.isDisplay = true;
    }

    if (valData.search(/[!@#$%^&*]/) < 0) {
      this.specialCase = false;
      this.isDisplay = true;
    } else {
      this.specialCase = true;
      this.isDisplay = true;
    }
  }
  onSelectFile(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };

    reader.readAsDataURL(this.fileToUpload);
  }
  mobileVals = false;
  onKeyUp(x) {
    // appending the updated value to the variable

    if (x.target.value.length == 11) {
      this.mobileVal = true;
      this.mobileVals = false;
    } else if (x.target.value.length < 8 || x.target.value.length == 9) {
      this.mobileVals = true;
      this.mobileVal = false;
    } else {
      this.mobileVal = false;
      this.mobileVals = false;
    }
  }

  onKeyUpEmail(x) {

  }
  mobileVal = false;
  keyPressContact(event) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else if (/[1-9]{1}[0-9]{9}/.test(event.keyCode)) {
      event.preventDefault();
      return true;
    } else {
      return true;
    }
  }

  passwordsave(data: any) {
    const datachange = {
      userGuid: localStorage.getItem('userId'),
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confPassword: data.confPassword,
    };
    this.loginservices.changePassword(datachange).subscribe((res: any) => {
      if ((res.data.message = 'Done')) {
        Swal.fire({
          title: 'Updated',
          text: 'Password has changed successfully',
          icon: 'success',
        });
      }
      else if ((res.data.message = 'Done')) {
        Swal.fire({
          title: 'Updated',
          text: 'Password has changed successfully',
          icon: 'success',
        });
      }
    });
  }

  saveProfile(data: any) {
    if (this.add.mobileNo.length >= 11) {
      this.mobileVal = true;
    } else {
      const finalResponse = {
        email: data.email,
        mobileNo: data.mobileNo,
        roleName: data.roleName,
        userName: data.userName,
        userGuid: this.userGuid,
        modifiedBy: this.userGuid,
      };

      this.spinner.show();
      this.admin.updateProfile(finalResponse).subscribe((res: any) => {
        this.spinner.hide();
        if (res.issuccessfull) {
          Swal.fire({
            title: 'Added',
            text: 'Profile details updated successfully',
            icon: 'success',
          });
          this.get();
        } else {
          Swal.fire({
            title: 'Warning',
            text: 'Something went wrong',
            icon: 'error',
          });
        }
      });
    }
  }
}
