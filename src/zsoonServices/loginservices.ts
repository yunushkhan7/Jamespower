import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
const redirectSession = environment.redirectSessionTimeout;
@Injectable({
  providedIn: 'root'
})

export class loginServices {

  returnUrl = '/login'
  constructor(private http: HttpClient, private router: Router) { }
  private apiUrl = 'https://idscanuatw.demosystembd.com/api/';
  userid: any = localStorage.getItem('userId');

  authenticateUser(datasending): Observable<any> {
    console.log('checking service file', datasending)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'CommonToken': 'Co839f79-6869-43c2-bye3-1292f8b71dre' },);
    const options = { headers: headers };
    return this.http.post(environment.baseURL + 'Login/AuthenticateUser', datasending, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  changePassword(datachange) {
    const headers = new HttpHeaders({ 'userId': localStorage.getItem("userId"), 'Authorization': 'Bearer ' + localStorage.getItem("token") });
    const options = { headers: headers };
    return this.http.post(environment.baseURL + 'Login/ChangePassword', datachange, options).pipe(
      retry(1),
      catchError(this.handleError)
    );;
  }

  changePasswordpreauth(datachange) {
    const headers = new HttpHeaders({ 'userId': localStorage.getItem("userId") });
    const options = { headers: headers };
    return this.http.post(environment.baseURL + 'Login/ChangePasswordPreAuth', datachange, options).pipe(
      retry(1),
      catchError(this.handleError)
    );;
  }

  forgotdata(data) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'CommonToken': 'Co839f79-6869-43c2-bye3-1292f8b71dre' });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Login/ForgotPasswordOTP?EmailId=' + data, options).pipe(
      retry(1),
      catchError(this.handleError)
    );;
  }

  GetRoleByNavigation() {
    const headers = new HttpHeaders({ 'userId': localStorage.getItem("userId"), 'Authorization': 'Bearer ' + localStorage.getItem("token") });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Role/GetRoles', options).pipe(
      retry(1),
      catchError(this.handleError)
    );;
  }

  submitOtp(userId, otp) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'CommonToken': 'Co839f79-6869-43c2-bye3-1292f8b71dre' });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Login/SubmitOTP?userGuid=' + userId + '&OTP=' + otp ,options).pipe(
      retry(1),
      catchError(this.handleError)
    );;
  }

  PasswordRest(uname,uemail) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'CommonToken': 'Co839f79-6869-43c2-bye3-1292f8b71dre' });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Login/PasswordRest?UserName=' + uname + '&Email=' + uemail ,options).pipe(
      retry(1),
      catchError(this.handleError)
    );;
  }

  PasswordResetCode(uemail, uotp) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'CommonToken': 'Co839f79-6869-43c2-bye3-1292f8b71dre' });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Login/PasswordResetCode?Email=' + uemail + '&OTP=' + uotp ,options).pipe(
      retry(1),
      catchError(this.handleError)
    );;
  }

  CreateNewPassword(uemail, upass,reset) {
    console.log(uemail,upass,reset);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'CommonToken': 'Co839f79-6869-43c2-bye3-1292f8b71dre' });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Login/CreateNewPassword?EmailId=' + uemail + '&password=' + upass + '&otp=' + reset ,options).pipe(
      retry(1),
      catchError(this.handleError)
    );;
  }
  // ScanandPrint() {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'CommonToken': 'Co839f79-6869-43c2-bye3-1292f8b71dre' });
  //   const options = { headers: headers };
  //   return this.http.get(environment.baseURL + 'PatientLogParkway/GetAllSettings', options).pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   );;
  // }

  Logout() {
    const headers = new HttpHeaders({ 'userId': localStorage.getItem("userId"), 'Authorization': 'Bearer ' + localStorage.getItem("token") });
    const options = { headers: headers };
    return this.http.get(environment.baseURL + 'Login/Logout', options).pipe(
      retry(1),
      catchError(this.handleError)
    );;
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;   // client-side error
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;  // server-side error
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
