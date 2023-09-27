import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyErrorStateMatcher } from 'src/app/changepassword/changepassword.component';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import Swal from 'sweetalert2';

export interface data {
  Status: string;
  StatusCode: string;
}

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.scss'],
})
export class ManageuserComponent implements OnInit {
  key: string = '';
  reverse: boolean = false;
  error: string;
  mobilersult = false
  mobilersult1 = false
  spaces = false;
  q: any
  searchText;
  page = 1
  pageno: any = 5;
  text = '';
  matcher = new MyErrorStateMatcher();
  adduser = false;
  edituser = false;
  usersList: any = []
  userTypes: any = []
  roles: any = []
  rolesbyuser
  firstName = ""
  email = ""
  mobileNo = ""
  password = ""
  userTypeCode = ""
  roleId: any;
  refdata;
  demo: any = [];

  StatusList: data[] = [
    {
      Status: 'Active',
      StatusCode: 'Active',
    },
    {
      Status: 'Blocked',
      StatusCode: 'Blocked',
    },
  ];

  public addusers: any = {
    "roleId": '',
    "username": "",
    "email": "",
    "mobileNo": "",
    "remarks": "",
    "password": "",
    "createdBy": ""
  }

  public editusers: any = {
    "userGuid": "",
    "userStatus": "",
    "roleId": '',
    "userName": "",
    "remarks": "",
    "email": "",
    "mobileNo": "",
    "modifiedBy": ""
  }

  constructor(
    private spinner: NgxSpinnerService,
    private adminstrationService: adminstrationServices
  ) { }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
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

  onKey(x) {
    this.text += x.target.value + ' | ';
    if (x.target.value.length <= 7) {
      this.mobilersult = true;
    } else {
      this.mobilersult = false
    }
    if (x.target.value.length >= 13) {
      this.mobilersult1 = true
    } else {
      this.mobilersult1 = false
    }
  }

  keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    var k = event ? event.which : event.keyCode;
    if (k == 32) { return false }
    if (/[a-zA-Z1-9_@.-0]/.test(inp)) { return true; }
    else { event.preventDefault(); return false; }
  }

  FirstName = new FormControl('', [
    Validators.required,
    this.noWhitespaceValidator,
    Validators.pattern('^[a-zA-Z @ -_.]*$'),
  ]);

  LastName = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]*$')
  ]);

  usertype = new FormControl('', [
    Validators.required,
  ]);

  roletype = new FormControl('', [
    Validators.required,
  ]);

  userstatus = new FormControl('', [
    Validators.required,
  ]);

  Emails = new FormControl('', [
    Validators.required,
    Validators.pattern("^[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,4}$")
  ]);

  contact = new FormControl('', [
    Validators.required,
    Validators.pattern('[- +()0-9]+'),
    Validators.minLength(8),
    Validators.maxLength(12)
  ]);

  Password = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*?[a-z])(.{14,}|(?=.*?[A-Z])(?=.*?[0-13])(?=.*?[#?!@$%^&*-]).{14,14})$'),
    Validators.minLength(14), Validators.maxLength(14)
  ]);

  address1 = new FormControl('', [
    Validators.required,
    this.noWhitespaceValidator,
  ]);

  ngOnInit(): void {
    (error) => { this.error = error };
    this.GetAllUsers();
    this.GetAllUsersTypes();
    this.GetAllRoles();
  }

  GetAllUsers() {
    this.spinner.show()
    this.adminstrationService.GetAllUsers().subscribe((data: any) => {
      this.usersList = data.data.users;
      this.usersList.forEach(ele => {
        // ele.lastLoginOn = ele.lastLoginOn.slice(0, 10);
        let da = ele.lastLoginOn;
        let yy = da.substr(0, 4);
        let mm = da.substr(5, 2);
        let dd = da.substr(8, 2);
        let tt = da.substr(11, 5);
        ele.lastLoginOn = dd + '-' + mm + '-' + yy + ' ' + tt;
        ele.lastLoginOn = ele.lastLoginOn == "01-01-0001 00:00" ? ele.lastLoginOn = "N/A" : ele.lastLoginOn;
      });
      this.spinner.hide()
    })
  }

  GetAllUsersTypes() {
    this.adminstrationService.GetAllUsersTypes().subscribe((data: any) => {
      this.userTypes = data.userTypes
    })
  }

  GetAllRoles() {
    this.adminstrationService.GetAllRoles().subscribe((data: any) => {
      this.roles = data.roles
    })
  }

  onChange(data) { this.pageno = data }

  AddUser() {
    this.adduser = true;
    this.edituser = false;
    this.FirstName.reset()
    this.LastName.reset();
    this.usertype.reset();
    this.roletype.reset();
    this.Emails.reset();
    this.Password.reset();
    this.contact.reset();
    this.addusers = {
      "roleId": '',
      "username": "",
      "email": "",
      "mobileNo": "",
      "password": "",
      "createdBy": ""
    }
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  EditUser(user) {
    this.edituser = true;
    this.adduser = false;
    this.editusers = user
    this.roleId = this.editusers.roleId
    this.userTypes.forEach(element => {
      if (element.userTypeCode == this.userTypeCode) {
        this.adminstrationService.GetRolesByUserType(element.userTypeId).subscribe(data => {
          this.rolesbyuser = data
          this.roles = this.rolesbyuser.roles
        })
      }
    });
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  Cancel() {
    this.adduser = false;
    this.edituser = false;
    this.spinner.show();
    this.GetAllUsers();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }

  SubmitUsers(data) {
    if (data.userName != "" && data.password != "" && data.remarks != "" &&   data.email !="" && data.roleId != null) {
      let pass = new RegExp('^(?=.*?[a-z])(.{14,}|(?=.*?[A-Z])(?=.*?[0-13])(?=.*?[#?!@$%^&*-]).{14,14})$')
      let emailVal = new RegExp('^[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,4}$')
      let pv = pass.test(data.password)
      let EmailVal = emailVal.test(data.email)
      let fname = true;
      let add = true
      let mobilersult1 = false;
      var str: string = data.username;
      if (data.mobileNo.length >= 11) { mobilersult1 = true; }
      if (str.startsWith(" ")) {
        fname = false;
        this.spaces = true;
      }
      // if (data.roleId == 9) {
      //   if (data.mobileNo.length == 0) {
      //     this.contact.markAsTouched();
      //     mobilersult1 = true
      //     Swal.fire({
      //       title: 'Mandatory',
      //       text: 'Mobileno is mandatory for adminstrator',
      //       icon: 'warning'
      //     })
      //   }
      // }

      if (fname == true && add == true && mobilersult1 == false && pv == true  && EmailVal == true) {
        this.userTypes.forEach(element => {
          if (element.userTypeId == data.userTypeCode) {
            data.userTypeCode = element.userTypeCode;
          }
        });

        const datatosend = {
          "userName": data.userName,
          "roleId": data.roleId,
          "email": data.email,
          "password": data.password,
          "mobileNo": data.mobileNo,
          "createdBy": localStorage.getItem('userId')
        }
        this.adminstrationService.addUser(datatosend).subscribe((data: any) => {
          if (data.sucess) {
            Swal.fire({
              title: 'Added',
              text: 'User was successfully created!',
              icon: 'success',
              confirmButtonColor: '#ff8084',
              backdrop: false
            });
            this.GetAllUsers();
            this.adduser = false;
          } else {
            Swal.fire({
              title: 'Existed',
              text: 'User is already Existed !',
              icon: 'warning',
              confirmButtonColor: '#ff8084',
              backdrop: false
            });
            this.adduser = true;
          }
        })
      }
    } else {
      this.FirstName.markAsTouched();
      this.LastName.markAsTouched();
      this.usertype.markAsTouched();
      this.roletype.markAsTouched();
      this.Password.markAsTouched();
      // this.contact.markAsTouched();
this.Emails.markAsTouched()
    }
  }

  UpdateUser(Update) {
    console.log(Update);

    if (Update.userName != "" && Update.password != "" && Update.remarks != "" && Update.roleId != null) {
      let emailVal = new RegExp('^[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,4}$')
      let EmailVal = emailVal.test(Update.email)

      let mobilersult1 = false;
      if (Update.mobileNo.length >= 11) { mobilersult1 = true; }
      if (Update.roleId == 9) {
        if (Update.mobileNo.length == 0) {
          this.contact.markAsTouched();
          mobilersult1 = true
          Swal.fire({
            title: 'Mandatory',
            text: 'Mobileno is mandatory for adminstrator',
            icon: 'warning',
            backdrop: false
          })
        }
      }
      if (mobilersult1 == false  && EmailVal==true) {
        const update = {
          "userGuid": Update.userGuid,
          "roleId": Update.roleId,
          "userName": Update.userName,
          "lastName": Update.lastName,
          "email": Update.email,
          "remarks": Update.remarks,
          "mobileNo": Update.mobileNo,
          "userStatus": Update.userStatus,
          "address": Update.address,
          "modifiedBy": localStorage.getItem('userId'),
        }

        this.adminstrationService.updateUser(update).subscribe(data => {
          if (data) {
            Swal.fire({
              title: 'Updated',
              text: 'User is updated successfully!',
              icon: 'success',
              confirmButtonColor: '#ff8084',
              backdrop: false
            });
          }
          this.GetAllUsers();
          this.edituser = false;
        })
      }
    } else {
      this.FirstName.markAsTouched();
      this.LastName.markAsTouched();
      this.usertype.markAsTouched();
      this.roletype.markAsTouched();
      this.Password.markAsTouched();
      this.contact.markAsTouched();
      this.Emails.markAsTouched();
    }
  }

  DeleteUser(userGuid) {
    Swal.fire({
      title: 'Are you sure',
      text: 'You want to delete this user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
      backdrop: false
    }).then((res) => {
      if (res.value) {
        this.adminstrationService.DeleteUser(userGuid).subscribe((success: any) => {
          this.GetAllUsers();
          if (success.sucess) {
            Swal.fire({
              title: 'Deleted',
              
              text: 'User was successfully deleted',
              icon: 'success',
              backdrop: false,
            
            }
            
            
            )
          }
        })
      }
    })
  }
}
