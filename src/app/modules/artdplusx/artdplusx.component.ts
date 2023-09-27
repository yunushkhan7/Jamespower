import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-artdplusx',
  templateUrl: './artdplusx.component.html',
  styleUrls: ['./artdplusx.component.scss']
})
export class ArtdplusxComponent implements OnInit {
  DeleteAgeform: FormGroup
  submitted = false;

  public updated_dplus: any = {
    "mandatoryTestDate": "",
    "artValidatyPeriod": 0,
    "entryCheck": "",
    "vaxDays":""
  }
  constructor(
    private extraservices: ExtraService,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.GetDplusArtDetails();
    this.DeleteAgeform = this.formBuilder.group({
      patientReg: ['', Validators.required],
      userlog: ['', Validators.required],
      Entry: ['', Validators.required],
      vaxDays: ['',Validators.required]
    });
  }
  get f() { return this.DeleteAgeform.controls; }

  RegistrationTime(data) {
    let startdate = data.getDate();
    let startmonth = data.getMonth() + 1;
    const startyear = data.getFullYear();
    let starthours = data.getHours();
    let startmintues = data.getMinutes();
    let startseconds = data.getSeconds();
    var startDate = (startdate < 10) ? '0' + JSON.stringify(startdate) : JSON.stringify(startdate);
    var startMonth = (startmonth < 10) ? '0' + JSON.stringify(startmonth) : JSON.stringify(startmonth);
    var startHours = (starthours < 10) ? '0' + JSON.stringify(starthours) : JSON.stringify(starthours);
    var startMintues = (startmintues < 10) ? '0' + JSON.stringify(startmintues) : JSON.stringify(startmintues);
    var startSeconds = (startseconds < 10) ? '0' + JSON.stringify(startseconds) : JSON.stringify(startseconds);
    const StartDateTime =
      startyear + '-' + startMonth + '-' + startDate + 'T' + startHours + ':' + startMintues;
    ':' + startSeconds;
    return StartDateTime;
  }
  GetDplusArtDetails() {
    this.extraservices.GetDXSettingsDetailsById(1).subscribe((data: any) => {
      console.log(data)
      console.log('data.mandatoryTestDate.artValidatyPeriod===>', data?.mandatoryTestDate?.artValidatyPeriod)
      this.updated_dplus.mandatoryTestDate = data?.detail?.mandatoryTestDate;
      this.updated_dplus.artValidatyPeriod = data?.detail?.artValidatyPeriod;
      this.updated_dplus.entryCheck = data?.detail?.entryCheck;
      this.updated_dplus.vaxDays = data?.detail?.vaxDays;
      (this.updated_dplus.entryCheck) ? this.updated_dplus.entryCheck = "true" : this.updated_dplus.entryCheck = "false"
    })
  }

  Submit(data) {
    console.log(data);
    data.mandatoryTestDate = this.datepipe.transform(new Date(data.mandatoryTestDate), 'yyyy-MM-ddT00:00:00');
    (data.entryCheck == "true") ? data.entryCheck = true : data.entryCheck = false;
    this.submitted = true;
    if (this.DeleteAgeform.valid) {
      const datatosend = {
        "id": 1,
        "mandatoryTestDate": data.mandatoryTestDate,
        "artValidatyPeriod": Number(data.artValidatyPeriod),
        "entryCheck": data.entryCheck,
        "vaxDays": Number(data.vaxDays)
      }
      this.extraservices.UpdateDXSettingsDetails(datatosend).subscribe((data: any) => {
        console.log('res==>', data)
        if (data.issucessfull) {
          Swal.fire({
            title: 'Updated',
            text: 'Art D+X Setting is Updated successfully',
            icon: 'success',
            confirmButtonColor: '#ff8084'
          })
          this.GetDplusArtDetails();
        }
      })
    } else {
      return
    }
  }

  Reset() {
    this.submitted = false
    this.updated_dplus = {
      "id": 0,
      "mandatoryTestDate": "",
      "artValidatyPeriod": '',
      "vaxDays":"",
    }
  }
}
