
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserIdleService } from 'angular-user-idle';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import { loginServices } from 'src/zsoonServices/loginservices';
import { ENTER, SPACE, TAB } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import Swal from 'sweetalert2';

export interface tabledata {
  columnName: string
}
export interface data {
  Pwd: string;
  PwdCode: boolean;
}
export interface data4 {
  Format: string;
  FormatCode: string;
}
export interface data2 {
  Type: string;
  TypeCode: string;
}
export interface data1 {
  Frequency: string;
  FreqCode: string;
}
export interface Fruit {
  name: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss'],
})
export class EmailsComponent implements OnInit {
  key: string = 'userName';
  reverse: boolean = false;
  emails: any = [];
  emailss: any = [];
  error: string;
  yes = false
  n = false
  spaces = false;
  mobilersult1 = false;
  mobilersult = false;
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  text = '';
  action = 'black';
  fileName = 'ExcelSheet.xlsx';
  table = false;
  table1 = true;
  addauthorized = false;
  editauthorized = false;
  viewfleet = false;
  rowslist: any = [];
  serologies: any = [];
  filetypeCode: any;
  downloadDateAndTime: any;
  public progress: number;
  public message: string;
  timeStart = false;
  seconds = 5;
  emailsList: any = [];
  clientX = 0;
  clientY = 0;
  column1 = 1;
  column2 = 2;
  column3 = 3;
  column4 = 4;
  column5 = 5;
  column6 = 6;
  column7 = 7;
  column8 = 8;
  column9 = 9;
  column10 = 10;
  column11 = 11;
  column12 = 12;
  column13 = 13;
  Emails: any = [];
  filetypes: any = [];
  public showerror = false;
  visible = true;
  selectable = false;
  removable = true;
  addOnBlur = true;
  public chips: any = [];
  readonly separatorKeysCodes = [ENTER, SPACE, TAB] as const;
  chipvalue = "white"
  rulesForm: FormGroup;
  fb: FormBuilder = new FormBuilder();
  public chkvalidate: boolean;
  public chkvalidate2 = true;
  public showvalidemail = false;

  PwdList: data[] = [
    {
      Pwd: 'Yes',
      PwdCode: true,
    },
    {
      Pwd: 'No',
      PwdCode: false,
    },
  ];

  TypesList: data2[] = [
    {
      Type: 'Patient Registration',
      TypeCode: 'Patient Registration',
    },
  ];

  FormatList: data4[] = [
    {
      Format: '.xlsx',
      FormatCode: '.xlsx',
    },
  ];

  FreqList: data1[] = [
    {
      Frequency: 'Daily',
      FreqCode: 'Daily',
    },
  ];

  ColumnList: tabledata[] = [
    {
      columnName: 'Report Name'
    },
    {
      columnName: 'Frequency'
    },
    {
      columnName: 'Types'
    },
    {
      columnName: 'Format'
    },
    {
      columnName: ' PWD Protected'
    },
    {
      columnName: 'Subject'
    },
    {
      columnName: 'Emails'
    },
    {
      columnName: 'Actions'
    }
  ]

  public addEmail: any = {
    "reportName": '',
    "frequency": '',
    "type": '',
    "format": '',
    "passpordProtected": '',
    "subject": '',
    "emails": [],
  };

  public editEmail: any = {
    "reportName": '',
    "frequency": '',
    "type": '',
    "format": '',
    "passpordProtected": '',
    "subject": '',
    "emails": [],
  };

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  Email = new FormControl('', [
    Validators.required,
    Validators.pattern('^[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,4}$'),
  ]);
  Subject = new FormControl('', [Validators.required]);
  Report = new FormControl('', [Validators.required]);
  freq = new FormControl('', [Validators.required]);
  Types = new FormControl('', [Validators.required]);
  Format = new FormControl('', [Validators.required]);
  pwd = new FormControl('', [Validators.required]);

  constructor(
    private spinner: NgxSpinnerService,
    private adminstrationservice: adminstrationServices,
    private userIdle: UserIdleService,
  ) { }

  ngOnInit(): void {
    this.rulesForm = this.fb.group({
      validateemails: this.fb.array([], [this.validateArrayNotEmpty]),
    });
    (error) => { this.error = error; };
    this.get();
  }

