import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctorcode',
  templateUrl: './doctorcode.component.html',
  styleUrls: ['./doctorcode.component.scss']
})
export class DoctorcodeComponent implements OnInit {
  searchText
  adddoc = false;
  editdoc = false;
  doctors = [];
  pageno: any = 5;
  q: any
  key: string = 'userName'
  reverse: boolean = false;

  public insertdoctor = {
    "doctorCode": "",
    "doctorName": "",
    "id": '',
  }

  public updatedoctor = {
    "doctorCode": "",
    "doctorName": "",
    "id": '',
  }

  constructor(
    private extraservice: ExtraService,
    private spinner: NgxSpinnerService
  ) { }

  onChange(data) { this.pageno = data }

  DoctorCode = new FormControl('', [
    Validators.required,
  ])

  DoctorName = new FormControl('', [
    Validators.required,
  ])

  ngOnInit(): void {
    this.GetAllDoctor();
  }

  GetAllDoctor() {
    this.spinner.show();
    this.extraservice.GetAllDoctor().subscribe((data: any) => {
      this.doctors = data.doctors;
      this.spinner.hide();
    })
  }

  AddDoctor() {
    this.insertdoctor = {
      "doctorCode": "",
      "doctorName": "",
      "id": '',
    }
    this.DoctorName.reset();
    this.DoctorCode.reset();
    this.adddoc = true;
    this.editdoc = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  EditDoctor(editdoctor) {
    console.log(editdoctor)
    this.updatedoctor = editdoctor;
    this.adddoc = false;
    this.editdoc = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  SaveDoctor(data) {
    if (data.doctorCode && data.doctorName) {
      const datatosend = {
        doctorCode: data.doctorCode,
        doctorName: data.doctorName,
        lastUpdatedBy: localStorage.getItem('userId'),
      }
      console.log(datatosend);
      this.extraservice.InsertDoctor(datatosend).subscribe((data: any) => {
        Swal.fire({
          title: 'Created',
          text: 'Doctor is created successfully!',
          icon: 'success',
          confirmButtonColor: '#ff8084',
        });
        this.adddoc = false;
        this.GetAllDoctor();
      })
    } else {
      this.DoctorCode.markAsTouched();
      this.DoctorName.markAsTouched();
    }
  }

  UpdateDoctor(data) {
    if (data.doctorCode && data.doctorName) {
      const datatosend = {
        id: data.id,
        doctorCode: data.doctorCode,
        doctorName: data.doctorName,
        lastUpdatedBy: localStorage.getItem('userId'),
      }
      console.log(datatosend);
      this.extraservice.UpdateDoctor(datatosend).subscribe((data: any) => {
        Swal.fire({
          title: 'Updated',
          text: 'Doctor is updated successfully!',
          icon: 'success',
          confirmButtonColor: '#ff8084',
        });
        this.editdoc = false;
        this.GetAllDoctor();
      })
    } else {
      this.DoctorCode.markAsTouched();
      this.DoctorName.markAsTouched();
    }
  }

  DeleteDoctor(doctor_id) {
    Swal.fire({
      title: 'Are you sure',
      text: 'You want to delete this Doctor',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
    }).then((res) => {
      if (res.value) {
        this.extraservice.DeleteDoctor(doctor_id)
          .subscribe(success => {
            this.GetAllDoctor();
            if (success) {
              Swal.fire(
                'Deleted',
                'doctor was successfully deleted',
                'success'
              )
            }
          })
      }
    })
  }

  Cancel() {
    this.GetAllDoctor();
    this.adddoc = false;
    this.editdoc = false;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }

}
