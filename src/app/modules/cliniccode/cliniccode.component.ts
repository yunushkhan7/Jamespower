import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliniccode',
  templateUrl: './cliniccode.component.html',
  styleUrls: ['./cliniccode.component.scss']
})
export class CliniccodeComponent implements OnInit {

  clinics = [];
  searchText
  addclinic = false;
  editclinic = false;
  pageno: any = 5;
  q: any
  key: string = 'userName'
  reverse: boolean = false;

  public insertclinic = {
    "clinicHCI": "",
    "clinicName": "",
    "id": '',
  }

  public updateclinic = {
    "clinicHCI": "",
    "clinicName": "",
    "id": '',
  }
  constructor(
    private extraservice: ExtraService,
    private spinner: NgxSpinnerService
  ) { }

  onChange(data) { this.pageno = data }

  ClinicCode = new FormControl('', [
    Validators.required,
  ])

  ClinicName = new FormControl('', [
    Validators.required,
  ])

  ngOnInit(): void {
    this.GetAllClinics();
  }

  GetAllClinics() {
    this.spinner.show();
    this.extraservice.GetAllClinic().subscribe((data: any) => {
      this.clinics = data.clinic
      this.spinner.hide();
    })
  }

  AddClinic() {
    this.insertclinic = {
      "clinicHCI": "",
      "clinicName": "",
      "id": '',
    }
    this.ClinicCode.reset();
    this.ClinicName.reset();
    this.addclinic = true;
    this.editclinic = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  EditClinic(editclinic) {
    this.updateclinic = editclinic
    this.ClinicCode.reset();
    this.ClinicName.reset();
    this.addclinic = false;
    this.editclinic = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  SaveClinic(data) {
    if (data.clinicHCI && data.clinicName) {
      console.log('data=============>',data);
    const datatosend = {
      clinicHCI: data.clinicHCI,
      clinicName: data.clinicName,
      lastUpdatedBy: localStorage.getItem('userId'),
    }
    console.log(datatosend);
    this.extraservice.InsertClinic(datatosend).subscribe((data: any) => {
      Swal.fire({
        title: 'Created',
        text: 'Clinic is created successfully!',
        icon: 'success',
        confirmButtonColor: '#ff8084',
      });
      this.addclinic = false;
      this.GetAllClinics();
    })
    } else {
      this.ClinicCode.markAsTouched();
      this.ClinicName.markAsTouched();
    }
  }

  UpdateClinic(data) {
    if (data.clinicHCI && data.clinicName) {
    const datatosend = {
      id: data.id,
      clinicHCI: data.clinicHCI,
      clinicName: data.clinicName,
      lastUpdatedBy: localStorage.getItem('userId'),
    }
    console.log(datatosend);
    this.extraservice.UpdateCinic(datatosend).subscribe((data: any) => {
      Swal.fire({
        title: 'Updated',
        text: 'clinic is updated successfully!',
        icon: 'success',
        confirmButtonColor: '#ff8084',
      });
      this.editclinic = false;
      this.GetAllClinics();
    })
    } else {
      this.ClinicCode.markAsTouched();
      this.ClinicName.markAsTouched();
    }
  }

  DeleteClinic(clinicId) {
    Swal.fire({
      title: 'Are you sure',
      text: 'You want to delete this Clinic',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
    }).then((res) => {
      if (res.value) {
        this.extraservice.DeleteCinic(clinicId)
          .subscribe(success => {
            this.GetAllClinics();
            if (success) {
              Swal.fire(
                'Deleted',
                'clinic was successfully deleted',
                'success'
              )
            }
          })
      }
    })
  }

  Cancel() {
    this.GetAllClinics();
    this.addclinic = false;
    this.editclinic = false;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }

}
