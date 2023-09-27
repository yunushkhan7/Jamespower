import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { loginServices } from 'src/zsoonServices/loginservices';
import { operationServices } from 'src/zsoonServices/operation.service';
const API = environment.baseURL;
@Component({
  selector: 'app-visitor-log',
  templateUrl: './visitor-log.component.html',
  styleUrls: ['./visitor-log.component.scss']
})
export class VisitorLogComponent implements OnInit {

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
  Show: boolean = false;

  paginationData = {
    page: 1,
    limit: 5,
  };

  public filtervisitor: any = {
    "name": null,
    "email": null,
    "phone": null,
    "location": null,
    "pax": null,
    "eventtime": null,
    "eventtype": null,
    "bookingcode": null
  }

  ShowandHideArray: any = [
    {
      name: 'Id',
      ischecked: true
    },
    {
      name: 'Name',
      ischecked: true
    },
    {
      name: 'Visitor Email',
      ischecked: true
    },
    {
      name: 'Visitor Phone',
      ischecked: true
    },
    {
      name: 'Location',
      ischecked: true
    },
    // {
    //   name: 'Nationality',
    //   ischecked: true
    // },

    {
      name: 'Booking code',
      ischecked: true
    },
    {
      name: 'Pax',
      ischecked: true
    },
    {
      name: 'Event Date & Time',
      ischecked: true
    },

    {
      name: 'Event type',
      ischecked: true
    },

  ]

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
    this.GetAllVisitAccessLogs();
    if (this.getProjectName == "NOVIS") { }
    if (this.getProjectName == "Parkway") { }
    this.ScanandPrint();
  }

  HideandShow() {
    if (this.Show) {
      this.Show = false;
    } else {
      this.Show = true;
    }
  }

  ScanandPrint() {
    // this.loginservice.ScanandPrint().subscribe((data: any) => {
    //   this.getProjectName = data.patientdata[6].values
    // })
  }

  setStep(index: number) {
    this.step = index;
    this.panelOpenState = true;
  }

  GetAllVisitAccessLogs() {
    const params = {
      limit: this.paginationData.limit,
      page: this.paginationData.page,
      filter: this.encodeKey,
      download: this.isDownload
    }
    this.spinner.show();
    this.operatorservice.GetAllVisitAccessLogs(API, params).subscribe((data: any) => {
      console.log('dataaaaaaaaaaaaaaaaaaa', data);

      this.paginationDetails = data;
      this.spinner.hide();
      this.paginationData.limit = this.paginationDetails?.limit;
      this.paginationData.page = this.paginationDetails?.page;
      var x = this.paginationData.limit * this.paginationData.page - this.paginationData.limit + 1;

      console.log(x);

      if (x <= this.paginationDetails.totalDocs || this.paginationDetails.totalDocs == 0) {
        // Normal time;
        if (this.isDownload) {
          window.location.href = data.downloadLink;
          this.isDownload = false;
        } else {
          this.patients = data.data;
          this.patients.forEach(elearr => {
            // elearr.eventTime = elearr.eventTime.slice(0, 10);
            let da = elearr.eventTime;
            let yy = da.substr(0, 4);
            let mm = da.substr(5, 2);
            let dd = da.substr(8, 2);
            let tt = da.substr(11, 5);
            elearr.eventTime = dd + '-' + mm + '-' + yy + ' ' + tt;
            elearr.eventTime === "01-01-0001" ? elearr.eventTime = "N/A" : elearr.eventTime;
          });
        }
      } else {
        this.paginator.firstPage();
      }

    });
  }

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
    console.log(data);
    let locvarvist = null;
    if (data.name == "") { data.name = null }
    if (data.email == "") { data.email = null }
    if (data.phone == "") { data.phone = null }
    if (data.location == "") { data.location = null }
    if (data.bookingcode == "") { data.bookingcode = null };
    if (data.pax == "") { data.pax = null }
    if (data.eventtime == "") { data.eventtime = null }
    if (data.pax == null) { data.pax = 0 };
    if (data.eventtype == null) { data.eventtype = null };



    if (data.eventtime != null) {
      const formatteddatetime = this.RegistrationTime(data.eventtime);
      locvarvist = formatteddatetime;
    }

    this.datatofilter = {
      "name": data.name,
      "email": data.email,
      "phone": data.phone,
      "location": data.location,
      "pax": Number(data.pax),
      "eventtime": locvarvist,
      "eventtype": data.eventtype,
      "bookingcode": data.bookingcode
    }
    console.log(this.datatofilter);

    this.encodeKey = encodeURIComponent(JSON.stringify(this.datatofilter));
    this.GetAllVisitAccessLogs();
    if (data.pax == 0) { this.filtervisitor.pax = null; }
    else { this.filtervisitor.pax = data.pax; }
  }

  DownloadExcel(data) {
    console.log(data);
    let locvarvist = null;
    if (data.name == "") { data.name = null }
    if (data.email == "") { data.email = null }
    if (data.phone == "") { data.phone = null }
    if (data.location == "") { data.location = null }
    if (data.bookingcode == "") { data.bookingcode = null };
    if (data.pax == "") { data.pax = 0 }
    if (data.eventtime == "") { data.eventtime = null }
    if (data.pax == null) { data.pax = 0 };
    if (data.eventtype == null) { data.eventtype = null };

    if (data.eventtime != null) {
      const formatteddatetime = this.RegistrationTime(data.eventtime);
      locvarvist = formatteddatetime;
    }

    this.datatofilter = {
      "name": data.name,
      "email": data.email,
      "phone": data.phone,
      "location": data.location,
      "pax": data.pax,
      "eventtime": locvarvist,
      "eventtype": data.eventtype,
      "bookingcode": data.bookingcode
    }
    console.log(this.datatofilter);
    this.encodeKey = encodeURIComponent(JSON.stringify(this.datatofilter));
    console.log(this.encodeKey);

    this.isDownload = true;
    this.GetAllVisitAccessLogs();
    this.filtervisitor.pax = null;
    if (data.pax == 0) { this.filtervisitor.pax = null; }
    else { this.filtervisitor.pax = data.pax; }
  }

  Refresh() {

    this.filtervisitor = {
      "name": null,
      "email": null,
      "phone": null,
      "location": null,
      "pax": null,
      "eventtime": null,
      "eventtype": null,
      "bookingcode": null
    }

    this.encodeKey = encodeURIComponent(JSON.stringify(this.filtervisitor));
    this.GetAllVisitAccessLogs();
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
    this.GetAllVisitAccessLogs();
  }


  keyPressContact(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else if (/[1-9]{1}[0-9]{9}/.test(event.keyCode)) {
      event.preventDefault(); return true;
    } else { return true; }
  }
}
