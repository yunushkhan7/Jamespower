import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
import { operationServices } from 'src/zsoonServices/operation.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  key: string = 'userName';
  reverse: boolean = false;
  spaces = false;
  error: string;
  events: any = [];
  clinics: any = [];
  doctors: any = [];
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  addevent = false;
  editEvent = false;
  matcher = new MyErrorStateMatcher();

  public addEvents: any = {
    'name': '',
    'createdBy': '',
    'remarks': ''
  };

  public editEvents: any = {
    'id': '',
    'phoneNo': '',
    'modifiedBy': '',
    'remarks': ''
  };

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  Name = new FormControl('', [
    Validators.required,
  ]);

  Remarks = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private spinner: NgxSpinnerService,
    private operatorservice: operationServices,
    private extraservice: ExtraService
  ) { }

  ngOnInit(): void {
    this.get();
    (error) => {
      this.error = error;
    };
  }

  get() {
    this.spinner.show();
    this.operatorservice.GetAllEvents().subscribe((result: any) => {
      this.events = result.events;
      this.spinner.hide();
    });
  }



  AddEvent() {
    this.Name.reset();
    this.Remarks.reset();
    this.addevent = true;
    this.addEvents = {
      'name': '',
      'createdBy': '',
      'remarks': '',
    };
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }


  EditEvent(event) {
    this.Name.reset();
    this.Remarks.reset();
    this.editEvent = true;
    this.editEvents = event;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  Cancel() {
    this.get();
    this.addevent = false;
    this.editEvent = false;
  }

  onChange1(data) { this.pageno = data; }

  Save(data) {
    console.log(data)
    if (data.name != '' && data.remarks != '') {
      let fname = true;
      var str: string = data.name;
      if (str.startsWith(' ')) { fname = false; this.spaces = true; }
      const datatosend = {
        name: data.name,
        remarks: data.remarks,
        createdBy: localStorage.getItem('userId'),
      };

      this.operatorservice.AddEvents(datatosend).subscribe((result) => {
        if (result) {
          Swal.fire({
            title: 'Added',
            text: 'Event added successfully',
            confirmButtonColor: '#ff8084',
            icon: 'success',
          });
          this.get();
          this.addevent = false;
        }
      });
    } else {
      this.Name.markAsTouched();
      this.Remarks.markAsTouched();
    }
  }

  UpdateEvent(data) {
    console.log(data)
    if (data.name != '' && data.remarks != '') {
      const datatosend = {
        id: data.id,
        name: data.name,
        remarks: data.remarks,
        modifiedBy: localStorage.getItem('userId'),
      };

      this.operatorservice.UpdateEvents(datatosend).subscribe((data) => {
        if (data) {
          Swal.fire({
            title: 'Updated',
            text: 'Event update successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
          });
        }
        this.get();
        this.editEvent = false;
      });
    } else {
      this.Name.markAsTouched();
      this.Remarks.markAsTouched();
    }
  }

  delete(Id) {
    Swal.fire({
      title: 'Are you sure',
      text: 'you want to delete this event',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      icon: 'question',
    }).then((result) => {
      if (result.value) {
        this.operatorservice.DeleteEvent(Id).subscribe((res: any) => {
          if ((res.message = 'Event Having Tests' && res.sucess == false)) {
            Swal.fire({
              text: 'Event Having Tests',
              icon: 'warning',
            });
          } else {
            Swal.fire({
              text: 'Event was successfully deleted',
              icon: 'success',
            });
          }
          this.get();
        });
      }
    });
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
