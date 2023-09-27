import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { operationServices } from 'src/zsoonServices/operation.service';
export interface data { systemtype: string }
const API = environment.baseURL;

@Component({
  selector: 'app-userlog',
  templateUrl: './userlog.component.html',
  styleUrls: ['./userlog.component.scss'],
})
export class UserlogComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  dateFilter = 'dd-MM-yy hh:mm';
  getTodaydata = new Date();
  setval: any;
  encodeKey: any;
  isDownload: any;
  downloadDateAndTime: any;
  error: string;
  downloadFilter: any;
  logs: any = [];
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  errorlist: any = [];
  System = false;
  Module = false;
  Capture = false;
  registerationTime = false;
  Email = false;
  Pcr = false;
  mandatoryTest = false;
  ART = false;
  step = 0;
  step1 = 0;
  key: string = 'userName';
  reverse: boolean = false;
  panelOpenState = false;
  InternalLogsForm: FormGroup;
  submitted = false;
  panelOpenState1: boolean = false;
  paginationDetails;

  StaticData: any = [
    {
      dropdownname: 'Select',
      selectedSource: '',
    },
    {
      dropdownname: 'Info',
      selectedSource: 'info.txt',
    },
    {
      dropdownname: 'Error',
      selectedSource: 'Error.txt',
    },
  ];

  SystemList: data[] = [
    {
      systemtype: 'Error',
    },
    {
      systemtype: 'Info',
    },
  ];

  public filterjson = {
    userName: null,
    activityOn: null,
    moduleName: null,
    systemType: null,
  };

  paginationData = {
    page: 1,
    limit: 5,
  };

  public reqjson = {
    selectedSource: '',
    selectedDate: '',
  };

  datatofilter: {
    userName: any;
    activityOn: any;
    moduleName: any;
    systemType: any;
  };

  datatodownload: {
    userName: any;
    activityOn: any;
    moduleName: any;
    systemType: any;
  };

  get f() { return this.InternalLogsForm.controls }

  SearchInternalLogs(res) {
    this.submitted = true;
    if (this.InternalLogsForm.invalid) { return }
    let data = res.selectedDate;
    let startdate = data.getDate();
    let startmonth = data.getMonth() + 1;
    const startyear = data.getFullYear();
    var startDate = startdate < 10 ? '0' + JSON.stringify(startdate) : JSON.stringify(startdate);
    var startMonth = startmonth < 10 ? '0' + JSON.stringify(startmonth) : JSON.stringify(startmonth);
    const StartDateTime = startyear + '-' + startMonth + '-' + startDate;
    var reqdata = environment.basedownload + StartDateTime + "/" + res.selectedSource;
    window.open(reqdata);
    this.Reset();
  }

  Reset() {
    this.reqjson = {
      selectedSource: '',
      selectedDate: '',
    };
    this.InternalLogsForm.reset();
    this.submitted = false;
  }

  constructor(
    private spinner: NgxSpinnerService,
    private operationservice: operationServices,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.InternalLogsForm = this.formBuilder.group({
      SelectedSource: ['', Validators.required],
      SelectedDate: ['', Validators.required],
    });
    (error) => { this.error = error };
    this.GetActivityLogs();
  }

  onChange(data) {
    this.pageno = data;
    this.onPageChange('');
  }

  onPageChange(pageNumber) {
    this.q = pageNumber;
  }

  setStep(index: number) {
    this.step = index;
    this.panelOpenState = true;
  }

  setStep1(index: number) {
    this.step1 = index;
    this.panelOpenState1 = true;
  }

  GetActivityLogs() {
    const params = {
      limit: this.paginationData.limit,
      page: this.paginationData.page,
      filter: this.encodeKey,
      download: this.isDownload,
    };
    this.spinner.show();
    this.operationservice
      .GetActivityLogs(API, params)
      .subscribe((data: any) => {
        this.paginationDetails = data.response;
        this.spinner.hide();
        this.paginationData.limit = this.paginationDetails?.limit;
        this.paginationData.page = this.paginationDetails?.page;
        var x =
          this.paginationData.limit * this.paginationData.page -
          this.paginationData.limit +
          1;
        if (
          x <= this.paginationDetails.totalDocs ||
          this.paginationDetails.totalDocs == 0
        ) {
          if (this.isDownload) {
            window.location.href = data.response.downloadLink;
            this.isDownload = false;
          } else {
            this.logs = data.response.data;
            this.logs.forEach((ele) => {
              let da = ele.activityOn;
              let yy = da.substr(0, 4);
              let mm = da.substr(5, 2);
              let dd = da.substr(8, 2);
              let tt = da.substr(11, 5);
              ele.activityOn = dd + '-' + mm + '-' + yy + ' ' + tt;
              ele.activityOn =
                ele.activityOn == '01-01-0001 00:00'
                  ? (ele.activityOn = 'N/A')
                  : ele.activityOn;
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
    let locvardob = null;
    console.log(data);
    if (data.userName == '') {
      data.userName = null;
    }
    if (data.activityOn == '') {
      data.activityOn = null;
    }
    if (data.moduleName == '') {
      data.moduleName = null;
    }
    if (data.systemType == '') {
      data.systemType = null;
    }
    if (data.activityOn !== null) {
      const formatteddatetime = this.RegistrationTime(data.activityOn);
      locvardob = formatteddatetime;
    }
    this.datatofilter = {
      userName: data.userName,
      activityOn: locvardob,
      moduleName: data.moduleName,
      systemType: data.systemType,
    };

    this.encodeKey = encodeURIComponent(JSON.stringify(this.datatofilter));
    this.paginator.firstPage();
    this.GetActivityLogs();
  }

  DownloadActivityExcel(data) {
    let locvardob = null;
    console.log(data);
    if (data.userName == '') {
      data.userName = null;
    }
    if (data.activityOn == '') {
      data.activityOn = null;
    }
    if (data.moduleName == '') {
      data.moduleName = null;
    }
    if (data.systemType == '') {
      data.systemType = null;
    }
    if (data.activityOn !== null) {
      const formatteddatetime = this.RegistrationTime(data.activityOn);
      locvardob = formatteddatetime;
    }
    this.datatodownload = {
      userName: data.userName,
      activityOn: locvardob,
      moduleName: data.moduleName,
      systemType: data.systemType,
    };
    this.encodeKey = encodeURIComponent(JSON.stringify(this.datatodownload));
    this.isDownload = true;
    this.GetActivityLogs();
  }

  Refresh() {
    this.filterjson = {
      userName: null,
      activityOn: null,
      moduleName: null,
      systemType: null,
    };
    this.paginator.firstPage();
    this.SearchFilter(this.filterjson);
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  pageChanged(page): void {
    this.paginationData.page = page?.pageIndex + 1;
    this.paginationData.limit = page?.pageSize;
    this.GetActivityLogs();
  }
}
