import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';

@Component({
  selector: 'app-patientdata',
  templateUrl: './patientdata.component.html',
  styleUrls: ['./patientdata.component.scss']
})
export class PatientdataComponent implements OnInit {
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  key: string = 'userName'
  reverse: boolean = false
  step = 0;
  panelOpenState = false;
  public patientprofiles: any = [];

  public filterjson: any = {
    "name": "",
    "passport":"",
    "id": "",
    "gender": "",
    "email": "",
    "dob": ""
  }

  constructor(
    private extraservice: ExtraService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.GetAllPatientProfiles();
  }

  GetAllPatientProfiles() {
    this.spinner.show();
    this.extraservice.GetAllPatientProfiles().subscribe((data: any) => {
      this.patientprofiles = data.data;
      console.log(this.patientprofiles);
      this.patientprofiles.forEach(elearr => {
        let newarr = [];
        elearr.dateofbirth = elearr.dateofbirth.slice(0, 10);
        let da = elearr.dateofbirth;
        let yy = da.substr(0,4);
        let mm = da.substr(5,2);
        let dd = da.substr(8,2);
        elearr.dateofbirth = dd+'-'+mm+'-'+yy;
        elearr.dateofbirth === "0001-01-01" ? elearr.dateofbirth = "N/A" : elearr.dateofbirth
        var testnames = newarr.toString();
        elearr.testresults = testnames;
      });
      this.spinner.hide();
    })
  }

  RegistrationTime(data) {
    let startdate = data.getDate();
    let startmonth = data.getMonth() + 1;
    const startyear = data.getFullYear();
    let starthours = data.getHours();
    let startmintues = data.getMinutes();
    let startseconds = data.getSeconds();
    var startDate = (startdate < 10)
      ? '0' + JSON.stringify(startdate) : JSON.stringify(startdate);
    var startMonth = (startmonth < 10)
      ? '0' + JSON.stringify(startmonth) : JSON.stringify(startmonth);
    var startHours = (starthours < 10)
      ? '0' + JSON.stringify(starthours) : JSON.stringify(starthours);
    var startMintues = (startmintues < 10)
      ? '0' + JSON.stringify(startmintues) : JSON.stringify(startmintues);
    var startSeconds = (startseconds < 10)
      ? '0' + JSON.stringify(startseconds) : JSON.stringify(startseconds);
    const StartDateTime = startyear + '-' + startMonth + '-' + startDate + 'T' + startHours +
      ':' + startMintues; ':' + startSeconds;
    return StartDateTime;
  }

  SearchFilter(data) {
    var datatosend;
    if (data.dob == "") {
      datatosend = {
        name: data.name,
        id: data.id,
        gender: data.gender,
        email: data.email,
        dob: null
      }
    } else {
      const formatteddate = this.RegistrationTime(data.dob);
      datatosend = {
        name: data.name,
        id: data.id,
        gender: data.gender,
        email: data.email,
        dob: formatteddate
      }
    }
    console.log('datatossen',datatosend);
    this.extraservice.multifilterforPatientProfile(datatosend).subscribe((data:any)=>{
      this.patientprofiles= data.data;
      this.patientprofiles.forEach(ele => {
        ele.dateofbirth = ele.dateofbirth.slice(0, 10);
        let da = ele.dateofbirth;
        let yy = da.substr(0, 4);
        let mm = da.substr(5, 2);
        let dd = da.substr(8, 2);
        ele.dateofbirth = dd + '-' + mm + '-' + yy;
        ele.dateofbirth = ele.dateofbirth === "0001-01-01" ? ele.dateofbirth = "N/A" : ele.dateofbirth;
      });
    })
  }

  DownloadExcel(data) {
    var datatosend;
    if (data.dob == "") {
      datatosend = {
        name: data.name,
        id: data.id,
        gender: data.gender,
        email: data.email,
        dob: null
      }
    } else {
      const formatteddate = this.RegistrationTime(data.dob);
      datatosend = {
        name: data.name,
        id: data.id,
        gender: data.gender,
        email: data.email,
        dob: formatteddate
      }
    }
    console.log('datatossen',datatosend);
    this.extraservice.DownloadPatientprofiles(datatosend).subscribe((res:any)=>{
      window.location.href = res.filename;
    })
  }

  setStep(index: number) {
    this.panelOpenState = true;
    this.step = index;
  }

  Refresh() {
   this.filterjson = {
    "name": "",
    "id": "",
    "gender": "",
    "email": "",
    "dob": ""
   }
   this.GetAllPatientProfiles();
  }

  onChange(data) { this.pageno = data; }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }

}
