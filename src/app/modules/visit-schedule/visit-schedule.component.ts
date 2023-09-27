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
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-visit-schedule',
  templateUrl: './visit-schedule.component.html',
  styleUrls: ['./visit-schedule.component.scss']
})
export class VisitScheduleComponent implements OnInit {
  error: string;
  addlocation = false;
  editlocation = false;
  locationarr = [];
  clinics = [];
  doctors = [];
  scheduleList = [];
  spaces = false;
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  key: string = 'userName';
  reverse: boolean = false;
  matcher = new MyErrorStateMatcher();
  isCheck = false;
  todayDate = new Date();
  starttime;
  maxDate;
  CurrentTime;
  minTime;
  emaxDate;
  eminTime;
  _isError
  _eisError;
  lablevariable: number = 0;

  public insertVisit: any = {
    "scheduleName": "",
    "dateStart": "",
    "dateEnd": "",
    "firstSlot": "",
    "lastSlot": "",
    "slotDuration": "",
    "paxCapacity": "",
    "paxperSlot": "",
    "locationId": "",
    "remarks": "",
    "timeThreshold": '',
    "dateThreshold": ''
  };

  public updateVisit: any = {
    "id": '',
    "scheduleName": "",
    "dateStart": "",
    "dateEnd": "",
    "firstSlot": "",
    "lastSlot": "",
    "slotDuration": '',
    "paxCapacity": "",
    "paxperSlot": '',
    "locationId": '',
    "remarks": "",
    "timeThreshold": '',
    "dateThreshold": ''
  };

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  Schedule_Name = new FormControl('', [
    Validators.required
  ]);
  DateStart = new FormControl('', [
    Validators.required
  ]);
  DateEnd = new FormControl('', [
    Validators.required
  ]);
  FirstSlot = new FormControl('', [
    Validators.required
  ]);
  LastSlot = new FormControl('', [
    Validators.required
  ]);
  SlotDuration = new FormControl('', [
    Validators.required
  ]);
  PaxCapacity = new FormControl('', [
    Validators.required
  ])
  PaxPerSlot = new FormControl('', [
    Validators.required
  ]);
  LocationId = new FormControl('', [
    Validators.required
  ]);
  Remarks = new FormControl('', [
    Validators.required
  ]);
  DateThreshould = new FormControl('', [
    Validators.required
  ]);
  TimeThreshould = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private spinner: NgxSpinnerService,
    private adminstrationService: adminstrationServices,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getAllManageLocation();
    this.getVisitSchedule();
  }
  onChange(data) { this.pageno = data; }
  getVisitSchedule() {
    this.spinner.show();
    this.adminstrationService.GetAllVisitSchedule().subscribe((data: any) => {
      this.scheduleList = data.data;
      this.spinner.hide();
      console.log(this.scheduleList);

      this.scheduleList.forEach((e, i) => {
        e.checkstatus = false;
        (new Date(e.dateEnd) < new Date()) ? e.checkstatus = false : e.checkstatus = true;

        let da = e.dateStart;
        let yy = da.substr(0, 4);
        let mm = da.substr(5, 2);
        let dd = da.substr(8, 2);
        e.dateStart = dd + '-' + mm + '-' + yy;
        e.dateStart = e.dateStart == "01-01-0001" ? e.dateStart = "N/A" : e.dateStart;

        let da1 = e.dateEnd;
        let yy1 = da1.substr(0, 4);
        let mm1 = da1.substr(5, 2);
        let dd1 = da1.substr(8, 2);
        e.dateEnd = dd1 + '-' + mm1 + '-' + yy1;
        e.dateEnd = e.dateEnd == "01-01-0001" ? e.dateEnd = "N/A" : e.dateEnd;
      });
    })
  }
  getAllManageLocation() {
    this.spinner.show();
    this.adminstrationService.GetAllLocationData().subscribe((res: any) => {
      this.locationarr = res.data;
      console.log(this.locationarr);
      this.spinner.hide();
    });
  }

  getCurrentTime(todaydate) {
    let hr = todaydate.getHours();
    let mm = todaydate.getMinutes();
    return hr + ":" + mm;
  }

  DateChangedStart(selecteddate) {
    this.maxDate = this.insertVisit.dateStart;
    let todaysDate = new Date();
    if (selecteddate.value.toDateString() == todaysDate.toDateString()) {
      this.CurrentTime = this.getCurrentTime(new Date());
      setInterval(() => {
        this.CurrentTime = this.getCurrentTime(new Date());
      }, 5000);
    } else {
      this.CurrentTime = "00:00";
    }
  }

  DateChangeEnd(selecteddate) {
    if (this.insertVisit.dateStart.toDateString() == selecteddate.value.toDateString()) {
      this.minTime = this.getCurrentTime(new Date());
      setInterval(() => {
        this.CurrentTime = this.getCurrentTime(new Date());
      }, 5000);
    } else {
      this.minTime = "00:00"
    }
  }
  minTimedump1;
  minTimedump2;
  isVisibleThreshould = false;
  e_isVisibleThreshould = false;
  eminTimedump1
  eminTimedump2

  TimeChanged1(event) {
    console.log(event);
    this.minTimedump1 = event;
    // this.insertVisit.lastSlot = event;
    // KEEP THIS
    // if (this.insertVisit.dateStart.toDateString() == this.insertVisit.dateEnd.toDateString()) {
    //   this.minTime = event;
    //   this.insertVisit.lastSlot = event;
    // } else {
    //   this.minTime = "00:00"
    //   this.insertVisit.lastSlot = "00:00";
    // }
  }

  e_TimeChanged1(event) {
    this.eminTimedump1 = event;
  }

  TimeChanged2(event) {
    this.minTimedump2 = event;
  }

  e_TimeChanged2(event) {
    this.eminTimedump2 = event;
  }

  SetTimeFirstSlot(event) {
    this.insertVisit.firstSlot = event;
    if (this.insertVisit.firstSlot !== "" && this.insertVisit.lastSlot !== "" && this.insertVisit.slotDuration !== "" && this.insertVisit.paxCapacity !== "") {
      this.isVisibleThreshould = true;
      var slot_start = this.insertVisit.firstSlot;
      var slot_end = this.insertVisit.lastSlot;
      var duration = Number(this.insertVisit.slotDuration);
      var paxcapacity = Number(this.insertVisit.paxCapacity);
      var starttime = this.backFunction(slot_start);
      var endtime = this.backFunction(slot_end);
      var slots_count = 0;
      while (starttime < endtime) {
        slots_count = slots_count + 1;
        starttime.setMinutes(starttime.getMinutes() + duration);
      }
      this.lablevariable = slots_count * paxcapacity;
    } else {
      this.isVisibleThreshould = false;
      this.lablevariable = 0;
    }
  }

  e_SetTimeFirstSlot(event) {
    this.updateVisit.firstSlot = event;
    if (this.updateVisit.firstSlot !== "" && this.updateVisit.lastSlot !== "" && this.updateVisit.slotDuration !== "" && this.updateVisit.paxCapacity !== "") {
      this.e_isVisibleThreshould = true;
      var slot_start = this.updateVisit.firstSlot;
      var slot_end = this.updateVisit.lastSlot;
      var duration = Number(this.updateVisit.slotDuration);
      var paxcapacity = Number(this.updateVisit.paxCapacity);
      var starttime = this.backFunction(slot_start);
      var endtime = this.backFunction(slot_end);
      var slots_count = 0;
      while (starttime < endtime) {
        slots_count = slots_count + 1;
        starttime.setMinutes(starttime.getMinutes() + duration);
      }
      this.lablevariable = slots_count * paxcapacity;
    } else {
      this.e_isVisibleThreshould = false;
      this.lablevariable = 0;
    }
  }

  SetTimeLastSlot(event) {
    this.insertVisit.lastSlot = event;
    if (this.insertVisit.firstSlot !== "" && this.insertVisit.lastSlot !== "" && this.insertVisit.slotDuration !== "" && this.insertVisit.paxCapacity !== "") {
      this.isVisibleThreshould = true;
      var slot_start = this.insertVisit.firstSlot;
      var slot_end = this.insertVisit.lastSlot;
      var duration = Number(this.insertVisit.slotDuration);
      var paxcapacity = Number(this.insertVisit.paxCapacity);
      var starttime = this.backFunction(slot_start);
      var endtime = this.backFunction(slot_end);
      var slots_count = 0;
      while (starttime < endtime) {
        slots_count = slots_count + 1;
        starttime.setMinutes(starttime.getMinutes() + duration);
      }
      this.lablevariable = slots_count * paxcapacity;
    } else {
      this.isVisibleThreshould = false;
      this.lablevariable = 0;
    }
  }

  e_SetTimeLastSlot(event) {
    this.updateVisit.lastSlot = event;
    if (this.updateVisit.firstSlot !== "" && this.updateVisit.lastSlot !== "" && this.updateVisit.slotDuration !== "" && this.updateVisit.paxCapacity !== "") {
      this.e_isVisibleThreshould = true;
      var slot_start = this.updateVisit.firstSlot;
      var slot_end = this.updateVisit.lastSlot;
      var duration = Number(this.updateVisit.slotDuration);
      var paxcapacity = Number(this.updateVisit.paxCapacity);
      var starttime = this.backFunction(slot_start);
      var endtime = this.backFunction(slot_end);
      var slots_count = 0;
      while (starttime < endtime) {
        slots_count = slots_count + 1;
        starttime.setMinutes(starttime.getMinutes() + duration);
      }
      this.lablevariable = slots_count * paxcapacity;
    } else {
      this.e_isVisibleThreshould = false;
      this.lablevariable = 0;
    }
  }

  slotDurationKeyUp(event) {
    if (this.insertVisit.firstSlot !== "" && this.insertVisit.lastSlot !== "" && this.insertVisit.slotDuration !== "" && this.insertVisit.paxCapacity !== "") {
      this.isVisibleThreshould = true;
      var slot_start = this.insertVisit.firstSlot;
      var slot_end = this.insertVisit.lastSlot;
      var duration = Number(this.insertVisit.slotDuration);
      var paxcapacity = Number(this.insertVisit.paxCapacity);
      var starttime = this.backFunction(slot_start);
      var endtime = this.backFunction(slot_end);
      var slots_count = 0;
      while (starttime < endtime) {
        slots_count = slots_count + 1;
        starttime.setMinutes(starttime.getMinutes() + duration);
      }
      this.lablevariable = slots_count * paxcapacity;
    } else {
      this.isVisibleThreshould = false;
      this.lablevariable = 0;
    }
  }

  e_slotDurationKeyUp() {
    if (this.updateVisit.firstSlot !== "" && this.updateVisit.lastSlot !== "" && this.updateVisit.slotDuration !== "" && this.updateVisit.paxCapacity !== "") {
      this.e_isVisibleThreshould = true;
      var slot_start = this.updateVisit.firstSlot;
      var slot_end = this.updateVisit.lastSlot;
      var duration = Number(this.updateVisit.slotDuration);
      var paxcapacity = Number(this.updateVisit.paxCapacity);
      var starttime = this.backFunction(slot_start);
      var endtime = this.backFunction(slot_end);
      var slots_count = 0;
      while (starttime < endtime) {
        slots_count = slots_count + 1;
        starttime.setMinutes(starttime.getMinutes() + duration);
      }
      this.lablevariable = slots_count * paxcapacity;
    } else {
      this.e_isVisibleThreshould = false;
      this.lablevariable = 0;
    }
  }

  paxCapacityKeyUp() {
    if (this.insertVisit.firstSlot !== "" && this.insertVisit.lastSlot !== "" && this.insertVisit.slotDuration !== "" && this.insertVisit.paxCapacity !== "") {
      this.isVisibleThreshould = true;
      var slot_start = this.insertVisit.firstSlot;
      var slot_end = this.insertVisit.lastSlot;
      var duration = Number(this.insertVisit.slotDuration);
      var paxcapacity = Number(this.insertVisit.paxCapacity);
      var starttime = this.backFunction(slot_start);
      var endtime = this.backFunction(slot_end);
      var slots_count = 0;
      while (starttime < endtime) {
        slots_count = slots_count + 1;
        starttime.setMinutes(starttime.getMinutes() + duration);
      }
      this.lablevariable = slots_count * paxcapacity;
    } else {
      this.isVisibleThreshould = false;
      this.lablevariable = 0;
    }
  }

  e_paxCapacityKeyUp() {
    if (this.updateVisit.firstSlot !== "" && this.updateVisit.lastSlot !== "" && this.updateVisit.slotDuration !== "" && this.updateVisit.paxCapacity !== "") {
      this.e_isVisibleThreshould = true;
      var slot_start = this.updateVisit.firstSlot;
      var slot_end = this.updateVisit.lastSlot;
      var duration = Number(this.updateVisit.slotDuration);
      var paxcapacity = Number(this.updateVisit.paxCapacity);
      var starttime = this.backFunction(slot_start);
      var endtime = this.backFunction(slot_end);
      var slots_count = 0;
      while (starttime < endtime) {
        slots_count = slots_count + 1;
        starttime.setMinutes(starttime.getMinutes() + duration);
      }
      this.lablevariable = slots_count * paxcapacity;
    } else {
      this.e_isVisibleThreshould = false;
      this.lablevariable = 0;
    }
  }

  AddLocation() {
    this._isError = false;
    this.maxDate = this.todayDate;
    this.adminstrationService.GetAllLocationData().subscribe((data: any) => {
      this.locationarr = data.data.filter(el => {
        return !this.scheduleList.find(element => {
          return element.locationId === el.id;
        });
      });
    })
    this.insertVisit = {
      "scheduleName": "",
      "dateStart": "",
      "dateEnd": "",
      "firstSlot": "",
      "lastSlot": "",
      "slotDuration": '',
      "paxperSlot": '',
      "locationId": '',
      "remarks": "",
      "paxCapacity": ""
    };
    this.addlocation = true;
    this.editlocation = false;
    this.spinner.show();
    setTimeout(() => { this.spinner.hide() }, 500);
    this.Schedule_Name.reset();
    this.DateStart.reset();
    this.DateEnd.reset();
    this.FirstSlot.reset();
    this.LastSlot.reset();
    this.SlotDuration.reset();
    this.PaxPerSlot.reset();
    this.LocationId.reset();
    this.Remarks.reset();
    this.PaxCapacity.reset();
  }

  ConvertDateFormat(date) {
    let da = date;
    let yy = da.substr(6, 4);
    let mm = da.substr(3, 2);
    let dd = da.substr(0, 2);
    return date = yy + '-' + mm + '-' + dd + 'T00:00:00'
  }

  eDateChangedStart(selecteddate) {
    this.emaxDate = this.updateVisit.dateStart;
    let todaysDate = new Date();

    if (selecteddate.toDateString() == todaysDate.toDateString()) {
      console.log('bothare same');
      this.CurrentTime = this.getCurrentTime(new Date());
      setInterval(() => {
        this.CurrentTime = this.getCurrentTime(new Date());
      }, 5000);
    } else {
      this.CurrentTime = "00:00";
    }
  }

  eDateChangeEnd(selecteddate) {
    if (new Date(this.updateVisit.dateStart).toDateString() == selecteddate.toDateString()) {
      this.eminTime = this.getCurrentTime(new Date());
      setInterval(() => {
        this.CurrentTime = this.getCurrentTime(new Date());
      }, 5000);
    } else {
      this.eminTime = "00:00"
    }
  }

  // eTimeChanged(event) {
  //   if (new Date(this.updateVisit.dateStart).toDateString() == new Date(this.updateVisit.dateEnd).toDateString()) {
  //     this.minTime = event;
  //     this.updateVisit.lastSlot = event;
  //   } else {
  //     this.minTime = "00:00"
  //     this.updateVisit.lastSlot = "00:00";
  //   }
  // }

  EditLocation(visit) {
    this.adminstrationService.StatusVisitSchedules(visit.id).subscribe((res: any) => {
      console.log(res);
      this.spinner.hide();
      if (res.issuccessfull) {
        Swal.fire({
          title: 'Not able to Edit',
          text: 'because some registration is available',
          showDenyButton: true,
          confirmButtonText: 'Proceed',
          denyButtonText: `Cancel`,
          icon: 'warning',
          showCloseButton: true,
          backdrop: false

        }).then((result: any) => {
          if (result.isConfirmed) {
            this._eisError = false;
            this.emaxDate = this.todayDate;
            this.adminstrationService.GetAllLocationData().subscribe((data: any) => {
              this.locationarr = data.data.filter(el => {
                return !this.scheduleList.find(element => {
                  if (visit.locationId == el.id) {
                    return false;
                  }
                  return element.locationId === el.id;
                });
              });
            })
            this.updateVisit = visit;
            if (this.updateVisit.firstSlot !== "" && this.updateVisit.lastSlot !== "" && this.updateVisit.slotDuration !== "" && this.updateVisit.paxCapacity !== "") {
              this.e_isVisibleThreshould = true;
              this.e_SetTimeFirstSlot(this.updateVisit.firstSlot);
              this.e_SetTimeLastSlot(this.updateVisit.lastSlot);
              this.e_slotDurationKeyUp();
              this.e_paxCapacityKeyUp();
            }
            this.editlocation = true;
            this.addlocation = false;
            visit.dateStart = this.ConvertDateFormat(visit.dateStart);
            visit.dateEnd = this.ConvertDateFormat(visit.dateEnd);
            this.spinner.show();
            setTimeout(() => {
              this.spinner.hide()
             }, 500);
          }
        })
      } else {
        this._eisError = false;
        this.emaxDate = this.todayDate;
        this.adminstrationService.GetAllLocationData().subscribe((data: any) => {
          this.locationarr = data.data.filter(el => {
            return !this.scheduleList.find(element => {
              if (visit.locationId == el.id) {
                return false;
              }
              return element.locationId === el.id;
            });
          });
        })
        this.updateVisit = visit;
        if (this.updateVisit.firstSlot !== "" && this.updateVisit.lastSlot !== "" && this.updateVisit.slotDuration !== "" && this.updateVisit.paxCapacity !== "") {
          this.e_isVisibleThreshould = true;
          this.e_SetTimeFirstSlot(this.updateVisit.firstSlot);
          this.e_SetTimeLastSlot(this.updateVisit.lastSlot);
          this.e_slotDurationKeyUp();
          this.e_paxCapacityKeyUp();
        }
        this.editlocation = true;
        this.addlocation = false;
        visit.dateStart = this.ConvertDateFormat(visit.dateStart);
        visit.dateEnd = this.ConvertDateFormat(visit.dateEnd);
        this.spinner.show();
        setTimeout(() => { this.spinner.hide() }, 500);
      }
    })
  }

  Cancel() {
    this.getVisitSchedule();
    this.addlocation = false;
    this.editlocation = false;
    this.spinner.show();
    setTimeout(() => { this.spinner.hide() }, 500);
  }

  IsoFormat(data) {
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

  submitSchedule(data) {
    console.log(data);

    if (data.scheduleName !== "" && data.dateStart !== "" && data.dateEnd !== "" && data.firstSlot !== "" &&
      data.lastSlot !== "" && data.slotDuration != "" && data.paxperSlot !== "" && data.locationId !== "" &&
      data.remarks !== "" && data.timeThreshold !== "" && data.dateThreshold !== "") {
      const datatosend = {
        scheduleName: data.scheduleName,
        dateStart: this.IsoFormat(data.dateStart),
        dateEnd: this.IsoFormat(data.dateEnd),
        firstSlot: data.firstSlot,
        lastSlot: data.lastSlot,
        slotDuration: Number(data.slotDuration),
        paxCapacity: Number(data.paxCapacity),
        paxperSlot: Number(data.paxperSlot),
        locationId: Number(data.locationId),
        timeThreshold: Number(data.timeThreshold),
        dateThreshold: Number(data.dateThreshold),
        remarks: data.remarks
      };

      this.adminstrationService.addSchedule(datatosend).subscribe((data: any) => {
        if (data.issuccessfull == true) {
          Swal.fire({
            title: 'Added',
            text: 'Visit Schedule is added successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
            backdrop: false

          });
          this.getVisitSchedule();
          this.addlocation = false;
        }
      });
    } else {
      this.Schedule_Name.markAsTouched();
      this.DateStart.markAsTouched();
      this.DateEnd.markAsTouched();
      this.FirstSlot.markAsTouched();
      this.LastSlot.markAsTouched();
      this.SlotDuration.markAsTouched();
      this.PaxPerSlot.markAsTouched();
      this.LocationId.markAsTouched();
      this.Remarks.markAsTouched();
      this.PaxCapacity.markAsTouched();
      this.DateThreshould.markAsTouched();
      this.TimeThreshould.markAsTouched();
    }
  }

  UpdateSchedule(data) {
    console.log(data);

    if (data.scheduleName !== "" && data.dateStart !== "" && data.dateEnd !== "" && data.firstSlot !== "" &&
      data.lastSlot !== "" && data.slotDuration != "" && data.paxperSlot !== "" && data.locationId !== "" &&
      data.remarks !== "" && data.timeThreshold !== "" && data.dateThreshold !== "") {
      const datatosend = {
        id: data.id,
        scheduleName: data.scheduleName,
        dateStart: this.IsoFormat(new Date(data.dateStart)),
        dateEnd: this.IsoFormat(new Date(data.dateEnd)),
        firstSlot: data.firstSlot,
        lastSlot: data.lastSlot,
        slotDuration: Number(data.slotDuration),
        paxCapacity: Number(data.paxCapacity),
        paxperSlot: Number(data.paxperSlot),
        locationId: Number(data.locationId),
        timeThreshold: Number(data.timeThreshold),
        dateThreshold: Number(data.dateThreshold),
        remarks: data.remarks
      };

      this.adminstrationService.updateSchedule(datatosend).subscribe((data: any) => {
        if (data.issuccessfull == true) {
          Swal.fire({
            title: 'Updated',
            text: 'Visit Schedule is Updated successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
            backdrop: false

          });
          this.getVisitSchedule();
          this.editlocation = false;
        }
      });
    } else {
      this.Schedule_Name.markAsTouched();
      this.DateStart.markAsTouched();
      this.DateEnd.markAsTouched();
      this.FirstSlot.markAsTouched();
      this.LastSlot.markAsTouched();
      this.SlotDuration.markAsTouched();
      this.PaxPerSlot.markAsTouched();
      this.LocationId.markAsTouched();
      this.Remarks.markAsTouched();
      this.PaxCapacity.markAsTouched();
    }
  }

  deleteSchedule(id) {
    this.adminstrationService.StatusVisitSchedules(id).subscribe((res: any) => {
      if (res.issuccessfull) {
        Swal.fire({
          title: 'Not able to Delete',
          text: 'because some registration is available',
          showDenyButton: true,
          confirmButtonText: 'Procced',
          denyButtonText: `Cancel`,
          icon: 'warning',
          showCloseButton: true,
          backdrop: false

        }).then((result: any) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Are you sure',
              text: 'you want to delete this Schedule?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#13c9ca',
              cancelButtonColor: '#ff8084',
              confirmButtonText: 'Yes',
              backdrop: false

            }).then((res) => {
              if (res.value) {
                this.adminstrationService.deleteSchedule(id).subscribe((data) => {
                  this.getVisitSchedule();
                  Swal.fire({
                    title:'Deleted!',
                    text: 'Schedule was successfully deleted',
                    icon: 'success',
                    backdrop: false
                  }
                    
                  
                  );
                });
              }
            });
          }
        })
      } else {
        Swal.fire({
          title: 'Are you sure',
          text: 'you want to delete this Schedule?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#13c9ca',
          cancelButtonColor: '#ff8084',
          confirmButtonText: 'Yes',
          backdrop: false

        }).then((res) => {
          if (res.value) {
            this.adminstrationService.deleteSchedule(id).subscribe((data) => {
              this.getVisitSchedule();
              Swal.fire({
                title: 'Deleted !',
                text: 'Schedule was successfully deleted',
                icon: 'success',
                backdrop: false
              }
              
              );
            });
          }
        });
      }
    })
  }

  // CheckStatus(visit) {
  //   console.log(visit.id);
  //   this.spinner.show()
  //   this.adminstrationService.StatusVisitSchedules(visit.id).subscribe((res: any) => {
  //     console.log(res);
  //     this.spinner.hide();
  //     if (res.issuccessfull) {
  //       Swal.fire({
  //         title: 'Not able to take the action',
  //         text: 'because some registration is there',
  //         icon: 'warning',
  //       })
  //     } else {
  //       Swal.fire({
  //         title: 'You Can Take Action',
  //         text: 'you can edit and delete',
  //         showDenyButton: true,
  //         confirmButtonText: 'Edit',
  //         denyButtonText: `Delete`,
  //         icon: 'success',
  //         showCloseButton: true
  //       }).then((result: any) => {
  //         if (result.isConfirmed) {
  //           this.editlocation = true;
  //           this.addlocation = false;
  //           this.EditLocation(visit);
  //         } else if (result.isDenied) {
  //           this.deleteSchedule(visit.id);
  //         }
  //       })
  //     }
  //   })
  // }

  keyPressContact(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else if (/[1-9]{1}[0-9]{9}/.test(event.keyCode)) {
      event.preventDefault(); return true;
    } else { return true; }
  }

  CompareValue(event) {
    if (Number(this.insertVisit.paxperSlot) <= Number(this.insertVisit.paxCapacity)) { //101<=13
      this._isError = false;
    } else {
      this._isError = true;
      this.insertVisit.paxperSlot = this.insertVisit.paxCapacity
      setTimeout(() => {
        this._isError = false;
      }, 3000);
    }
  }

  _isError1;
  _eisError1
  _IsDateThreshouldValid;
  _eIsDateThreshouldValid

  CompareValue1(event) {
    if (Number(this.insertVisit.timeThreshold) <= Number(this.insertVisit.paxCapacity)) { //101<=13
      this._isError1 = false;
    } else {
      this._isError1 = true;
      this.insertVisit.timeThreshold = this.insertVisit.paxCapacity
      setTimeout(() => {
        this._isError1 = false;
      }, 3000);
    }
  }

  e_CompareValue1(event) {
    if (Number(this.updateVisit.timeThreshold) <= Number(this.updateVisit.paxCapacity)) { //101<=13
      this._eisError1 = false;
    } else {
      this._eisError1 = true;
      this.updateVisit.timeThreshold = this.updateVisit.paxCapacity
      setTimeout(() => {
        this._eisError1 = false;
      }, 3000);
    }
  }

  eCompareValue(event) {
    if (Number(this.updateVisit.paxperSlot) <= Number(this.updateVisit.paxCapacity)) { //101<=13
      this._eisError = false;
    } else {
      this._eisError = true;
      this.updateVisit.paxperSlot = this.updateVisit.paxCapacity;
      setTimeout(() => {
        this._isError = false;
      }, 3000);
    }
  }

  DateThreshouldVal(event) {
    if (Number(this.insertVisit.dateThreshold) <= Number(this.lablevariable)) {
      this._IsDateThreshouldValid = false;
    } else {
      this._IsDateThreshouldValid = true;
      this.insertVisit.dateThreshold = this.lablevariable;
      setTimeout(() => {
        this._IsDateThreshouldValid = false;
      }, 3000);
    }
  }

  e_DateThreshouldVal(event) {
    if (Number(this.updateVisit.dateThreshold) <= Number(this.lablevariable)) {
      this._eIsDateThreshouldValid = false;
    } else {
      this._eIsDateThreshouldValid = true;
      this.updateVisit.dateThreshold = this.lablevariable;
      setTimeout(() => {
        this._eIsDateThreshouldValid = false;
      }, 3000);
    }
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  backFunction(t) {
    var dummydate = "2000-01-01T" + t
    var date = new Date(dummydate); // object
    return date;
  }

  // CalculateSlots() {
  //   var slot_start = this.insertVisit.firstSlot;
  //   var slot_end = this.insertVisit.lastSlot;
  //   var duration = this.insertVisit.duration;
  //   var paxcapacity = this.insertVisit.paxCapacity;
  //   var starttime = this.backFunction(slot_start);
  //   var endtime = this.backFunction(slot_end);
  //   var slots_count = 0;
  //   while (starttime < endtime) {
  //     slots_count = slots_count + 1;
  //     starttime.setMinutes(starttime.getMinutes() + duration);
  //   }
  //   this.lablevariable = slots_count * paxcapacity;
  // }
}
