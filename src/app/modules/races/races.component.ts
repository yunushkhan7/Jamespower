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
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit {
  key: string = 'userName'
  reverse: boolean = false
  addrace = false;
  editrace = false;
  races = [];
  searchText;
  pageno: any = 5;
  q: any
  matcher = new MyErrorStateMatcher();
  public insertrace = {
    "raceCode": "",
    "raceDescripiton": ""
  }
  public updaterace = {
    "raceCode": "",
    "raceDescripiton": ""
  }

  constructor(
    private extraservice: ExtraService,
    private spinner: NgxSpinnerService) { }

  RaceCode = new FormControl('', [
    Validators.required,
  ])

  RaceDesc = new FormControl('', [
    Validators.required,
  ])

  ngOnInit(): void {
    this.GetAllRaces();
  }

  onChange(data) { this.pageno = data }

  GetAllRaces() {
    this.spinner.show();
    this.extraservice.GetAllRaces().subscribe((data: any) => {
      console.log('races', data);
      this.races = data.races;
      this.spinner.hide();
    })
  }
  AddRace() {
    this.RaceCode.reset();
    this.RaceDesc.reset();
    this.insertrace = {
      'raceCode': "",
      "raceDescripiton": ""
    }
    this.addrace = true;
    this.editrace = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  EditRace(race) {
    this.RaceCode.reset();
    this.RaceDesc.reset();
    this.addrace = false;
    this.editrace = true;
    this.updaterace = race;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  SaveRace(data) {
    if (data.raceCode && data.raceDescripiton) {
      const datatosend = {
        "raceCode": data.raceCode,
        "raceDescripiton": data.raceDescripiton,
        "lastUpdatedBy": localStorage.getItem('userId')
      }
      this.extraservice.InsertRace(datatosend).subscribe((data: any) => {
        console.log(data);
        if (data.issuccessfull) {
          Swal.fire({
            title: 'Created',
            text: 'Race is  Created Successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084'
          });
          this.GetAllRaces();
          this.addrace = false;
        } else {
          Swal.fire({
            title: 'Check your detais',
            icon: 'warning',
            confirmButtonColor: '#ff8084'
          });
        }
      })
    } else {
      this.RaceCode.markAsTouched();
      this.RaceDesc.markAsTouched();
    }
  }

  UpdateRace(data) {
    if (data.raceCode && data.raceDescripiton) {
      const datatosend = {
        "id": data.id,
        "raceCode": data.raceCode,
        "raceDescripiton": data.raceDescripiton,
        "lastUpdatedBy": localStorage.getItem('userId')
      }
      this.extraservice.UpdateRace(datatosend).subscribe((data: any) => {
        console.log(data);
        if (data.issuccessfull) {
          Swal.fire({
            title: 'Updated',
            text: 'Race is  updated Successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084'
          });
          this.GetAllRaces();
          this.editrace = false;
        } else {
          Swal.fire({
            title: 'Check your detais',
            icon: 'warning',
            confirmButtonColor: '#ff8084'
          });
        }
      })
    } else {
      this.RaceCode.markAsTouched();
      this.RaceDesc.markAsTouched();
    }
  }

  DeleteRace(raceid) {
    Swal.fire({
      title: 'Are you sure',
      text: 'You want to delete this race',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
    }).then((res) => {
      if (res.value) {
        this.extraservice.DeleteRace(raceid).subscribe((res: any) => {
          this.GetAllRaces();
          if (res.sucess == false && res.message == "Race Having Countries") {
            Swal.fire({
              text: 'Race Having Countries',
              icon: 'warning',
            });
          } else {
            Swal.fire(
              'Deleted',
              'Race was successfully deleted',
              'success'
            )
          }
        })
      }
    })
  }

  Cancel() {
    this.GetAllRaces();
    this.addrace = false;
    this.editrace = false;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }
}
