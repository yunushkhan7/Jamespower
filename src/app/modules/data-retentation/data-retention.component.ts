import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-retention',
  templateUrl: './data-retention.component.html',
  styleUrls: ['./data-retention.component.scss'],
})
export class DataRetentionComponent implements OnInit {
  screen = false;
  viewstand = false;
  addstand = false;
  editstand = false;
  DeleteAgeform: FormGroup;
  submitted = false;
  error: string;
  screendays: any;
  logdays: string;

  public retention: any = {
    accessLog: '',
    accessRequest: '',
    activityLogs: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private adminstrationservice: adminstrationServices,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.get();
    this.DeleteAgeform = this.formBuilder.group({
      patientReg: ['', Validators.required],
      userlog: ['', Validators.required],
    });
  }

  Reset() {
    this.DeleteAgeform.reset();
    this.submitted = false;
  }

  get() {
    this.spinner.show();
    this.adminstrationservice.GetRetention().subscribe((data: any) => {
      console.log('gettinggg', data);
      this.retention.accessLog = data.dataRetensions[0].accessLog;
      this.retention.accessRequest = data.dataRetensions[0].accessRequest;
      this.retention.activityLogs = data.dataRetensions[0].activityLogs;
      this.spinner.hide();
    });
  }

  keyPressContact(event) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
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

  get f() {
    return this.DeleteAgeform.controls;
  }

  Submit(data) {
    this.submitted = true;
    if (this.DeleteAgeform.valid) {
      const dataSending = {
        id: 1,
        accessLog: data.accessLog,
        accessRequest: data.accessRequest,
        activityLogs: data.activityLogs,
        lastEditedBy: localStorage.getItem('userId'),
      };
      console.log(dataSending);

      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to submit',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#13c9ca',
        cancelButtonColor: '#ff8084',
        confirmButtonText: 'Yes',
        backdrop: false
      }).then((res) => {
        if (res.value) {
          this.spinner.show();
          this.adminstrationservice
            .DataRetention(dataSending)
            .subscribe((data) => {
              this.spinner.hide();
            

              console.log('finallygetting', data);
              if (data) {
                Swal.fire({
                  title: 'Submitted',
                  text: 'Data is submitted successfully',
                  icon: 'success',
                  backdrop: false
                });
              } else {
                Swal.fire({
                  text: 'something went wrong',
                  backdrop: false
                });
              }
            });
        }
      });
    } else return;
  }
  Refresh() {
    this.get();
  }
}
