import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  addInsurance = false;
  editInsurance = false;
  insurances = []
  searchText;
  pageno: any = 5;
  q: any
  key: string = 'userName'
  reverse: boolean = false
  matcher = new MyErrorStateMatcher();
  public insert_insurance = {
    "companyCode": "",
    "companyName": "",
    "active": "",
  }
  public update_insurance = {
    "companyCode": "",
    "companyName": "",
    "active": "",
  }

  constructor(
    private extraservices: ExtraService,
    private spinner: NgxSpinnerService) { }

  CompanyCode = new FormControl('', [
    Validators.required,
  ])

  CompanyName = new FormControl('', [
    Validators.required,
  ])

  Active = new FormControl('', [
    Validators.required,
  ])

  ngOnInit(): void {
    this.GetAllInsurance();
  }
  onChange(data) { this.pageno = data }

  GetAllInsurance() {
    this.spinner.show();
    this.extraservices.GetAllInsurance().subscribe((data: any) => {
      console.log('Insurance', data)
      this.insurances = data.insurance;
      this.spinner.hide();
    })
  }

  AddInsurance() {
    this.insert_insurance = {
      "companyCode": "",
      "companyName": "",
      "active": "",
    }
    this.CompanyCode.reset();
    this.CompanyName.reset();
    this.Active.reset();
    this.addInsurance = true;
    this.editInsurance = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  EditInsurance(insurance) {
    insurance.active ? insurance.active = "yes" : insurance.active = "no";
    this.CompanyCode.reset();
    this.CompanyName.reset();
    this.Active.reset();
    this.update_insurance = insurance;
    console.log('final res',this.update_insurance);
    this.addInsurance = false;
    this.editInsurance = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  SaveInsurance(data) {
    if (data.companyCode && data.companyName && data.active) {
      let isactive = data.active == "yes" ? true : false
      const datatosend = {
        companyCode: data.companyCode,
        companyName: data.companyName,
        active: isactive,
        lastUpdatedBy: localStorage.getItem('userId')
      }
      this.extraservices.InsertInsurance(datatosend).subscribe((data: any) => {
        if (data.issuccessfull) {
          Swal.fire({
            title: 'Created',
            text: 'Insurance is created Successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084'
          });
          this.addInsurance = false;
          this.GetAllInsurance();
        }
      })
    } else {
      this.CompanyCode.markAsTouched();
      this.CompanyName.markAsTouched();
      this.Active.markAsTouched();
    }
  }

  UpdateInsurance(data) {
    if (data.companyCode && data.companyName && data.active) {
      let isactive = data.active == "yes" ? true : false
      const datatosend = {
        id: data.id,
        companyCode: data.companyCode,
        companyName: data.companyName,
        active: isactive,
        lastUpdatedBy: localStorage.getItem('userId')
      }
      console.log(datatosend)
      this.extraservices.UpdateInsurance(datatosend).subscribe((data: any) => {
        console.log(data);
        if (data.issuccessfull) {
          Swal.fire({
            title: 'Updated',
            text: 'Insurance is updated Successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084'
          });
          this.editInsurance = false;
        }
        this.GetAllInsurance();
      })
    } else {
      this.Active.markAsTouched();
      this.CompanyCode.markAsTouched;
      this.CompanyName.markAsTouched();
    }
  }

  DeleteInsurance(insuracneId) {
    Swal.fire({
      title: 'Are you sure',
      text: 'You want to delete this insurance',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
    }).then((res) => {
      if (res.value) {
        this.extraservices.DeleteInsurance(insuracneId)
          .subscribe(success => {
            this.GetAllInsurance();
            if (success) {
              Swal.fire(
                'Deleted',
                'Insurance was successfully deleted',
                'success'
              )
            }
          })
      }
    })
  }

  Cancel() {
    this.GetAllInsurance();
    this.editInsurance = false;
    this.addInsurance = false;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }
}
