import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  error: string;
  addlocation = false;
  editlocation = false;
  locationarr = [];
  clinics = [];
  doctors = [];
  spaces = false;
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  key: string = 'userName';
  reverse: boolean = false;
  matcher = new MyErrorStateMatcher();

  public insertlocation: any = {
    "locationName": '',
  };

  public updatelocatiion: any = {
    "locationName": '',
    "id": 0
  };

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  Name = new FormControl('', [
    Validators.required
  ]);
  Remarks = new FormControl('', [
    Validators.required
  ]);
  Address = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private spinner: NgxSpinnerService,
    private adminstrationService: adminstrationServices,
    private extraservice: ExtraService
  ) { }

  ngOnInit(): void {
    (error) => { this.error = error };
    this.getAllLocationNames();
  }
  onChange(data) { this.pageno = data; }

  getAllLocationNames() {
    this.spinner.show();
    this.adminstrationService.GetAllLocationData().subscribe((data: any) => {
      this.locationarr = data.data;
      this.spinner.hide();
    });
  }

  AddLocation() {
    this.insertlocation = {
      "name": ''
    };
    this.addlocation = true;
    this.editlocation = false;
    this.spinner.show();
    setTimeout(() => { this.spinner.hide() }, 500);
    this.Name.reset();
    this.Remarks.reset();
    this.Address.reset();
  }

  EditLocation(location) {
    this.spinner.show();
    setTimeout(() => { this.spinner.hide() }, 500);
    this.updatelocatiion = location;
    this.editlocation = true;
    this.addlocation = false;
    this.Name.reset();
  }

  Cancel() {
    this.spinner.show();
    setTimeout(() => { this.spinner.hide() }, 500);
    this.getAllLocationNames();
    this.addlocation = false;
    this.editlocation = false;
  }

  SaveLocation(data) {
    if (data.locationName != '') {
      const datatosend = {
        locationName: data.locationName,
        createdBy: localStorage.getItem('userId'),
      };
      this.adminstrationService.InsertLocationData(datatosend).subscribe((data: any) => {
        if (data.issuccessfull == true) {
          Swal.fire({
            title: 'Added',
            text: 'Location is added successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
            backdrop: false
          });
          this.getAllLocationNames();
          this.addlocation = false;
        }
      });
    } else {
      this.Name.markAsTouched();
    }
  }

  UpdateLocation(data) {
    if (data.locationName != '') {
      const datatosend = {
        id: data.id,
        locationName: data.locationName,
        modifiedBy: localStorage.getItem('userId'),
      };
      this.adminstrationService.UpdateLocationData(datatosend).subscribe((data: any) => {
        if (data.issuccessfull == true) {
          Swal.fire({
            title: 'Updated',
            text: 'Location is Updated successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
            backdrop: false

          });
          this.getAllLocationNames();
          this.editlocation = false;
        }
      });
    } else {
      this.Name.markAllAsTouched();
    }
  }

  DeleteLocation(deletedid) {
    Swal.fire({
      title: 'Are you sure',
      text: 'you want to delete this Location?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
      backdrop: false

    }).then((res) => {
      if (res.value) {
        this.adminstrationService.DeleteLocationData(deletedid).subscribe((data:any) => {
          this.getAllLocationNames();
        if(data.issuccessfull){
          Swal.fire({
            title: 'Deleted!',
            text: 'Location was successfully deleted',
            icon: 'success',
            backdrop: false
          }
            
            
          
          );
        }else{
          Swal.fire({
            title: 'Not Able to Delete',
            text: 'Location is link with Doors and Visit Schedules modules',
            icon: 'warning',
            backdrop: false

           });
        }
        });
      }
    });
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
