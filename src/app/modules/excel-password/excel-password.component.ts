import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import { operationServices } from 'src/zsoonServices/operation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-excel-password',
  templateUrl: './excel-password.component.html',
  styleUrls: ['./excel-password.component.scss']
})
export class ExcelPasswordComponent implements OnInit {
  screen = false;
  viewstand = false;
  addstand = false;
  editstand = false;
  DeleteAgeform: FormGroup;
  submitted = false;
error:string
  public retention: any = {
    "passwordConfigId": '',

    "passwordExcel": "",
  "policyDays": ""
  
  

  };
  screendays: any;
  logdays: string;

  constructor(
    private spinner: NgxSpinnerService,
    private operationservice: operationServices,
    private adminstrationservice: adminstrationServices,

    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
   // this.spinner.show();
    this.get()
    this.DeleteAgeform = this.formBuilder.group({
      excel: ['', Validators.required],
      policy: ['', Validators.required],

    

    });
  }

  Reset() {
    this.DeleteAgeform.reset();
    //  this.deleteage={
    //   "screeningDays": '',
    //   "logDays": '',

    // }

    //   this.DeleteAgeform = this.formBuilder.group({
    //     screendays: [''],
    //     logdays: [''],

    // });
    // this.f.screendays.errors.required = false
    // this.f.logdays.errors.required = false
    this.submitted = false;
  }

  get(){
    this.spinner.show()
    this.adminstrationservice.GetExcelFilePassword().subscribe((data:any) =>{
      console.log('gettinggg',data)
      
       this.retention.passwordExcel=data.detail.passwordExcel
       this.retention.policyDays=data. detail.policyDays


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

  get f() {
    return this.DeleteAgeform.controls;
  }

  Submit(data) {
    console.log('keshavacheck',data);
    this.submitted = true;

    if (this.DeleteAgeform.invalid) {
      return;
  }

    const datatosend = {
      "passwordConfigId": 1,
      "passwordExcel":data.passwordExcel,
      "policyDays":data.policyDays,

      
    };
    console.log('finally', datatosend);
    this.adminstrationservice
          .PasswordExcelUpdate(datatosend)
          .subscribe((data) => {
            console.log('finallygetting', data);
            if (data) {
              Swal.fire({
                title: 'Updated',
                text: 'Settings updated successfully',
                icon: 'success',
              });
            } else {
              Swal.fire({
                text: 'something went wrong',
              });
            }
          });

    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'You want to submit',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#13c9ca',
    //   cancelButtonColor: '#ff8084',
    //   confirmButtonText: 'Yes',
    // })
    // .then((res) => {
      // if (res.value) {
        
      // }
    // });
      // return

  
}



 

}
