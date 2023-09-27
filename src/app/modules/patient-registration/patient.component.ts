import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { operationServices } from 'src/zsoonServices/operation.service';

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
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  downloadDateAndTime: any;
error:string
  Patient = false;
  Identity = false;
  Artnumber = false;
  registerationTime = false;
  Serology = false;
  Pcr = false;
  mandatoryTest = false;
  Location = false;
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  editzone = false;
  addzone = false;
  patients: any = [];
  passportNo = '';
  artFormNo = '';
  mandatoryTestday = '';
  pcr = '';
  registerationDateTime = '';
  serology = '';
  travellerName = '';
  identityNo = '';
  downloadFilter: any;
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

  public Patients: any = {
    patientName: '',
    id: '',
    location: '',
    registrationTime: '',
    deviceName: '',
    registeredBy: '',
    artFormNo: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private operatorservice: operationServices
  ) {}

  ngOnInit(): void {
    (error) => {
      this.error = error;
    };
   // this.spinner.show();
    this.GetPatientLogs();

    this.excel()
  }
  onChange(data) {
    this.pageno = data;
    console.log('pageno', data);
  }

  GetPatientLogs() {
    this.spinner.show()
    this.operatorservice.GetPatientLogs().subscribe((data: any) => {
      console.log('GetPatientLogs', data);
      this.patients = data
      this.spinner.hide()
    });
  }


  Patientname(data) {
    let on = data.target.value;
    console.log(on);
    if (on.length >= 3) {
      const data1: any = {
        patientName: on,
      };
      this.getPatientFilter(data1);
      this.downloadFilter = data1;
    } 
    
    else {
      if (on.length <= 0) {
        this.GetPatientLogs();
      }
    }
  }

  Identityno(data) {
    let on = data.target.value;
    console.log(on);
    if (on.length >= 3) {
      const data2: any = {
        id: on,
      };
      this.getPatientFilter(data2);
      this.downloadFilter = data2;
    } 
    
    else {
      if (on.length <= 0) {
        this.GetPatientLogs();
      }
    }
  }

  ARTNo(data) {
    let on = data.target.value;
    console.log(on);
    if (on.length >= 3) {
      const data2: any = {
        artFormNo: on,
      };
      this.getPatientFilter(data2);
      this.downloadFilter = data2;
    } 
    else {
      if (on.length <= 0) {
        this.GetPatientLogs();
      }
    }
  }

  device(data) {
    let on = data.target.value;
    console.log(on);
    if (on.length >= 3) {
      const data2: any = {
        deviceName: on,
      };
      this.getPatientFilter(data2);
      this.downloadFilter = data2;
    } 
    else {
      if (on.length <= 0) {
        this.GetPatientLogs();
      }
    }
  }


  Locations(data) {
    let on = data.target.value;
    console.log(on);
    if (on.length >= 3) {
      const data2: any = {
        location: on,
      };
      this.getPatientFilter(data2);
      this.downloadFilter = data2;
    } 
    else {
      if (on.length <= 0) {
        this.GetPatientLogs();
      }
    }
  }
  RegistrationTime(data) {
    console.log('datetime', data);
    let startdate = data.getDate();
    let startmonth = data.getMonth() + 1;
    const startyear = data.getFullYear();
    let starthours = data.getHours();
    let startmintues = data.getMinutes();
    let startseconds = data.getSeconds();
    if (startdate < 10) {
      var startDate = '0' + JSON.stringify(startdate);
    } else {
      var startDate = JSON.stringify(startdate);
    }
    if (startmonth < 10) {
      var startMonth = '0' + JSON.stringify(startmonth);
    } else {
      var startMonth = JSON.stringify(startmonth);
    }
    if (starthours < 10) {
      var startHours = '0' + JSON.stringify(starthours);
    } else {
      var startHours = JSON.stringify(starthours);
    }
    if (startmintues < 10) {
      var startMintues = '0' + JSON.stringify(startmintues);
    } else {
      var startMintues = JSON.stringify(startmintues);
    }
    if (startseconds < 10) {
      var startSeconds = '0' + JSON.stringify(startseconds);
    } else {
      var startSeconds = JSON.stringify(startseconds);
    }
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
    const request = {
      registrationTime: StartDateTime,
    };
    console.log(request);

    console.log('passingggg', request);
    //this.downloadDateAndTime = request;
    this.getPatientFilter(request);
  }

 

  register(data) {
    //console.log(data)
    let on = data.target.value;
    console.log(on);
    const data1: any = {
      registeredBy: on,
    };
    this.getPatientFilter(data1);
    this.downloadFilter = data1;
  }

  // Mandatory(data) {
  //   //console.log(data)
  //   let on = data.target.value;
  //   console.log(on);
  //   const data1: any = {
  //     mandatoryTestday: on,
  //   };
  //   this.getScreeningFilter(data1);
  //   this.downloadFilter = data1;
  // }

  Refresh() {
    this.GetPatientLogs();

    this.Patients  = {
      patientName: '',
      id: '',
      location: '',
      registrationTime: '',
      deviceName: '',
      registeredBy: '',
      artFormNo: '',
    };
  }

  excel() {
    const excel: any = {
      "patientName": "",
      "id": "",
      "location": "",
      "registrationTime": null,
      "deviceName": "",
      "registeredBy": "",
      "artFormNo": "",
    };
    this.downloadFilter = excel;
  }
  DownloadPatientExcel() {
    console.log();
    this.operatorservice
      .DownloadPatientExcel(this.downloadFilter)
      .subscribe((res: any) => {
        console.log(res);

        if (res.success) {
          window.location.href = res.filename;
        }
      });
  }
  



  Cancel() {
    this.addzone = false;
    this.editzone = false;
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);
  }
  keyword(data) {
    console.log('keyword', data);
    if (data.target.value == '0') {
      this.Patient = false;
      this.Identity = false;
      this.Artnumber = false;
      this.registerationTime = false;
      this.Serology = false;
      this.Pcr = false;
      this.mandatoryTest = false;
      this.Location = false;
    }
    if (data.target.value == '1') {
      this.Patient = true;
      this.Identity = false;
      this.Identity = false;
      this.Artnumber = false;
      this.registerationTime = false;
      this.Serology = false;
      this.Pcr = false;
      this.mandatoryTest = false;
      this.Location = false;
    }
    if (data.target.value == '2') {
      this.Identity = true;
      this.Patient = false;
      this.Artnumber = false;
      this.registerationTime = false;
      this.Serology = false;
      this.Pcr = false;
      this.mandatoryTest = false;
      this.Location = false;
    }
    if (data.target.value == '3') {
      this.Artnumber = true;
      this.Identity = false;
      this.Patient = false;
      this.Identity = false;
      this.registerationTime = false;
      this.Serology = false;
      this.Pcr = false;
      this.mandatoryTest = false;
      this.Location = false;
    }
    if (data.target.value == '4') {
      this.registerationTime = false;
      this.Identity = false;
      this.Patient = false;
      this.Artnumber = false;
      this.Serology = false;
      this.Pcr = false;
      this.mandatoryTest = false;
      this.Location = true;
    }
    if (data.target.value == '5') {
      this.Serology = true;
      this.registerationTime = false;
      this.Identity = false;
      this.Patient = false;
      this.Artnumber = false;
      this.Pcr = false;
      this.mandatoryTest = false;
      this.Location = false;
    }
    if (data.target.value == '6') {
      this.Pcr = true;
      this.registerationTime = false;
      this.Identity = false;
      this.Patient = false;
      this.Artnumber = false;
      this.Serology = false;
      this.mandatoryTest = false;
      this.Location = false;
    }
    if (data.target.value == '7') {
      this.mandatoryTest = false;

      this.registerationTime = true;
      this.Identity = false;
      this.Patient = false;
      this.Artnumber = false;
      this.Serology = false;
      this.Pcr = false;
      this.Location = false;
    }
    if (data.target.value == '8') {
      this.Location = false;
      this.registerationTime = false;
      this.Identity = false;
      this.Patient = false;
      this.Artnumber = false;
      this.Serology = false;
      this.Pcr = true;
      this.mandatoryTest = false;
    }
  }
  getPatientFilter(rashid: any) {
    console.log('passingggg', rashid);
    this.operatorservice.PatientFilter(rashid).subscribe((res: any) => {
      console.log(res);
      if (res.message) {
        this.patients = res.data;
        console.log('filterrrrr', res);
      }
    });
  }
  key: string = 'userName'
reverse:boolean = false
sort(key){
this.key = key;
this.reverse = !this.reverse
}
}
