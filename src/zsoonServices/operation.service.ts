import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';
//import { environment } from '../../environments/environment';
const redirectSession = environment.redirectSessionTimeout;

@Injectable({
  providedIn: 'root',
})
export class operationServices {
  // returnUrl = '/login';
  constructor(private http: HttpClient, private router: Router) { }
  userid: any = localStorage.getItem('userId');

  downloadExcel() {
    this.userid = localStorage.getItem('userId');
    console.log('filetypecode');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(
      environment.baseURL + 'Excel/DownloadExcel?filetype=MTD',
      options
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAllData() {
    this.userid = localStorage.getItem('userId');

    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(
      environment.baseURL + 'AuthDevices/GetAllAuthenticateDevice',
      options
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  get() {
    this.userid = localStorage.getItem('userId');

    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Excel/FileType', options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  uploadexcel(formData) {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.post(
      environment.baseURL + 'Excel/Excel?filetype=MTD',
      formData,
      options
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  DeleteDevice(deviceId) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(
      environment.baseURL +
      'AuthDevices/DeleteAuthenticateDevice?DeviceId=' +
      deviceId,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  UpdateVaccination(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Excel/updateVaccinationByid',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  UpdateSerology(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Excel/updateSerologyByid',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  DeleteSerology(serologyId) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(
      environment.baseURL + 'Excel/DeleteSerologyByid?serologyid=' + serologyId,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  GetAllDriversData() {
    this.userid = localStorage.getItem('userId');

    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(
      environment.baseURL + 'TruckDriver/GetAllDriversData',
      options
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  GetAllEvents() {
    this.userid = localStorage.getItem('userId');

    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Event/GetAllEvents', options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  SerologyFilter(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Filter/SerologyFilter',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  DownloadSerologyExcel(datatosend: any) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Filter/DownloadSerologyExcel',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  ScreeningFilter(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Filter/DriverFilter',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  DownloadDriverExcel(datatosend: any) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Filter/DownloadDriverExcel',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getActivityLogs() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(
      environment.baseURL + 'Logs/GetAllActivityLogs',
      options
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getErrorLogs() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Logs/GetAllErrorLogs', options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  downloadActivitylogExcel() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(
      environment.baseURL + 'Excel/DownlodActivityLogInExcel',
      options
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  downloadErrorlogExcel() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(
      environment.baseURL + 'Excel/DownlodErrorLogInExcel',
      options
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  AddDeleteData(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'AgedData/UpdateAgedData',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  AddEvents(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Event/InsertEvent',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  UpdateEvents(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Event/UpdateEventDetails',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  DeleteEvent(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'Event/DeleteEvent?Id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  GetPatientLogs() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(
      environment.baseURL + 'PatientLogs/GetAllPatientLogs',
      options
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  GetVisitAccessRequest(apiEndPoint, params) {
    const { page, limit, filter, download } = params;
    let url = `${apiEndPoint}VisitorAccessRequests/GetAllVisitorAccessRequest?`
    if (page != null && page != undefined && page != '') {
      url += `&pageno=${page}`;
    }
    if (limit != null && limit != undefined && limit != '') {
      url += `&limit=${limit}`;
    }
    if (filter != null && filter != undefined && filter != '') {
      url += `&filter=${filter}`;
    }
    if (download != null && download != undefined && download != '') {
      url += `&download=${download}`;
    }
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };

    return this.http.get(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  ResendQrCode(id) {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'VisitorRegistration/ResendQrCode?Id=' + id, options)
      .pipe(retry(1), catchError(this.handleError));
  }

  GetActivityLogs(apiEndPoint, params) {
    const { page, limit, filter, download } = params;
    let url = `${apiEndPoint}ActivityLogs/GetAllActivityLogs?`
    if (page != null && page != undefined && page != '') {
      url += `&pageno=${page}`;
    }
    if (limit != null && limit != undefined && limit != '') {
      url += `&limit=${limit}`;
    }
    if (filter != null && filter != undefined && filter != '') {
      url += `&filter=${filter}`;
    }
    if (download != null && download != undefined && download != '') {
      url += `&download=${download}`;
    }
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };

    return this.http.get(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  DownloadActivityExcel(datatosend: any) {
    this.userid = localStorage.getItem('userId');
    console.log('sewrvicexcelfile', datatosend);
    return this.http.post(
      environment.baseURL + 'ActivityLogs/DownloadActivityLogExcel',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  MultifilterActivityLogs(datatosend) {
    this.userid = localStorage.getItem('userId');
    console.log('sewrvicexcelfile', datatosend);
    return this.http.post(
      environment.baseURL + 'MultiFilter/Activitylogs',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  MultiDownloader(datatosend) {
    this.userid = localStorage.getItem('userId');
    console.log('sewrvicexcelfile', datatosend);
    return this.http.post(
      environment.baseURL + 'MultiFilter/DownloadActivityLogExcel',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  AuthDevice(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'AuthDevices/AuthenticateDevice',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  DownloadPatientExcel(datatosend: any) {
    this.userid = localStorage.getItem('userId');
    console.log('sewrvicexcelfile', datatosend);
    return this.http.post(
      environment.baseURL + 'PatientLogs/DownloadPatientLogs',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  DownloadParkwayPatientExcel(datatosend: any) {
    this.userid = localStorage.getItem('userId');
    console.log('sewrvicexcelfile', datatosend);
    return this.http.post(
      environment.baseURL + 'PatientLogParkway/DownloadPatientLogs',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  ActivityFilter(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'ActivityLogs/ActivityLogFilter',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  PatientFilter(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'PatientLogs/PatientLogsFilter',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  PatientMultiFilter(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'MultiFilter/PatientLogsFilterParkway',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  DownloadMultiFilterExcel(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'MultiFilter/DownloadPatientLogsParkway',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  ParkwayPatientFilter(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'PatientLogParkway/PatientLogsFilter',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  GetAllTest() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Tests/GetAllTests', options);
  }

  InsertTest(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Tests/InsertTest',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  UpdateTest(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Tests/UpdateTestDetails',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  DeleteTest(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'Tests/DeleteTest?Id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  SendTestMail(value) {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'ToTestMail/ToTestMail?email=' + value, options);
  }

  ActivityLogsFilter(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'MultiFilter/Activitylogs',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  GetAllCountries() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Countries/GetAllCountries', options);
  }

  GetAllVisitAccessLogs(apiEndPoint, params) {
    const { page, limit, filter, download } = params;
    let url = `${apiEndPoint}VisitorAccessLog/GetAllvisitorAccessLog?`
    if (page != null && page != undefined && page != '') {
      url += `&pageno=${page}`;
    }
    if (limit != null && limit != undefined && limit != '') {
      url += `&limit=${limit}`;
    }
    if (filter != null && filter != undefined && filter != '') {
      url += `&filter=${filter}`;
    }
    if (download != null && download != undefined && download != '') {
      url += `&download=${download}`;
    }
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };

    return this.http.get(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  MonthlyReports(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'WeekEndBookings/MonthlyReports',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }



  GetAllWeekEndBookingsDownload(apiEndPoint, params) {
    let url = `${apiEndPoint}WeekEndBookings/GetAllWeekEndBookingsDownload?FromDate=${params.reportStart}&ToDate=${params.reportEnd}&download=${true}`
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };

    return this.http.get(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    if (error.status == '401') {
      Swal.fire({
        title: 'Session Time-Out',
        text: 'Session time out please login again',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500,
      });
      // .then((result) => {
      // if (result.isConfirmed) {
      window.location.href = redirectSession;

      // if (
      //   environment.baseURL ==
      //   'https://evvoindia01.ddns.net/SJPSAdmin/api/'
      // ) {
      //   window.location.href =
      //     'https://evvoindia01.ddns.net/SJPSAdmin/#/login';
      // }
      // if (
      //   environment.baseURL ==
      //   'https://visitor-sjps.southeastasia.cloudapp.azure.com/api/'
      // ) {
      //   window.location.href =
      //     'https://visitor-sjps.southeastasia.cloudapp.azure.com/Admin/#/login';
      // }

      // else {
      //   window.location.href = '/#/login';
      // }
      //  window.location.href = '/#/t';
      localStorage.clear();
      // }
      // });
      // this.router.navigate([this.returnUrl]);
      return throwError(errorMessage);
    } else if (error.status == "0") {
      Swal.fire({
        title: 'Disconnected',
        text: 'Please check your internet connection',
        icon: 'warning'
      })

    } else {
      Swal.fire({
        title: 'Error',
        text: ' Internal Server Error',
        icon: 'warning'
      })
    }
  }
}
