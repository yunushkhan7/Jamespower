import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
import Swal from 'sweetalert2';
// import * as _moment from 'moment';
// import {MomentDateAdapter} from '@angular/material-moment-adapter';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-reserved-day',
  templateUrl: './reserved-day.component.html',
  styleUrls: ['./reserved-day.component.scss'],
})
export class ReservedDayComponent implements OnInit {
  location: any = 'please';
  Error = false;
  wList: any = [];
  weekList: any = [
    {
      name: 'Sunday',
      id: '1',
    },
    {
      name: 'Monday',
      id: '2',
    },
    {
      name: 'Tuesday',
      id: '3',
    },
    {
      name: 'Wednesday',
      id: '4',
    },
    {
      name: 'Thursday',
      id: '5',
    },
    {
      name: 'Friday',
      id: '6',
    },
    {
      name: 'Saturday',
      id: '0',
    },
  ];
  Rec = false;
  Single = true;
  recForm = false;
  singleForm = true;
  addWeeks = false;
  editWeeks = false;
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
  reservedList = [];
  matcher = new MyErrorStateMatcher();
  todayDate = new Date();
  maxDate;
  emaxDate;

  public insertDays: any = {
    dateTimeStart: '',
    dateTimeEnd: '',
    locationId: '',
    remarks: '',
  };

  public updateDays: any = {
    dateTimeStart: '',
    dateTimeEnd: '',
    locationId: '',
    remarks: '',
    id: '',
  };


  myHolidayDates: any = [];

  myHolidayFilter = (d: Date): boolean => {
    const time = d.getTime();
    return !this.myHolidayDates.find(x => x.getTime() == time);
  }

  myHolidayFilter2 = (d: Date): boolean => {
    const time = d.getTime();
    return !this.myHolidayDates2.find(x => x.getTime() == time);
  }

  emyHolidayFilter = (d: Date): boolean => {
    const time = d.getTime();
    return !this.emyHolidayDates.find(x => x.getTime() == time);
  }

