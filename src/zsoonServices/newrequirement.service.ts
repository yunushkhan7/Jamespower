import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
//import { environment } from '../../environments/environment';
const redirectSession = environment.redirectSessionTimeout;

@Injectable({
  providedIn: 'root',
})
export class ExtraService {
  returnUrl = '/login';
  constructor(private http: HttpClient, private router: Router) { }
  userid: any = localStorage.getItem('userId');

  GetAllCountries() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Countries/GetAllCountries', options);
  }

  InsertCountry(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Countries/InsertCountries', datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  UpdateCountry(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Countries/UpdateCountriesDetails', datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  DeleteCountry(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'Countries/DeleteCountries?Id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  GetAllRaces() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Race/GetAllRaces', options);
  }

  InsertRace(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Race/InsertRace',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  UpdateRace(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Race/UpdateRaceDetails',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  DeleteRace(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'Race/DeleteRace?Id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  GetAllTittles() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Titles/GetAllTitles', options);
  }

  InsertTitles(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Titles/InsertTitles',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  UpdateTitle(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Titles/UpdateTitlesDetails',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  DeleteTitle(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'Titles/DeleteTitles?Id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  GetAllInsurance() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Insurance/GetAllInsurances', options);
  }

  InsertInsurance(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Insurance/InsertInsurance',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  UpdateInsurance(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Insurance/UpdateInsuranceDetails',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  DeleteInsurance(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'Insurance/DeleteInsurance?Id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  GetAllAPITokens() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'TokenGeneration/GetAllTokens', options);
  }

  InsertApi(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'TokenGeneration/InsertToken',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  DeleteApiToken(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'TokenGeneration/DeleteToken?Id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  GetAllPatientProfiles() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Patientprofile/GetAllPatientProfiles', options)
  }

  multifilterforPatientProfile(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Patientprofile/multifilterforPatientProfile', datatosend, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    }
    );
  }

  DownloadPatientprofiles(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Patientprofile/DownloadPatientprofiles', datatosend, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    }
    );
  }

  GetAllPatientprofilesById(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'Patientprofile/GetAllPatientprofilesById?Id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  GetallHealthCertificates(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'Patientprofile/GetallHealthCertificates?Id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  GetPaientProfileById(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'Patientprofile/GetPaientProfileById?ID=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  GetAllDoctor() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Doctor/GetAllDoctor', options)
  }

  InsertDoctor(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Doctor/InsertDoctors',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  UpdateDoctor(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Doctor/UpdateDoctorsDetails',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  DeleteDoctor(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'Doctor/DeleteDoctors?Id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  GetAllClinic() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Clinic/GetAllClinic', options)
  }

  InsertClinic(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Clinic/InsertClinic',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  UpdateCinic(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Clinic/UpdateClinicDetails',
      datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  DeleteCinic(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'Clinic/DeleteClinic?Id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  GetEorderingDetails(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'EorderingDetails/GetEorderingDetailsByID?id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  UpdateEorderingDetails(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'EorderingDetails/UpdateEorderingDetails', datatosend, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    }
    );
  }

  GetAllEorderingLogs() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'EorderingLogs/GetAllEorderingLogs', options)
  }

  GetAllVaccinationDB(apiEndPoint, params) {
    const { page, limit, filter, download } = params;
    let url = `${apiEndPoint}Vaccination/GetallVaccinations?`
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

  GetComparisionData(apiEndPoint, params) {
    const { page, limit } = params;
    let url = `${apiEndPoint}Vaccination/GetComparisionData?`
    if (page != null && page != undefined && page != '') {
      url += `&pageno=${page}`;
    }
    if (limit != null && limit != undefined && limit != '') {
      url += `&limit=${limit}`;
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

  UpdateVaccinationByComparasion(apiEndPoint, params) {
    const { nric, sourceType, keepDb, keepExcel } = params;
    let url = `${apiEndPoint}Vaccination/UpdateVaccinationByComparasion?`

    if (nric != null && nric != undefined && nric != '') {
      url += `&nric=${nric}`;
    }

    if (sourceType != null && sourceType != undefined && sourceType != '') {
      url += `&sourceType=${sourceType}`;
    }

    if(keepDb){
      url += `&keepDb=${sourceType}`;
    }

    if(keepExcel){
      url += `&keepDb=${sourceType}`;
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

  UpdateVaccinationDB(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Vaccination/UpdateVaccination', datatosend, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    }
    );
  }

  DeleteVaccinationDB(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.delete(environment.baseURL + 'Vaccination/DeleteVaccination?id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  GetDXSettingsDetailsById(Id) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + 'DXSettings/GetDXSettingsDetailsById?id=' + Id, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  UpdateDXSettingsDetails(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'DXSettings/UpdateDXSettingsDetails', datatosend, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    }
    );
  }

  UploadVaccination(datatosend) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Vaccination/UploadVaccination', datatosend,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  FilterVaccination(datatofilter) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'Vaccination/FilterVaccinations', datatofilter,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  GetVaccinationRecord(Id, Passport) {
    this.userid = localStorage.getItem('userId');
    return this.http.get(environment.baseURL + `DXSettings/GetVaccinationRecord?passport=${Passport}&nric=${Id}`, {
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('userId', this.userid),
    });
  }

  GetAllVaccinationRecords() {
    this.userid = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      userId: localStorage.getItem('userId'),
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'DXSettings/GetAllVaccinationRecords', options)
  }

  ApproveVaccinationcertificates(approvearr) {
    this.userid = localStorage.getItem('userId');
    return this.http.post(
      environment.baseURL + 'DXSettings/ApproveVaccinationcertificates', approvearr,
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('userId', this.userid),
      }
    );
  }

  GetVaccinationControl(apiEndPoint, params) {
    const { page, limit } = params;
    let url = `${apiEndPoint}Vaccination/GetVaccinationControl?`
    if (page != null && page != undefined && page != '') {
      url += `&pageno=${page}`;
    }
    if (limit != null && limit != undefined && limit != '') {
      url += `&limit=${limit}`;
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
