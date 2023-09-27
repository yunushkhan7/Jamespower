import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { operationServices } from 'src/zsoonServices/operation.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  key: string = 'userName';
  reverse: boolean = false;
  public eventname: any;
  addtest = false;
  edittest = false;
  eventarr: any = [];
  testarr: any = [];
  spaces = false;
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  matcher = new MyErrorStateMatcher();

  public addtestt: any = {
    "eventName": '',
    "eventTest": '',
    "currency": '',
    "price": '',
    "mandatory": '',
    "eventId": 0,
  };
  public edittestt: any = {
    "testId": 0,
    "eventName": '',
    "eventTest": '',
    "currency": '',
    "price": '',
    "mandatory": '',
    "eventId": 0,
  };

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    var k = event ? event.which : event.keyCode;
    if (k == 32) { return false; }
    if (/^[0-9.]+(\.[0-9]{1,2})?$/.test(inp)) { return true; }
    else {
      event.preventDefault();
      return false;
    }
  }

  constructor(
    private spinner: NgxSpinnerService,
    private operatorservice: operationServices
  ) { }

  EventTest = new FormControl('', [
    Validators.required,
    this.noWhitespaceValidator,
    Validators.pattern('^[a-zA-Z @ -_.]*$'),
  ]);

  Currency = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z @ -_.]*$'),
  ]);

  Price = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+(.[0-9]{1,9})?$'),
  ]);

  Mandatory = new FormControl('', [
    Validators.required
  ]);

  Select = new FormControl('', [
    Validators.required
  ]);

  ngOnInit(): void {
    this.GetAllEvents();
    this.GetAllTests();
  }
  onChange(data) { this.pageno = data; }

  GetAllTests() {
    this.spinner.show();
    this.operatorservice.GetAllTest().subscribe((data: any) => {
      this.testarr = data.tests;
      console.log(this.testarr)
      // this.testarr.forEach(ele => {
      //   // ele.lastLoginOn = ele.lastLoginOn.slice(0, 10);
      //   let da = ele.lastLoginOn;
      //   let yy = da.substr(0, 4);
      //   let mm = da.substr(5, 2);
      //   let dd = da.substr(8, 2);
      //   let tt = da.substr(11,5);
      //   ele.lastLoginOn = dd + '-' + mm + '-' + yy+ ' ' + tt ;
      //   ele.lastLoginOn = ele.lastLoginOn == "01-01-0001 00:00" ? ele.lastLoginOn = "N/A" : ele.lastLoginOn;
      // });

      this.spinner.hide();
    });
  }

  GetAllEvents() {
    this.operatorservice.GetAllEvents().subscribe((data: any) => {
      this.eventarr = data.events;
    });
  }

  SubmitTest(data) {
    console.log(data);
    let dec = data.price;
    let decimal_value = Math.round(dec * 100) / 100;
    let eventtest = true;
    var no_start_space: string = data.eventTest;

    if (no_start_space.startsWith(' ')) {
      eventtest = false;
      this.spaces = true;
    }

    if (data.eventTest != '' && data.currency != '' && data.price != '' && data.mandatory != '' && data.eventId != 0 && eventtest == true) {
      this.operatorservice.GetAllEvents().subscribe((data: any) => {
        this.eventarr = data.events;
      });
      this.eventarr.forEach((e) => {
        if (e.id == data.eventId) {
          this.eventname = e.name;
        }
      });

      const datatosend = {
        // eventName: this.eventname,
        // testCode:data.testCode,
        // specimen:data.specimen,
        eventId: data.eventId,
        eventTest: data.eventTest,
        currency: data.currency,
        price: decimal_value,
        mandatory: data.mandatory,
        "modifiedBy": localStorage.getItem('userId'),
      };

      console.log('datatosend', datatosend)
      this.operatorservice.InsertTest(datatosend).subscribe((data: any) => {
        if (data.issuccessfull == true) {
          Swal.fire({
            title: 'Added',
            text: 'Test is added successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
          });
          this.GetAllTests();
          this.addtest = false;
        }
      });
    } else {
      this.Select.markAsTouched();
      this.EventTest.markAsTouched();
      this.Price.markAsTouched();
      this.Currency.markAsTouched();
      this.Mandatory.markAsTouched();
    }
  }

  UpdateTest(data) {
    let eventtest = true;
    var no_start_space: string = data.eventTest;

    if (no_start_space.startsWith(' ')) {
      eventtest = false;
      this.spaces = true;
    }

    if (data.eventTest != '' && data.currency != '' && data.price != '' && data.mandatory != '' && data.eventId != null && eventtest == true) {
      this.operatorservice.GetAllEvents().subscribe((data: any) => {
        this.eventarr = data.events;
      });
      this.eventarr.forEach((e) => {
        if (e.id == data.eventId) {
          this.eventname = e.name;
        }
      });
      const datatosend = {
        // eventName: this.eventname,
        // testCode:data.testCode,
        // specimen:data.specimen,
        testId: data.testId,
        eventId: data.eventId,
        eventTest: data.eventTest,
        currency: data.currency,
        price: Number(data.price),
        mandatory: data.mandatory,
        "modifiedBy": localStorage.getItem('userId'),
      };

      this.operatorservice.UpdateTest(datatosend).subscribe((data: any) => {
        if (data.issuccessfull == true) {
          Swal.fire({
            title: 'Updated',
            text: 'Test is updated successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
          });
          this.GetAllTests
          this.edittest = false;
        }
      });
    } else {
      this.Select.markAsTouched();
      this.EventTest.markAsTouched();
      this.Price.markAsTouched();
      this.Currency.markAsTouched();
      this.Mandatory.markAsTouched();
    }
  }

  DeleteTest(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
    }).then((res) => {
      if (res.value) {
        this.operatorservice.DeleteTest(id).subscribe((success) => {
          this.GetAllTests();
          if (success) {
            Swal.fire('Deleted', 'Test has been deleted', 'success');
          }
        });
      }
    });
  }


  AddTest() {
    this.addtestt = {
      "testCode": '',
      "eventName": "",
      "eventTest": "",
      "currency": "",
      "price": "",
      "mandatory": "",
      "eventId": "",
      "specimen": ""
    };
    this.Select.reset();
    this.EventTest.reset();
    this.Price.reset();
    this.Currency.reset();
    this.Mandatory.reset();
    this.addtest = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  EditTest(test) {
    this.Select.reset();
    this.EventTest.reset();
    this.Price.reset();
    this.Currency.reset();
    this.Mandatory.reset();
    this.edittestt = test;
    this.edittest = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  Cancel() {
    this.GetAllTests();
    this.addtest = false;
    this.edittest = false;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
