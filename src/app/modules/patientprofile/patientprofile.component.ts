import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';

@Component({
  selector: 'app-patientprofile',
  templateUrl: './patientprofile.component.html',
  styleUrls: ['./patientprofile.component.scss']
})
export class PatientprofileComponent implements OnInit {
  viewId;
  imgsrc = ""
  patientdetaildata;
  uploadby;
  uploadon;
  uploadfrom;
  id: string = "";
  vacimg = "";
  vacinationon;
  paperpin: boolean = true;
  passport: string = "";
  public profiledetails: any = {
    "patientFullName": '',
    "gender": '',
    "patientEmail": '',
    "id": '',
    "passport": '',
    "dateofbirth": '',
    "patientMobileNo": '',
    "vaccinationOn": ''
  }

  constructor(
    private spinner: NgxSpinnerService,
    private routes: ActivatedRoute,
    private extraservice: ExtraService,
    public dialog: MatDialog
  ) {
    if (this.routes.snapshot.params['id']) {
      this.viewId = this.routes.snapshot.params['id'];
      this.PatientProfileDetais();
    }
  }

  ngOnInit(): void {
    this.PatientProfileDetais();
  }

  PatientProfileDetais() {
    this.spinner.show()
    this.extraservice.GetPaientProfileById(this.viewId).subscribe((data: any) => {
      this.patientdetaildata = data.data;
      this.spinner.hide();
      console.log('patientdetaildata', this.patientdetaildata);
      this.profiledetails.patientFullName = this.patientdetaildata.patientFullName;
      this.profiledetails.gender = this.patientdetaildata.gender;
      (this.patientdetaildata.gender == "Male" || this.patientdetaildata.gender == "Female")
        ? (this.patientdetaildata.gender === 'Male')
          ? this.imgsrc = "assets/menprofile.png"
          : this.imgsrc = "assets/womenprofile.png"
        : this.imgsrc = "assets/profile.png"
      this.patientdetaildata.patientEmail = this.patientdetaildata.patientEmail === "" || null
        ? this.patientdetaildata.patientEmail = "N/A"
        : this.patientdetaildata.patientEmail
      this.profiledetails.patientEmail = this.patientdetaildata.patientEmail;
      this.profiledetails.id = this.patientdetaildata.id;
      this.patientdetaildata.dateofbirth = this.patientdetaildata.dateofbirth == "0001-01-01T00:00:00"
        ? this.patientdetaildata.dateofbirth = "N/A"
        : this.patientdetaildata.dateofbirth;
      this.profiledetails.dateofbirth = this.patientdetaildata.dateofbirth.slice(0, 10);
      if (this.profiledetails.dateofbirth !== "N/A") {
        let da = this.profiledetails.dateofbirth
        let yy = da.substr(0, 4);
        let mm = da.substr(5, 2);
        let dd = da.substr(8, 2);
        this.profiledetails.dateofbirth = dd + '-' + mm + '-' + yy;
      } else {
        this.profiledetails.dateofbirth = "N/A"
      }

      this.patientdetaildata.vaccinationOn = this.patientdetaildata.vaccinationOn == "0001-01-01T00:00:00"
        ? this.patientdetaildata.vaccinationOn = ""
        : this.patientdetaildata.vaccinationOn;
      this.profiledetails.vaccinationOn = this.patientdetaildata.vaccinationOn.slice(0, 10);
      if (this.profiledetails.vaccinationOn !== "") {
        let da1 = this.profiledetails.vaccinationOn;
        let yy1 = da1.substr(0, 4);
        let mm1 = da1.substr(5, 2);
        let dd1 = da1.substr(8, 2);
        this.profiledetails.vaccinationOn = dd1 + '-' + mm1 + '-' + yy1;
        this.paperpin = false
      } else {
        this.id = (this.patientdetaildata.id) ? this.patientdetaildata.id : '';
        this.passport = (this.patientdetaildata.passport) ? this.patientdetaildata.passport : '';
        this.VacRec();
      }
      this.profiledetails.patientMobileNo = this.patientdetaildata.patientMobileNo;
      this.profiledetails.passport = this.patientdetaildata.passport;
    })
  }

  GetVaccinationRecord(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, { disableClose: true, autoFocus: false });
    this.id = (this.patientdetaildata.id) ? this.patientdetaildata.id : '';
    this.passport = (this.patientdetaildata.passport) ? this.patientdetaildata.passport : '';
    this.VacRec();
  }

  VacRec() {
    this.extraservice.GetVaccinationRecord(this.id,this.passport).subscribe((data: any) => {
      this.vacimg = data.detail.vaccinationImg
      this.uploadby = data.detail.uploadedBy;
      this.uploadon = data.detail.uploadedAt;
      let da = this.uploadon;
      let yy = da.substr(0, 4);
      let mm = da.substr(5, 2);
      let dd = da.substr(8, 2);
      let hh = da.substr(11, 2);
      let m = da.substr(14, 2);
      this.uploadon = dd + '-' + mm + '-' + yy + ' ' + hh + ':' + m;
      if(this.uploadon == '01-01-0001 00:00'){ this.uploadon = 'N/A' }
      this.uploadfrom = data.detail.uploadedDevice;
      this.profiledetails.vaccinationOn = data.detail.vaccinationOn;
      let da1 = this.profiledetails.vaccinationOn.slice(0, 10);
      let yy1 = da1.substr(0, 4);
      let mm1 = da1.substr(5, 2);
      let dd1 = da1.substr(8, 2);
      (this.profiledetails.vaccinationOn !== "0001-01-01T00:00:00")
        ? this.profiledetails.vaccinationOn = dd1 + '-' + mm1 + '-' + yy1
        : this.profiledetails.vaccinationOn = "N/A";
      (this.profiledetails.vaccinationOn == "N/A") ? this.paperpin = true : this.paperpin = false;
    })
  }

  Cancel() {
    window.location.reload();
  }

}
