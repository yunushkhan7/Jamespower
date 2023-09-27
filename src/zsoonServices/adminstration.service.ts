import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { loginServices } from './loginservices';
import { catchError, retry } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
const redirectSession = environment.redirectSessionTimeout;

@Injectable({
  providedIn: 'root',
})
export class adminstrationServices {
  // returnUrl = '/login';

  constructor(private http: HttpClient, private router: Router,    private spinner: NgxSpinnerService,
    ) {}

  userid: any = localStorage.getItem('userId');

  GetAllUsers() {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(
        environment.baseURL +
          'User/GetAllUsers?roleid=' +
          localStorage.getItem('roleId'),
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  GetAllUsersById() {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(
        environment.baseURL +
          '/GetUserById?UserGuid=' +
          localStorage.getItem('userId'),
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  GetSpecificType() {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'Excel/SpecificType', {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  GetAllUsersTypes() {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'User/GetAllUserTypes', {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  addUser(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'User/InsertUser', datatosend, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  updateUser(update) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'User/UpdateUserDetails', update, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  DeleteUser(userGuid) {
    console.log(userGuid);

    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'User/DeleteUser?UserGuid=' + userGuid, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  GetRolesByUserType(id) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'Role/GetRolesByUserType?UserTypeId=' + id, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('UserId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // roles

  GetAllRoles() {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(
        environment.baseURL +
          'Role/GetRolesByRoleId?RoleId=' +
          localStorage.getItem('roleId'),
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllPermissions() {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'Permissions/GetAllPermissions', {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  InsertRole(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'Role/SaveRole', datatosend, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  DeleteRole(datadeleted) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'Role/DeleteRole', datadeleted, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  getRoleById(dataid) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'Role/GetRoleById', dataid, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  UpdateRole(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'Role/SaveRole', datatosend, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  UpdateConfig(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'Excel/UpdateMandatorytest', datatosend, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }
  //

  GetMandatorytestById() {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'Excel/GetMandatorytestById?id=1', {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('UserId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  GetMandatorytestById2() {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'Excel/GetMandatorytestById?id=2', {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('UserId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  //Manage Location-

  GetAllLocationData() {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'LocationName/GetAllLocationName', {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  InsertLocationData(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'LocationName/InsertLocationName',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  UpdateLocationData(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'LocationName/UpdateLocationName',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  DeleteLocationData(id) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'LocationName/DeleteLocationName?Id=' + id, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllAuthPhoneNo() {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'AuthPhone/GetAllAuthPhoneNo', {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  InserAuthorizedNumber(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'AuthPhone/InsertAuthPhoneNo', datatosend, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  UpdateAuthorizedNo(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'AuthPhone/UpdateAuthPhoneNoDetails',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  DeletePhoneNo(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'AuthPhone/DeleteAuthPhoneNo?id=' + Id, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  UpdateAuthorization(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'AuthDevices/UpdateAuthenticateDevice',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  GetOtp(MobileNo, otp) {
    console.log('serviceconsole', MobileNo, otp);
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(
        environment.baseURL +
          'Login/CheckOTP?MobileNo=' +
          MobileNo +
          '&otp=' +
          otp,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // ResendOtp(Mobile) {
  //   console.log('serviceconsoleotp', Mobile);
  //   this.userid = localStorage.getItem('userId');

  //   return this.http
  //     .get(environment.baseURL + 'Login/ResendOTP?userGuid=' + Mobile, {
  //       headers: new HttpHeaders()
  //         .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
  //         .append('userId', this.userid),
  //     })
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  ResendOtp(datasending): Observable<any> {
    console.log('checking service file', datasending);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      CommonToken: 'Co839f79-6869-43c2-bye3-1292f8b71dre',
    });
    const options = { headers: headers };
    return this.http
      .get(
        environment.baseURL + 'Login/ResendOTP?userGuid=' + datasending,
        options
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  GetRetention() {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'DataRetention/GetDataRetentionDetails', {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('UserId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  SmtpUpdate(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'ExcelDetails/UpdateExcelDetails',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('UserId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // PasswordExcelUpdate(datatosend) {
  //   this.userid = localStorage.getItem('userId');
  //   return this.http
  //     .post(environment.baseURL + 'PasswordConfig/UpdatePasswordConfig',datatosend, {
  //       headers: new HttpHeaders()
  //         .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
  //         .append('UserId', this.userid),
  //     })
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  GetExcelPassword() {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'ExcelDetails/GetExcelDetailsById?id=1', {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('UserId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // GetExcelFilePassword() {
  //   this.userid = localStorage.getItem('userId');
  //   return this.http
  //     .get(environment.baseURL + 'PasswordConfig/GetPasswordConfigById?id=1', {
  //       headers: new HttpHeaders()
  //         .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
  //         .append('UserId', this.userid),
  //     })
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  getAllEmails() {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'ScheduledReports/GetAllScheduledReports', {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  InserEmails(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'ScheduledReports/InsertScheduledReports',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  UpdateEmails(datatosend) {
    console.log('serviceessssssss', datatosend);

    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'ScheduledReports/UpdateScheduledReportsDetails',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  DeleteEmails(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(
        environment.baseURL +
          'ScheduledReports/DeleteScheduledReports?Id=' +
          Id,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  PasswordExcelUpdate(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'PasswordConfig/UpdatePasswordConfig',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('UserId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  GetExcelFilePassword() {
    this.userid = localStorage.getItem('userId');
    return this.http.get(
      environment.baseURL + 'PasswordConfig/GetPasswordConfigById?id=1',
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('UserId', this.userid),
      }
    );
  }

  GetAllDataFields() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      CommonToken: 'Co839f79-6869-43c2-bye3-1292f8b71dre',
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http
      .get(environment.baseURL + 'DataField/GetAllDataFields', options)
      .pipe(retry(1), catchError(this.handleError));
  }

  addDataFileds(datatosend) {
    console.log(datatosend);

    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'DataField/InsertDataFields', datatosend, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  updateDataFileds(datatosend) {
    console.log(datatosend);

    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'DataField/UpdateDataField', datatosend, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteDataField(id) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'DataField/DeleteDataField?Id=' + id, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  GetAllDoors() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http
      .get(environment.baseURL + 'Door/GetAllDoor', options)
      .pipe(retry(1), catchError(this.handleError));
  }

  addDoors(datatosend) {
    console.log(datatosend);

    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'Door/InsertDoor', datatosend, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  updateDoors(datatosend) {
    console.log(datatosend);

    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'Door/UpdateDoor', datatosend, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteDoor(id) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'Door/DeleteDoor?Id=' + id, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }
  GetAllEthernet() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http
      .get(environment.baseURL + 'Ethernet/GetAllEthernet', options)
      .pipe(retry(1), catchError(this.handleError));
  }
  addEthernet(datatosend) {
    console.log(datatosend);

    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'Ethernet/InsertEthernet', datatosend, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }
  updateEthernet(datatosend) {
    console.log(datatosend);

    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'Ethernet/UpdateEthernet', datatosend, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteEthernet(id) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'Ethernet/DeleteEthernet?Id=' + id, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }
  GetAllQrReaders() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http
      .get(environment.baseURL + 'QRReader/GetAllQRReader', options)
      .pipe(retry(1), catchError(this.handleError));
  }

  addQr(datatosend) {
    console.log(datatosend);

    this.userid = localStorage.getItem('userId');
    return this.http
      .post(environment.baseURL + 'QRReader/InsertQRReader', datatosend, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  updateQr(datatosend) {
    console.log(datatosend);

    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'QRReader/UpdateQRReaderDetails',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  DeleteQr(id) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'QRReader/DeleteQRReader?Id=' + id, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }
  GetAllVisitSchedule() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http
      .get(environment.baseURL + 'VisitSchedules/GetAllVisitSchedules', options)
      .pipe(retry(1), catchError(this.handleError));
  }
  addSchedule(datatosend) {
    console.log(datatosend);

    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'VisitSchedules/InsertVisitSchedules',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  updateSchedule(datatosend) {
    console.log(datatosend);

    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'VisitSchedules/UpdateVisitSchedules',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteSchedule(id) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(
        environment.baseURL + 'VisitSchedules/DeleteVisitSchedules?Id=' + id,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  StatusVisitSchedules(id) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(
        environment.baseURL + 'VisitSchedules/StatusVisitSchedules?Id=' + id,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  GetAllReservedDays() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http
      .get(environment.baseURL + 'ReservedDays/GetAllReservedDays', options)
      .pipe(retry(1), catchError(this.handleError));
  }
  addDays(datatosend) {
    console.log(datatosend);

    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'ReservedDays/InsertReservedDays',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateDays(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'ReservedDays/UpdateReservedDays',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteDays(id) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'ReservedDays/DeleteReservedDays?Id=' + id, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }
  updateProfile(datatosend) {
    console.log(datatosend);

    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'ProfileDetails/UpdateProfileDetails',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  GetQRcodeSettingsById(id) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(
        environment.baseURL + 'QRcodeSettings/GetQRcodeSettingsById?Id=' + id,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  UpdateQRcodeSettings(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'QRcodeSettings/UpdateQRcodeSettings',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  TestDevice(ip, port) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(
        environment.baseURL + 'QRReader/TestDevice?ip=' + ip + '&port=' + port,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  returnUrl1='/access'
  handleError(error) {
    console.log(error);

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);

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
        window.location.href = redirectSession

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
      localStorage.clear();
      // }
      // });

      return throwError(errorMessage);
    } else if (error.status == '0') {
      Swal.fire({
        title: 'Disconnected',
        text: 'Please check your internet connection',
        icon: 'warning',
      });
      console.log(document.URL);
    } else if (error.status == '400') {
      Swal.fire({
        title: 'Error',
        text: `${error.statusText}`,
        icon: 'info',
      });
   if(error.error == 'Access Denied'){
Swal.close()
            //  window.location.href=environment.redirectdenied;
            window.location.href='#/access';
                this.spinner.hide()
   }
  
    }
    
  
    else if (error.status == '502') {
      Swal.fire({
        title: 'Error',
        text: 'Bad Gateway',
        icon: 'warning',
      });
    } else if (error.status == '500') {
      Swal.fire({
        title: 'Error',
        text: 'Internal Server Error',
        icon: 'warning',
      });
    } else {
      Swal.fire({
        title: 'Something went wrong',
        text: '',
        icon: 'error',
      });
    }
  }

  GetProfileDetailsById() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      CommonToken: 'Co839f79-6869-43c2-bye3-1292f8b71dre',
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http
      .get(
        environment.baseURL +
          'ProfileDetails/GetProfileDetailsById?UserGuid=' +
          localStorage.getItem('userId'),
        options
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  unlockDoors(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(environment.baseURL + 'Door/UnlockDoor?Id=' + Id, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      })
      .pipe(retry(1), catchError(this.handleError));
  }
  DataRetention(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'DataRetention/insertDataRetention',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('UserId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updatePasswordConfig(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'DataRetention/insertDataRetention',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('UserId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  addWeeks(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'RecurssionHolidays/InsertRecurssionHolidays',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('UserId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateWeeks(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .post(
        environment.baseURL + 'RecurssionHolidays/UpdateRecurssionHolidays',
        datatosend,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('UserId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteWeeks(id: any) {
    this.userid = localStorage.getItem('userId');
    return this.http
      .get(
        environment.baseURL +
          'RecurssionHolidays/DeleteRecurssionHolidays?Id=' +
          id,
        {
          headers: new HttpHeaders()
            .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
            .append('userId', this.userid),
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllWeeks() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http
      .get(
        environment.baseURL + 'RecurssionHolidays/GetAllRecurssionHolidays',
        options
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getHolidaysById(id: any) {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http
      .get(
        environment.baseURL +
          'ReservedDays/GetReservedDaysByLocationId?LocationId=' +
          id,
        options
      )
      .pipe(retry(1), catchError(this.handleError));
  }
}