  emyHolidayFilter2 = (d: Date): boolean => {
    const time = d.getTime();
    return !this.emyHolidayDates2.find(x => x.getTime() == time);
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  DateTimeStart: any = new FormControl('', [Validators.required]);
  DateTimeEnd = new FormControl('', [Validators.required]);
  LocationId = new FormControl('', [Validators.required]);
  Remarks = new FormControl('', [Validators.required]);

  constructor(
    private spinner: NgxSpinnerService,
    private adminstrationService: adminstrationServices,
    private extraservice: ExtraService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {



    (error) => {
      this.error = error;
    };
    this.getAllReservedDays();
    this.getAllLocation();
    this.getWeeks();



  }
  onChange(data) {
    this.pageno = data;
  }

  getAllReservedDays() {
    // this.spinner.show();
    this.adminstrationService.GetAllReservedDays().subscribe((data: any) => {
      // console.log(data);
      this.reservedList = data.data;
      this.reservedList.forEach((e) => {
        let da = e.dateTimeStart;
        let yy = da.substr(0, 4);
        let mm = da.substr(5, 2);
        let dd = da.substr(8, 2);
        let tt = da.substr(11, 5);
        e.dateTimeStart = dd + '-' + mm + '-' + yy + ' ' + tt;
        e.dateTimeStart =
          e.dateTimeStart == '01-01-0001 00:00'
            ? (e.dateTimeStart = 'N/A')
            : e.dateTimeStart;
        1;
        let da1 = e.dateTimeEnd;
        let yy1 = da1.substr(0, 4);
        let mm1 = da1.substr(5, 2);
        let dd1 = da1.substr(8, 2);
        let tt1 = da1.substr(11, 5);
        e.dateTimeEnd = dd1 + '-' + mm1 + '-' + yy1 + ' ' + tt1;
        e.dateTimeEnd =
          e.dateTimeEnd == '01-01-0001 00:00'
            ? (e.dateTimeEnd = 'N/A')
            : e.dateTimeEnd;
      });
    });
  }

  DateChangedStart() {
    this.maxDate = this.insertDays.dateTimeStart;
  }

  eDateChangedStart() {
    this.emaxDate = this.updateDays.dateTimeStart;
  }

  ConvertDateFormat(date) {
    let da = date;
    console.log('da=====>', da);
    // 08-05-2022 00:00
    let yy = da.substr(6, 4);
    let mm = da.substr(3, 2);
    let dd = da.substr(0, 2);
    let hh = da.substr(11, 2);
    let m = da.substr(14, 2);

    return (date = yy + '-' + mm + '-' + dd + 'T' + hh + ':' + m + ':00');
  }
  privateLocationArray: any = [];

  getAllLocation() {
    this.adminstrationService.GetAllLocationData().subscribe((res: any) => {
      this.locationarr = res.data;
      const myobj = {
        id: 0,
        lastEditBy: '',
        lastEditedOn: '0001-01-01T00:00:00',
        locationName: 'All',
      };
      this.locationarr.unshift(myobj);
    });
  }
  myHolidayDates2: any = [];
  RealHolidayList: any = [];
  // StartDate;

  oneArray
  getHolidays(value) {
    this.myHolidayDates = [];
    this.myHolidayDates2 = [];
    console.log('value', value);
    this.spinner.show();
    this.adminstrationService.getHolidaysById(value).subscribe((data: any) => {
      // console.log('response', data.data);
      this.oneArray = data.data
      this.spinner.hide();
      for (let i = 0; i < this.oneArray.length; i++) {
        const e = this.oneArray[i];

        var sd = e.dateTimeStart;
        var ed = e.dateTimeEnd;


        var datesta = new Date(sd)
        var dateend = new Date(ed)

        while (datesta <= dateend) {
          // console.log('first');
          // console.log(datesta);
          this.myHolidayDates.push(new Date((datesta.getMonth() + 1) + '/' + datesta.getDate() + '/' + datesta.getFullYear()))
          this.myHolidayDates2.push(new Date((datesta.getMonth() + 1) + '/' + datesta.getDate() + '/' + datesta.getFullYear()))
          datesta.setDate(datesta.getDate() + 1)
          //  this.myHolidayDates.push(datesta)
        }

      }
    })


  }
  eoneArray: any = [];
  egetHolidays(value) {


    this.emyHolidayDates = [];
    this.emyHolidayDates2 = [];

    this.spinner.show()
    this.adminstrationService.getHolidaysById(value).subscribe((data: any) => {

      this.eoneArray = data.data
      this.spinner.hide();
      console.log('One Array', this.eoneArray);
      // console.log('ComparingArray', this.comparingArray);

      console.log(this.fromdate);
      console.log(this.todate);



      this.eoneArray.forEach((e, i) => {
        if (e.dateTimeStart == this.fromdate && e.dateTimeEnd == this.todate) {
          this.eoneArray.splice(i, 1);
        }
      });



      console.log(this.eoneArray);

      for (let i = 0; i < this.eoneArray.length; i++) {
        const e = this.eoneArray[i];

        var sd = e.dateTimeStart;
        var ed = e.dateTimeEnd;

        var datesta = new Date(sd)
        var dateend = new Date(ed)


        while (datesta <= dateend) {
          this.emyHolidayDates.push(new Date((datesta.getMonth() + 1) + '/' + datesta.getDate() + '/' + datesta.getFullYear()))
          this.emyHolidayDates2.push(new Date((datesta.getMonth() + 1) + '/' + datesta.getDate() + '/' + datesta.getFullYear()))
          datesta.setDate(datesta.getDate() + 1)
        }
      }
    })
  }

  AddLocation() {
    this.insertDays = {
      dateTimeStart: '',
      dateTimeEnd: '',
      remarks: '',
      locationId: '',
    };
    this.addlocation = true;
    this.editlocation = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    this.DateTimeStart.reset();
    this.DateTimeEnd.reset();
    this.Remarks.reset();
    this.LocationId.reset();
  }

  emyHolidayDates: any = []
  emyHolidayDates2: any = [];

  comparingArray: any = [];
  allholidays: any = [];

  fromdate;
  todate;

  EditDays(reserveday) {
    this.comparingArray = [];

    console.log(reserveday);


    this.updateDays = reserveday;

    this.editlocation = true;
    this.addlocation = false;
    reserveday.dateTimeStart = this.ConvertDateFormat(reserveday.dateTimeStart);
    reserveday.dateTimeEnd = this.ConvertDateFormat(reserveday.dateTimeEnd);

    console.log(reserveday);


    this.fromdate = reserveday.dateTimeStart;
    this.todate = reserveday.dateTimeEnd;

    // console.log('fromdate', this.fromdate);
    // console.log('todate', this.todate);

    this.egetHolidays(reserveday.locationId)

    this.emaxDate = this.updateDays.dateTimeStart;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  Cancel() {
    this.getAllReservedDays();
    this.addlocation = false;
    this.editlocation = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  IsoFormat(data) {
    let startdate = data.getDate();
    let startmonth = data.getMonth() + 1;
    const startyear = data.getFullYear();
    let starthours = data.getHours();
    let startmintues = data.getMinutes();
    let startseconds = data.getSeconds();
    var startDate =
      startdate < 10
        ? '0' + JSON.stringify(startdate)
        : JSON.stringify(startdate);
    var startMonth =
      startmonth < 10
        ? '0' + JSON.stringify(startmonth)
        : JSON.stringify(startmonth);
    var startHours =
      starthours < 10
        ? '0' + JSON.stringify(starthours)
        : JSON.stringify(starthours);
    var startMintues =
      startmintues < 10
        ? '0' + JSON.stringify(startmintues)
        : JSON.stringify(startmintues);
    var startSeconds =
      startseconds < 10
        ? '0' + JSON.stringify(startseconds)
        : JSON.stringify(startseconds);
    const StartDateTime =
      startyear +
      '-' +
      startMonth +
      '-' +
      startDate +
      'T' +
      startHours +
      ':' +
      startMintues;
    ':' + startSeconds;
    return StartDateTime;
  }

  saveDays(data) {
    console.log(data);

    if (
      data.dateTimeStart !== '' &&
      data.dateTimeEnd !== '' &&
      data.locationId !== null &&
      data.remarks !== ''
    ) {
      const datatosend = {
        dateTimeStart: this.IsoFormat(data.dateTimeStart),
        dateTimeEnd: this.IsoFormat(data.dateTimeEnd),
        locationId: data.locationId,
        remarks: data.remarks,
      };
      this.adminstrationService.addDays(datatosend).subscribe((data: any) => {
        if (data.issuccessfull == true) {
          Swal.fire({
            title: 'Added',
            text: 'Reserved Day Successfully Added ',
            icon: 'success',
            confirmButtonColor: '#ff8084',
            backdrop: false
          });
          this.getAllReservedDays();
          this.addlocation = false;
        }
      });
    } else {
      this.DateTimeStart.markAsTouched();
      this.DateTimeEnd.markAsTouched();
      this.Remarks.markAsTouched();
      this.LocationId.markAsTouched();
    }
  }

  UpdateDays(data) {
    // console.log(this.IsoFormat(new Date(data.dateTimeEnd)));
    console.log(data);

    if (
      data.dateTimeStart !== '' &&
      data.dateTimeEnd !== '' &&
      data.locationId !== null &&
      data.remarks !== ''
    ) {
      const datatosend = {
        id: data.id,
        dateTimeStart: this.IsoFormat(new Date(data.dateTimeStart)),
        dateTimeEnd: this.IsoFormat(new Date(data.dateTimeEnd)),
        locationId: data.locationId,
        remarks: data.remarks,
      };

      this.adminstrationService
        .updateDays(datatosend)
        .subscribe((data: any) => {
          if (data.issuccessfull == true) {
            Swal.fire({
              title: 'Updated',
              text: 'Reserved Day Updated Added',
              icon: 'success',
              confirmButtonColor: '#ff8084',
              backdrop: false
            });
            this.getAllReservedDays();
            this.editlocation = false;
          }
        });
    } else {
      this.DateTimeStart.markAsTouched();
      this.DateTimeEnd.markAsTouched();
      this.Remarks.markAsTouched();
      this.LocationId.markAsTouched();
    }
  }

  DeleteDay(id) {
    Swal.fire({
      title: 'Are you sure',
      text: 'you want to delete this Day?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
      backdrop: false
    }).then((res) => {
      if (res.value) {
        this.adminstrationService.deleteDays(id).subscribe((data) => {
          this.getAllReservedDays();
          Swal.fire('Deleted!', 'Reserved Day Successfully Deleted', 'success');
        });
      }
    });
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  singleClick() {
    this.singleForm = true;
    this.Single = true;
    this.Rec = false;
    this.recForm = false;
  }
  weekNames: any = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  weekName: any = '';
  recClick() {
    this.getWeeks();
    this.recForm = true;
    this.Rec = true;
    this.Single = false;
    this.singleForm = false;
    console.log(this.wList);
    this.wList.forEach((ele: any) => {
      if (ele.weekDayNo.includes(',')) {
        var List = ele.weekDayNo.split(',');
        List.forEach((ele: any) => {
          this.weekName = this.weekNames + this.weekNames[ele];
        });
      } else {
        this.weekName = this.weekNames[ele.weekDayNo];
      }
    });
  }
  locationarrDays = [];
  AddWeekdays() {

    this.adminstrationService.GetAllLocationData().subscribe((res: any) => {
      this.locationarrDays = res.data;
      const myobj = {
        id: 0,
        lastEditBy: '',
        lastEditedOn: '0001-01-01T00:00:00',
        locationName: 'All',
      };
      this.locationarrDays.unshift(myobj);
      console.log(this.locationarrDays);
      console.log('wList==>', this.wList);

      this.locationarrDays = this.locationarrDays.filter((el) => {
        return !this.wList.find((element) => {
          return element.locationId === el.id;
        });
      });


    });

    this.weekDays = [];
    this.addWeeks = true;
    this.editWeeks = false;
    this.location = 'please'
  }
  days: any;
  weekDays: any = [];
  getWeeks() {
    this.adminstrationService.getAllWeeks().subscribe((res: any) => {
      console.log(res);
      this.wList = res.data;
    });
  }
  select(data: any) {
    if (this.location == 'please') {
      this.Error = true;
    } else {
      this.Error = false;
    }


    console.log(data);

  }
  saveWeeks() {
    var weeks = '';
    this.weekDays.forEach((ele: any) => {
      weeks = weeks + ele + ',';
    });

    if (this.location == 'please' || this.weekDays == '') {
      console.log('no enter');
      this.Error = true;
    } else {
      this.Error = false;
      const datatosend = {
        weekDayNo: weeks,
        locationId: Number(this.location),

        lastEditedBy: localStorage.getItem('userId'),
      };
      console.log(datatosend);
      this.spinner.show();
      this.adminstrationService.addWeeks(datatosend).subscribe((res: any) => {
        this.spinner.hide();
        console.log(res);
        if (res.issuccessfull) {
          Swal.fire({
            title: 'Added',
            text: 'Week days added successfully',
            icon: 'success',
            backdrop: false
          });
          this.addWeeks = false;
          this.getWeeks();
          this.weekDays = []
        }
      });
    }
  }
  CancelWeeks() {
    this.weekDays = [];

    this.addWeeks = false;
    this.editWeeks = false;
  }
  DeleteWeeks(data: any) {
    Swal.fire({
      title: 'Are you sure',
      text: 'you want to delete this Week?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
      backdrop: false
    }).then((res) => {
      if (res.value) {
        this.adminstrationService.deleteWeeks(data).subscribe((res: any) => {
          this.getWeeks();
          Swal.fire('Deleted!', 'Week Days Successfully Deleted', 'success');
        });
      }
    });
  }
  checked: any;
  editWeek: any;
  weekId: any;
  Location: any;

  EditWeeks(data: any) {

    this.adminstrationService.GetAllLocationData().subscribe((res: any) => {
      this.locationarrDays = res.data;
      const myobj = {
        id: 0,
        lastEditBy: '',
        lastEditedOn: '0001-01-01T00:00:00',
        locationName: 'All',
      };
      this.locationarrDays.unshift(myobj);
      console.log(this.locationarrDays);
      console.log('wList==>', this.wList);

      this.locationarrDays = this.locationarrDays.filter((el) => {
        return !this.wList.find((element) => {
          if (data.locationId == el.id) {
            return false;
          }
          return element.locationId === el.id;
        });
      });
    });

    console.log(data);
    this.editWeek = data;
    this.weekId = data.id;
    this.Location = data.locationId;
    console.log(this.Location);
    console.log(this.editWeek.weekDayNo);

    if (this.editWeek.weekDayNo.includes(',')) {
      var List = this.editWeek.weekDayNo.split(',');
      List.splice(List.length - 1, 1)
      console.log(List);

      List.forEach((ele: any) => {
        this.weekDays.push(Number(ele));
      });
    } else {
      this.weekDays.push(Number(this.editWeek.weekDayNo));
    }
    this.editWeeks = true;
    this.addWeeks = false;
  }

  updateWeeks() {
    var weeks = '';
    this.weekDays.forEach((ele: any) => {
      weeks = weeks + ele + ',';
    });
    const datatosend = {
      id: this.weekId,
      weekDayNo: weeks,

      locationId: Number(this.Location),

      lastEditedBy: localStorage.getItem('userId'),
    };
    console.log(datatosend);
    this.spinner.show();
    this.adminstrationService.updateWeeks(datatosend).subscribe((res: any) => {
      this.spinner.hide();
      // console.log(res);
      if (res.issuccessfull) {
        Swal.fire({
          title: 'Upated',
          text: 'Week days updated successfully',
          icon: 'success',
          backdrop: false
        });
        this.editWeeks = false;
        this.getWeeks();
        this.weekDays = []
      }
    });
  }
  checkWeek(data: any) {
    this.days = data;
    // console.log(this.weekDays);

    if (this.weekDays.includes(data)) {
      this.weekDays.splice(this.weekDays.indexOf(data), 1);
    } else {
      this.weekDays.push(data);
    }
    // console.log(this.weekDays);
  }
}
