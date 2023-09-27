import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { operationServices } from 'src/zsoonServices/operation.service';
import Swal from 'sweetalert2';
const API = environment.baseURL;
@Component({
  selector: 'app-visitor-request',
  templateUrl: './visitor-request.component.html',
  styleUrls: ['./visitor-request.component.scss']
})
export class VisitorRequestComponent implements OnInit {

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
    "bookingcode": null,
    "visitdates": null,
    "BookingStatus": null,
    "checkinTime": null
  }

  ShowandHideArray: any = [
    {
      name: 'Invitation Id',
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
      name: 'Visitor Phone No',
      ischecked: true
    },
    {
      name: 'Location',
      ischecked: true
    },
    {
      name: 'Nationality',
      ischecked: true
    },
    {
      name: 'Pax',
      ischecked: true
    },
    {
      name: 'Booking code',
      ischecked: true
    },
    {
      name: 'Registration Date & Time',
      ischecked: true
    },
    {
      name: 'Visit Date',
      ischecked: true
    },
    {
      name: 'Visit Slot',
      ischecked: true
    },
    {
      name: 'Booking Status',
      ischecked: true
    },
    {
      name: 'Event type',
      ischecked: true
    },
    {
      name: 'Check In Time',
      ischecked: true
    }
  ]

  constructor(
    private spinner: NgxSpinnerService,
    private operatorservice: operationServices,
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
    this.GetParkwayPatientLogs();
  }

  HideandShow() {
     (this.Show) ? this.Show = false : this.Show = true;
  }

  setStep(index: number) {
    this.step = index;
    this.panelOpenState = true;
  }

  GetParkwayPatientLogs() {
    const params = {
      limit: this.paginationData.limit,
      page: this.paginationData.page,
      filter: this.encodeKey,
      download: this.isDownload
    }
    this.spinner.show();
    this.operatorservice.GetVisitAccessRequest(API, params).subscribe((data: any) => {
      this.paginationDetails = data;
      this.spinner.hide();
      this.paginationData.limit = this.paginationDetails?.limit;
      this.paginationData.page = this.paginationDetails?.page;
      var x = this.paginationData.limit * this.paginationData.page - this.paginationData.limit + 1;
      if (x <= this.paginationDetails.totalDocs || this.paginationDetails.totalDocs == 0) {
        // Normal time;
        if (this.isDownload) {
          window.location.href = data.downloadLink;
          this.isDownload = false;
        } else {
          this.patients = data.data;
          this.patients.forEach(elearr => {
            elearr.visitDate = elearr.visitDate.slice(0, 10);
            let da = elearr.visitDate;
            let yy = da.substr(0, 4);
            let mm = da.substr(5, 2);
            let dd = da.substr(8, 2);
            elearr.visitDate = dd + '-' + mm + '-' + yy;
            elearr.visitDate === "01-01-0001" ? elearr.visitDate = "N/A" : elearr.visitDate;
            let da1 = elearr.registrationTime;
            let yy1 = da1.substr(0, 4);
            let mm1 = da1.substr(5, 2);
            let dd1 = da1.substr(8, 2);
            let tt1 = da1.substr(11, 5);
            elearr.registrationTime = dd1 + '-' + mm1 + '-' + yy1 + ' ' + tt1;
            elearr.registrationTime === "01-01-0001" ? elearr.registrationTime = "N/A" : elearr.registrationTime;
            let da2 = elearr.checkInTime;
            let yy2 = da2.substr(0, 4);
            let mm2 = da2.substr(5, 2);
            let dd2 = da2.substr(8, 2);
            let tt2 = da2.substr(11, 5);
            elearr.checkInTime = dd2 + '-' + mm2 + '-' + yy2 + ' ' + tt2;
            elearr.checkInTime === "01-01-0001 00:00" ? elearr.checkInTime = "N/A" : elearr.checkInTime;
            elearr.isVisibleResendEmail = true;
            if (elearr.status == "Expired" || elearr.status == "Cancelled" || elearr.status == "Admin-Cancelled") {
              elearr.isVisibleResendEmail = false;
            } else {
              elearr.isVisibleResendEmail = true;
            }
          });
        }
      } else {
        this.paginator.firstPage();
      }
    });
  }

  SendEmail(id) {
    this.operatorservice.ResendQrCode(id).subscribe((res: any) => {
      if (res.issuccessfull) {
        Swal.fire({
          title: 'Email Sent',
          text: 'Email sent successfully',
          icon: 'success',
          confirmButtonColor: '#ff8084',
          backdrop: false
        });
      }
    })
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

  KeyPressed(event) {
    if (event.code == "Backspace") {
      this.filtervisitor.checkinTime = "";
    }
  }

  SearchFilter(data) {
    let locvarvist = null;
    let locvarcheckinfrom = null;
    let locvarcheckinto = null;
    if (data.name == "") { data.name = null }
    if (data.email == "") { data.email = null }
    if (data.phone == "") { data.phone = null }
    if (data.location == "") { data.location = null }
    if (data.pax == "") { data.pax = 0 }
    if (data.BookingStatus == "") { data.BookingStatus = null }
    if (data.bookingcode == "") { data.bookingcode = null }
    if (data.visitdates == "") { data.visitdates = null }
    if (data.pax == null) { data.pax = 0 };
    if (data.checkinTime == "") { data.checkinTime = null }
    if (data.visitdates != null) {
      const formatteddatetime = this.RegistrationTime(data.visitdates);
      locvarvist = formatteddatetime;
    }
    if (data.checkinTime != null) {
      const formatteddatetime0 = this.RegistrationTime(data.checkinTime[0]);
      const formatteddatetime1 = this.RegistrationTime(data.checkinTime[1]);
      locvarcheckinfrom = formatteddatetime0;
      locvarcheckinto = formatteddatetime1
    }

    this.datatofilter = {
      "name": data.name,
      "email": data.email,
      "phone": data.phone,
      "location": data.location,
      "pax": Number(data.pax),
      "bookingcode": data.bookingcode,
      "visitdates": locvarvist,
      "BookingStatus": data.BookingStatus,
      "CheckInTime": locvarcheckinfrom,
      "CheckOutTime": locvarcheckinto
    }
    this.encodeKey = encodeURIComponent(JSON.stringify(this.datatofilter));
    this.GetParkwayPatientLogs();
    (data.pax == 0) ? this.filtervisitor.pax = null : this.filtervisitor.pax = data.pax;
  }

  DownloadExcel(data) {
    let locvarvist = null;
    let locvarcheckinfrom = null;
    let locvarcheckinto = null;
    if (data.name == "") { data.name = null }
    if (data.email == "") { data.email = null }
    if (data.phone == "") { data.phone = null }
    if (data.location == "") { data.location = null }
    if (data.pax == "") { data.pax = 0 }
    if (data.bookingcode == "") { data.bookingcode = null }
    if (data.visitdates == "") { data.visitdates = null }
    if (data.pax == null) { data.pax = 0 };
    if (data.checkinTime == "") { data.checkinTime = null }
    if (data.visitdates != null) {
      const formatteddatetime = this.RegistrationTime(data.visitdates);
      locvarvist = formatteddatetime;
    }
    if (data.checkinTime != null) {
      const formatteddatetime0 = this.RegistrationTime(data.checkinTime[0]);
      const formatteddatetime1 = this.RegistrationTime(data.checkinTime[1]);
      locvarcheckinfrom = formatteddatetime0;
      locvarcheckinto = formatteddatetime1
    }
    this.datatodownload = {
      "name": data.name,
      "email": data.email,
      "phone": data.phone,
      "location": data.location,
      "pax": Number(data.pax),
      "bookingcode": data.bookingcode,
      "visitdates": locvarvist,
      "BookingStatus": data.BookingStatus,
      "CheckInTime": locvarcheckinfrom,
      "CheckOutTime": locvarcheckinto
    }
    this.encodeKey = encodeURIComponent(JSON.stringify(this.datatodownload));
    this.isDownload = true;
    this.GetParkwayPatientLogs();
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
      "bookingcode": null,
      "visitdates": null,
      "BookingStatus": null,
      "checkinTime": null
    }
    this.encodeKey = encodeURIComponent(JSON.stringify(this.filtervisitor));
    this.GetParkwayPatientLogs();
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
    this.paginationData.page = page?.pageIndex + 1;
    this.paginationData.limit = page?.pageSize;
    this.GetParkwayPatientLogs();
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