  private validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }
    return null;
  }

  private validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let finalval = re.test(String(email).toLowerCase());
    return finalval;
  }

  add(event: MatChipInputEvent) {
    this.showerror = false;
    const value = (event.value || '').trim();

    if (value) {
      if (this.validateEmail(value)) {
        const data1 = {
          "email": value,
          'invalid': false
        }
        this.chips.push(data1);
        this.chkvalidate = true;
        this.chipvalue = "lightgray"
        console.log(this.chipvalue);
        this.rulesForm.controls['validateemails'].setErrors({ incorrectEmail: false });
      } else {
        const data1 = {
          "email": value,
          'invalid': true
        }
        this.chipvalue = "red"
        this.chips.push(data1);
        this.chkvalidate = false;
        this.chkvalidate2 = false;
        this.rulesForm.controls['validateemails'].setErrors({ incorrectEmail: true });
      }
    }
    if (event.input) { event.input.value = '' }
  }

  remove(fruit): void {
    const index = this.chips.indexOf(fruit);
    if (index >= 0) { this.chips.splice(index, 1) }
  }

  get() {
    this.spinner.show();
    this.adminstrationservice.getAllEmails().subscribe((res: any) => {
      this.Emails = res.reports;
      this.Emails.forEach(mainobj => {
        let xyz = [];
        mainobj.emails.forEach(object => {
          xyz.push(object.email)
        });
        var str = xyz.toString();
        mainobj.dupmail = str;
      });
      this.spinner.hide();
    });
  }

  AddEmails() {
    this.chips = [];
    this.Email.reset()
    this.Subject.reset()
    this.pwd.reset();
    this.Format.reset()
    this.freq.reset()
    this.Types.reset()
    this.Report.reset()
    this.addauthorized = true;
    this.editauthorized = false;
    this.viewfleet = false;
    this.addEmail = { email: '' };

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  onChange(data) { this.pageno = data }

  EditEmail(e) {
    this.chips = [];
    e.emails.forEach(ele => {
      const x = {
        email: ele.email
      }
      this.chips.push(x);
    });
    this.editauthorized = true;
    this.addauthorized = false;
    this.viewfleet = false;
    this.editEmail = e;
    this.spinner.show();
    this.Email.reset();
    this.Subject.reset();
    this.Report.reset();
    this.pwd.reset();
    this.freq.reset();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  Cancel() {
    this.get();
    this.viewfleet = false;
    this.addauthorized = false;
    this.editauthorized = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  SaveData(data) {
    let finalcheck = true
    this.chips.forEach(element => {
      if (element.invalid) {
        finalcheck = false;
        this.showvalidemail = true;
      } else {
        this.chkvalidate2 = true;
      }
    });
    this.chkvalidate2 = finalcheck;
    if (this.chips.length != 0) { this.showerror = false }

    if (this.chips.length != 0 && data.subject != null && data.reportName != null && data.frequency != null && data.type != "" && data.format != null && data.passpordProtected != null && this.chkvalidate2) {
      const datatosend = {
        emails: this.chips,
        reportName: data.reportName,
        frequency: data.frequency,
        type: "Patient Registration",
        format: ".XLSX",
        passpordProtected: data.passpordProtected,
        subject: data.subject,
      };

      this.adminstrationservice.InserEmails(datatosend).subscribe((data) => {
        if (data) {
          Swal.fire({
            title: 'Added',
            text: 'Email added successfully',
            confirmButtonColor: '#ff8084',
          });
          this.get();
          this.addauthorized = false;
        }
        this.Email.markAsUntouched();
        this.Subject.markAsUntouched();
      });
    } else {
      this.showerror = true;
      this.Email.markAsTouched();
      this.Subject.markAsTouched();
      this.Report.markAsTouched()
      this.freq.markAsTouched()
      this.Types.markAsTouched()
      this.Format.markAsTouched()
      this.pwd.markAsTouched()
    }
  }

  update(data) {
    this.showerror = false;
    let finalcheck = true;
    this.chips.forEach(element => {
      if (element.invalid) {
        finalcheck = false;
        this.showvalidemail = true;
      } else {
        this.chkvalidate2 = true;
      }
    });
    this.chkvalidate2 = finalcheck;
    (this.chips.length != 0) ? this.showerror = false : this.showerror = true;
    if (this.chips.length != 0 && data.subject != '' && data.reportName != '' && data.frequency != '' && data.type != "" && data.format != '' && data.passpordProtected != null && this.chkvalidate2) {
      const datatosend = {
        scheduledReportsId: data.scheduledReportsId,
        emails: this.chips,
        reportName: data.reportName,
        frequency: data.frequency,
        type: "Patient Registration",
        format: ".XLSX",
        passpordProtected: data.passpordProtected,
        subject: data.subject,
      };
      this.adminstrationservice.UpdateEmails(datatosend).subscribe((data) => {
        console.log('update', data);
        if (data) {
          Swal.fire({
            title: 'Updated',
            text: 'Email is updated successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
          });
        }
        this.get();
        this.editauthorized = false;
      });
    } else {
      this.showerror = true;
      this.Email.markAsTouched();
      this.Subject.markAsTouched();
      this.Report.markAsTouched()
      this.freq.markAsTouched()
      this.pwd.markAsTouched()
    }
  }

  delete(Id) {
    Swal.fire({
      title: 'Are you sure',
      text: 'you want to delete this email ',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      icon: 'question',
    }).then((result) => {
      if (result.value) {
        this.adminstrationservice.DeleteEmails(Id).subscribe((res) => {
          this.get();
          Swal.fire({
            text: 'Email was successfully deleted',
            icon: 'success',
          });
        });
      }
    });
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
