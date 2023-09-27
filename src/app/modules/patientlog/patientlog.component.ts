import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { loginServices } from 'src/zsoonServices/loginservices';
import { operationServices } from 'src/zsoonServices/operation.service';
const API = environment.baseURL;

@Component({
  selector: 'app-patientlog',
  templateUrl: './patientlog.component.html',
  styleUrls: ['./patientlog.component.scss'],
})
export class PatientlogComponent implements OnInit {
  currentDate = new Date();
  dateFormat = 'd/M/y';
  @ViewChild('paginator') paginator: MatPaginator;
  error: string
  searchText;
  editzone = false;
  addzone = false;
  patients: any = [];
  dobmax = ""
  key: string = 'userName'
  reverse: boolean = false
  step = 0;
  panelOpenState = false;
  novisProj = false;
  getProjectName;
  isDownload = false;
  datatofilter;
  datatodownload;
  encodeKey;
  paginationDetails: any;

  paginationData = {
    page: 1,
    limit: 5,
  };

  public Patients: any = {
    "patientName": '',
    "id": '',
    "location": '',
    "registrationTime": '',
    "deviceName": '',
    "registeredBy": '',
    "artFormNo": '',
    "agencyName": ''
  };

  public filterpatients: any = {
    "patientName": null,
    "id": null,
    "invoiceNo": null,
    "location": null,
    "deviceName": null,
    "event": null,
    "registrationTime": null,
    "registeredBy": null,
    "email": null,
    "mobileNo": null,
    "vehicleNo": null,
    "gender": null,
    "dateofbirth": null,
    "agencyName": null,
    "medicalTests": null,
    "passport": null
  }

  constructor(
    private spinner: NgxSpinnerService,
    private operatorservice: operationServices,
    private loginservice: loginServices,
  ) { }

  dobMax() {
    let today = new Date().toLocaleDateString()   //today date get
    var date = today;
    var newformat = date.split("/").reverse().join("-"); //today date required format convert
    this.dobmax = newformat; //assign to the format to public variable
  }

  ngOnInit(): void {
    this.novisProj = true;
    this.dobMax();
    // (error) => { this.error = error };
    // this.GetParkwayPatientLogs();
    if (this.getProjectName == "NOVIS") { }
    if (this.getProjectName == "Parkway") { }
    // this.ScanandPrint();
  }

  // ScanandPrint() {
  //   this.loginservice.ScanandPrint().subscribe((data: any) => {
  //     this.getProjectName = data.patientdata[6].values
  //   })
  // }

  setStep(index: number) {
    this.step = index;
    this.panelOpenState = true;
  }

  // GetParkwayPatientLogs() {
  //   const params = {
  //     limit: this.paginationData.limit,
  //     page: this.paginationData.page,
  //     filter: this.encodeKey,
  //     download: this.isDownload
  //   }
  //   this.spinner.show();
  //   this.operatorservice.GetParkwayPatientLogs(API, params).subscribe((data: any) => {
  //     this.paginationDetails = data.response;
  //     this.spinner.hide();
  //     this.paginationData.limit = this.paginationDetails?.limit;
  //     this.paginationData.page = this.paginationDetails?.page;
  //     var x = this.paginationData.limit * this.paginationData.page - this.paginationData.limit + 1;

  //     console.log(x);

  //     if (x <= this.paginationDetails.totalDocs || this.paginationDetails.totalDocs == 0) {
  //       // Normal time;
  //       if (this.isDownload) {
  //         window.location.href = data.response.downloadLink;
  //         this.isDownload = false;
  //       } else {
  //         this.patients = data.response.data;
  //         this.patients.forEach(elearr => {
  //           let newarr = [];
  //           elearr.testNames.forEach(object => {
  //             newarr.push(object.testname);
  //           });
  //           elearr.dateofbirth = elearr.dateofbirth.slice(0, 10);
  //           let da = elearr.dateofbirth;
  //           let yy = da.substr(0, 4);
  //           let mm = da.substr(5, 2);
  //           let dd = da.substr(8, 2);
  //           elearr.dateofbirth = dd + '-' + mm + '-' + yy;
  //           elearr.dateofbirth === "01-01-0001" ? elearr.dateofbirth = "N/A" : elearr.dateofbirth;
  //           elearr.passport == null ? elearr.passport = "N/A" : elearr.passport;
  //           var testnames = newarr.toString();
  //           elearr.testresults = testnames;
  //         });
  //       }
  //     } else {
  //       this.paginator.firstPage();
  //     }

  //   });
  // }

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

