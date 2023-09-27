import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserIdleService } from 'angular-user-idle';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss'],
})
export class AuthorizedComponent implements OnInit {
  error: string
  spaces = false;
  mobilersult1 = false
  mobilersult = false
  q: any
  searchText;
  pageno: any = 5;
  text = '';
  action = 'black';
  fileName = 'ExcelSheet.xlsx';
  table = false;
  table1 = true;
  addauthorized = false;
  editauthorized = false;
  viewfleet = false;
  timeStart = false;
  seconds = 5;
  authorized: any = [];
  filetypes: any = [];
  key: string = 'userName'
  reverse: boolean = false
  matcher = new MyErrorStateMatcher();

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  public addNumber: any = {
    "phoneNo": "",
    "createdBy": "",
    "remarks": "",
  };

  public editNumber: any = {
    "id": '',
    "phoneNo": "",
    "remarks": "",
    "modifiedBy": "",
  };

  phoneno = new FormControl('', [
    Validators.required,
    this.noWhitespaceValidator,
    Validators.minLength(8),
  ]);

  Remarks = new FormControl('', [
    Validators.required,
  ]);

  Remarks1 = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private spinner: NgxSpinnerService,
    private adminstrationservice: adminstrationServices,
    private userIdle: UserIdleService
  ) { }

  ngOnInit(): void {
    (error) => {
      this.error = error;
    };
    this.get();
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

  stop() {
    alert('timer is stopped');
    this.userIdle.stopTimer();
    this.seconds = 5;
    this.timeStart = false;
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }

  keyPressContact(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else if (/[1-9]{1}[0-9]{9}/.test(event.keyCode)) {
      event.preventDefault();
      return true;
    } else {
      return true;
    }
  }

  get() {
    this.spinner.show();
    this.adminstrationservice.getAllAuthPhoneNo().subscribe((res: any) => {
      this.authorized = res.authPhones;
      this.spinner.hide();
    });
  }

  AddPhoneno() {
    this.addauthorized = true;
    this.editauthorized = false;
    this.viewfleet = false;
    this.addNumber = {
      'phoneNo': '',
    };
    this.Remarks1.reset()
    this.phoneno.reset()
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
  onChange(data) { this.pageno = data }

  EditNumber(auth) {
    this.editauthorized = true;
    this.addauthorized = false;
    this.viewfleet = false;
    this.editNumber = auth
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    this.Remarks1.reset()
    this.phoneno.reset()
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  Cancel() {
    this.get()
    this.viewfleet = false;
    this.addauthorized = false;
    this.editauthorized = false;
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  SaveData(data) {
    if (data.phoneNo != "" && data.remarks != undefined) {
      let fname = true;
      let mobilersult = false
      var str: string = data.phoneNo;
      if (str.startsWith(" ")) {
        fname = false;
        this.spaces = true;
      }
      if (data.phoneNo.length >= 8) {
        mobilersult = true;
      }
      if (mobilersult == true) {
        const datatosend = {
          phoneNo: data.phoneNo,
          remarks: data.remarks,
          createdBy: localStorage.getItem('userId'),
        };
        this.adminstrationservice.InserAuthorizedNumber(datatosend).subscribe((data) => {
          if (data) {
            Swal.fire({
              title: 'Added',
              text: 'Phone no.  added successfully',
              confirmButtonColor: '#ff8084',
            });
            this.get();
            this.addauthorized = false;
          }
          this.phoneno.markAsUntouched();
          this.Remarks1.markAsUntouched();
        });
      }
    }
    else {
      this.phoneno.markAsTouched();
      this.Remarks1.markAsTouched();
    }
  }

  update(data) {
    if (data.phoneNo != "" && data.remarks != "") {
      const datatosend = {
        "id": data.id,
        phoneNo: data.phoneNo,
        remarks: data.remarks,
        "modifiedBy": localStorage.getItem('userId'),
      }

      this.adminstrationservice.UpdateAuthorizedNo(datatosend).subscribe(data => {
        if (data) {
          Swal.fire({
            title: 'Updated',
            text: 'Phone no is saved successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084'
          });
        }
        this.get()
        this.editauthorized = false
      })
    }
    else {
      this.phoneno.markAsTouched();
      this.Remarks.markAsTouched();
    }
  }

  delete(Id) {
    Swal.fire({
      title: 'Are you sure',
      text: 'you want to delete this phone no ',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      icon: 'question'
    }).then((result) => {
      if (result.value) {
        this.adminstrationservice.DeletePhoneNo(Id).subscribe(res => {
          this.get()
          Swal.fire({
            text: 'Phone no was successfully deleted',
            icon: 'success'
          })
        })
      }
    })
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }
}
