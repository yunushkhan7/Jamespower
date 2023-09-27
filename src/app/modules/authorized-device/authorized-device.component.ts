import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { operationServices } from 'src/zsoonServices/operation.service';
import Swal from 'sweetalert2';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';

export interface data {
  Serology: string;
  SerologyCode: string;
}

export interface data1 {
  Mandatory: string;
  MandatoryCode: string;
}

export interface data2 {
  MandatoryCode: string;
}
@Component({
  selector: 'app-authorized-device',
  templateUrl: './authorized-device.component.html',
  styleUrls: ['./authorized-device.component.scss'],
})
export class AuthorizeddevicesComponent implements OnInit {
  key: string = 'userName';
  reverse: boolean = false;
  error: string;
  status = 'black';
  paginate = true;
  update = true;
  dateFormat = 'd/M/y';
  edit = true;
  view = false;
  Disabled = false;
  FormGroup: Form;
  select = true;
  downloadDateAndTime: any;
  todaysDateTime: any;
  Passport = false;
  Name = false;
  Msia = false;
  ARTResult = false;
  serologyresult = false;
  pcr = false;
  swabtaken = false;
  Serologydate = false;
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  addgeneral = false;
  editdvaccination = false;
  editdriver = false;
  filetypes: any = [];
  vaccination: any = [];
  vac = false;
  serology: any = [];
  table = false;
  table1 = true;
  dateofSwabTaken = '';
  dose = '';
  sddVaccineName = '';
  patientName = '';
  nric = '';
  malaysiaId = '';
  passportId = '';
  fin = '';
  visitDate = '';
  vaccinationId = '';
  downloadFilter: any;
  Form: any;
  permission: boolean = false;
  alllocation: any = [];
  devices: any = [];
  allevents: any = [];

  SerologiesList: data[] = [
    {
      Serology: 'Positive',
      SerologyCode: 'P',
    },
    {
      Serology: 'Negative',
      SerologyCode: 'N',
    },
  ];

  MandatoryList: data1[] = [
    {
      Mandatory: 'Yes',
      MandatoryCode: 'Y',
    },
    {
      Mandatory: 'No',
      MandatoryCode: 'N',
    },
  ];

  MandatoryList1: data2[] = [
    {
      MandatoryCode: 'N/A',
    },
  ];

  public editauthorized: any = {
    locationId: '',
    eventId: '',
    remarks: '',
    deviceUUID: 'SoMeDId',
    deviceId: '',
    lastEditBy: '91bc5c38-73b9-4ea6-a97d-3f9217760bab',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private operatorservice: operationServices,
    private adminservice: adminstrationServices,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.GetAllLocation();
    this.GetAllEvents();
    this.excel();
    (error) => {
      this.error = error;
    };
    this.getalldata();
  }

  GetAllLocation() {
    this.adminservice.GetAllLocationData().subscribe((data: any) => {
      this.alllocation = data.locations;
    });
  }

  GetAllEvents() {
    this.operatorservice.GetAllEvents().subscribe((data: any) => {
      this.allevents = data.events;
    });
  }

  excel() {
    const excel: any = {
      passportNo: '',
      msiaId: '',
      name: '',
      swabTakenDateTime: null,
      artResult: '',
      pcrResult: '',
      serologyResult: '',
      serologyTestDate: null,
    };
    this.downloadFilter = excel;
  }

  checkBox(data) {
    if (data.location && data.event) {
      console.log('approved', data);
      const datatosend = {
        deviceUUID: data.deviceUUID,
        authoriziedBy: localStorage.getItem('userName'),
      };
      this.operatorservice.AuthDevice(datatosend).subscribe((data: any) => {
        console.log('finaljsn', data);
        if (data.issuccessfull == true) {
          Swal.fire({
            title: 'Approved',
            text: 'The device has been successfully approved',
            icon: 'success',
          });
          this.spinner.show();
          this.getalldata();
          this.spinner.hide();
        }
      });
    } else {
      Swal.fire({
        title: 'Please add',
        text: 'Event and Location',
        icon: 'warning',
      });
    }
  }

  getalldata() {
    this.spinner.show();
    this.operatorservice.getAllData().subscribe((data: any) => {
      console.log('getalldata', data);
      this.devices = data.deviceDetails;
      this.devices.forEach(ele => {
        ele.lastEditDate = ele.lastEditDate.slice(0, 10);
        let da = ele.lastEditDate;
        let yy = da.substr(0, 4);
        let mm = da.substr(5, 2);
        let dd = da.substr(8, 2);
        ele.lastEditDate = dd + '-' + mm + '-' + yy;
        ele.lastEditDate = ele.lastEditDate == "01-01-0001" ? ele.lastEditDate = "N/A" : ele.lastEditDate;
      });
      this.devices.forEach(ele => {
        ele.authorizedDate = ele.authorizedDate.slice(0, 10);
        let da = ele.authorizedDate;
        let yy = da.substr(0, 4);
        let mm = da.substr(5, 2);
        let dd = da.substr(8, 2);
        ele.authorizedDate = dd + '-' + mm + '-' + yy;
        ele.authorizedDate = ele.authorizedDate == "01-01-0001" ? ele.authorizedDate = "N/A" : ele.authorizedDate;
      });
      this.spinner.hide();
    });
  }

  Cancel() {
    this.addgeneral = false;
    this.editdvaccination = false;
    this.editdriver = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    this.getalldata();
  }

  editmtdd(data) {
    this.editdriver = true;
    this.editdvaccination = false;
    this.addgeneral = false;
    this.editauthorized = data;
    console.log('this.editauthorized',this.editauthorized)
  }

  onChange1(data) {
    this.pageno = data;
  }

  DownloadExcel() {
    console.log(this.downloadFilter);
    this.operatorservice.DownloadSerologyExcel(this.downloadFilter).subscribe((res: any) => {
        if (res.message) {
          window.location.href = res.data;
        }
      });
  }

  deletedevice(deviceId) {
    Swal.fire({
      title: 'Are you sure',
      text: 'You want to delete this device',
      icon: 'question',
      showCancelButton: true,
      allowOutsideClick: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
    }).then((res) => {
      if (res.value) {
        this.operatorservice.DeleteDevice(deviceId).subscribe((res) => {
          this.getalldata();
          if (res) {
            Swal.fire({
              text: 'Device was successfully deleted',
              icon: 'success',
            });
          }
        });
      }
    });
  }

  UpdateAuthorized(data) {
    const datatosend = {
      locationId: data.locationId,
      eventId: data.eventId,
      remarks: data.remarks,
      deviceUUID: data.deviceUUID,
      deviceId: data.deviceId,
      lastEditBy: localStorage.getItem('userId'),
    };
    this.adminservice.UpdateAuthorization(datatosend).subscribe((data: any) => {
      if (data.issuccessfull == true) {
        Swal.fire({
          title: 'Update',
          text: 'Device is Updated successfully!',
          icon: 'success',
          allowOutsideClick: false,
          confirmButtonColor: '#ff8084',
        });
        this.getalldata();
        this.editdriver = false;
      }
    });
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