  SearchFilter(data) {
    let locvarreg = null;
    let locvardob = null;

    if (data.patientName == "") { data.patientName = null }
    if (data.id == "") { data.id = null }
    if (data.location == "") { data.location = null }
    if (data.deviceName == "") { data.deviceName = null }
    if (data.event == "") { data.event = null }
    if (data.registrationTime == "") { data.registrationTime = null }
    if (data.registeredBy == "") { data.registeredBy = null }
    if (data.email == "") { data.email = null }
    if (data.mobileNo == "") { data.mobileNo = null }
    if (data.vehicleNo == "") { data.vehicleNo = null }
    if (data.gender == "") { data.gender = null }
    if (data.dateofbirth == "") { data.dateofbirth = null }
    if (data.medicalTests == "") { data.medicalTests = null }
    if (data.agencyName == "") { data.agencyName = null }
    if (data.passport == "") { data.passport = null }

    if (data.registrationTime != null) {
      const formatteddatetime1 = this.RegistrationTime(data.registrationTime);
      locvarreg = formatteddatetime1;
    }

    if (data.dateofbirth != null) {
      const formatteddatetime = this.RegistrationTime(data.dateofbirth);
      locvardob = formatteddatetime;
    }
    this.datatofilter = {
      "patientName": data.patientName,
      "id": data.id,
      "location": data.location,
      "deviceName": data.deviceName,
      "event": data.event,
      "registrationTime": locvarreg,
      "registeredBy": data.registeredBy,
      "email": data.email,
      "mobileNo": data.mobileNo,
      "vehicleNo": data.vehicleNo,
      "gender": data.gender,
      "dob": locvardob,
      "agencyName": data.agencyName,
      "medicalTests": data.medicalTests,
      "passport": data.passport
    }
    this.encodeKey = encodeURIComponent(JSON.stringify(this.datatofilter));
    // this.GetParkwayPatientLogs();
  }

  DownloadExcel(data) {
    let locvarreg = null;
    let locvardob = null;

    if (data.patientName == "") { data.patientName = null }
    if (data.id == "") { data.id = null }
    if (data.location == "") { data.location = null }
    if (data.deviceName == "") { data.deviceName = null }
    if (data.event == "") { data.event = null }
    if (data.registrationTime == "") { data.registrationTime = null }
    if (data.registeredBy == "") { data.registeredBy = null }
    if (data.email == "") { data.email = null }
    if (data.mobileNo == "") { data.mobileNo = null }
    if (data.vehicleNo == "") { data.vehicleNo = null }
    if (data.gender == "") { data.gender = null }
    if (data.dateofbirth == "") { data.dateofbirth = null }
    if (data.medicalTests == "") { data.medicalTests = null }
    if (data.agencyName == "") { data.agencyName = null }
    if (data.passport == "") { data.passport = null }

    if (data.registrationTime != null) {
      const formatteddatetime1 = this.RegistrationTime(data.registrationTime);
      locvarreg = formatteddatetime1;
    }

    if (data.dateofbirth != null) {
      const formatteddatetime = this.RegistrationTime(data.dateofbirth);
      locvardob = formatteddatetime;
    }

    this.datatodownload = {
      "patientName": data.patientName,
      "id": data.id,
      "location": data.location,
      "deviceName": data.deviceName,
      "event": data.event,
      "registrationTime": locvarreg,
      "registeredBy": data.registeredBy,
      "email": data.email,
      "mobileNo": data.mobileNo,
      "vehicleNo": data.vehicleNo,
      "gender": data.gender,
      "dob": locvardob,
      "agencyName": data.agencyName,
      "medicalTests": data.medicalTests,
      "passport": data.passport
    }
    this.encodeKey = encodeURIComponent(JSON.stringify(this.datatodownload));
    this.isDownload = true;
    // this.GetParkwayPatientLogs();
  }

  Refresh() {
    this.filterpatients = {
      "patientName": null,
      "id": null,
      "invoiceNo": null,
      "location": null,
      "deviceName": null,
      "event": null,
      "registrationTime": null,
      "registeredBy": null,
      "email": null,
      "mobileNo": null,
      "vehicleNo": null,
      "gender": null,
      "dateofbirth": null,
      "agencyName": null,
      "medicalTests": null
    }
    this.encodeKey = encodeURIComponent(JSON.stringify(this.filterpatients));
    // this.GetParkwayPatientLogs();
    window.location.reload();
  }

  Cancel() {
    this.addzone = false;
    this.editzone = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }

  pageChanged(page): void {
    console.log('page', page);
    this.paginationData.page = page?.pageIndex + 1;
    this.paginationData.limit = page?.pageSize;
    // this.GetParkwayPatientLogs();
  }
}
