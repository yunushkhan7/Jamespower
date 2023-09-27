import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-settings',
  templateUrl: './update-settings.component.html',
  styleUrls: ['./update-settings.component.scss']
})
export class UpdateSettingsComponent implements OnInit {
  screen = false;
  viewstand = false;
  addstand = false;
  editstand = false;
  DeleteAgeform: FormGroup;
  submitted = false;
  error: string
  screendays: any;
  logdays: string;

  public retention: any = {
    "passwordConfigId": '',
    "passwordExcel": "",
    "policyDays": ''
  

  };

  constructor(
    private spinner: NgxSpinnerService,
    private adminstrationservice: adminstrationServices,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.get();
    this.DeleteAgeform = this.formBuilder.group({
      patientReg: ['', Validators.required]
    });
  }

  Reset() {
    this.DeleteAgeform.reset();
    this.submitted = false;
  }

  get() {
     this.spinner.show()
    this.adminstrationservice.GetExcelFilePassword().subscribe((data: any) => {
    console.log(data);
    this.retention.policyDays=data.detail.policyDays
       this.spinner.hide()
    })
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

  get f() { return this.DeleteAgeform.controls; }


  Submit(data) {
    this.submitted = true;
    if (this.DeleteAgeform.valid) {
      const datatosend = {
        "passwordConfigId": 1,
        "passwordExcel": "",
        "policyDays": data.policyDays
      }
      console.log(datatosend);

      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to submit',
        icon: 'question',
        backdrop:false,
        showCancelButton: true,
        confirmButtonColor: '#13c9ca',
        cancelButtonColor: '#ff8084',
        confirmButtonText: 'Yes',
      }).then((res) => {
        if (res.value) {
          this.spinner.show();
          this.adminstrationservice
            .PasswordExcelUpdate(datatosend)
            .subscribe((data) => {
              this.spinner.hide();
            

              console.log('finallygetting', data);
              if (data) {
                Swal.fire({
                  title: 'Submitted',
                  text: 'Data is submitted successfully',
                  icon: 'success',
                  backdrop:false
                });
              } else {
                Swal.fire({
                  text: 'something went wrong',
                  backdrop:false
                });
              }
            });
        }
      });
    } else return;
  }
  Refresh() { this.get() }
}
