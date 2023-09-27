import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
import Swal from 'sweetalert2';
import { ComparedataComponent } from '../comparedata/comparedata.component';
const API = environment.baseURL;

declare var $: any;

@Component({
  selector: 'app-vacinationdb',
  templateUrl: './vacinationdb.component.html',
  styleUrls: ['./vacinationdb.component.scss']
})

export class VacinationdbComponent implements OnInit {
  demo: any
  app = false
  key: string = 'userName';
  reverse: boolean = false;
  searchText;
  q: any;
  page = 1
  pageno: any = 5;
  step = 0;
  panelOpenState = false;
  vaccinationDetails = [];
  editvac = false;
  Upload = "";
  filecontent = ""
  finaldata;
  currentDate = new Date();
  dateFormat = 'd/M/y';
  rashid: boolean = false;
  keshava = false;
  notvalid: boolean = false;
  errormsg;
  link = "https://dxartvmweb01.southeastasia.cloudapp.azure.com/Template/VaccinationTemplate.xlsx";
  @ViewChild('paginator') paginator: MatPaginator;



  public filtervaccination = {
    "passportNumber": null,
    "idNumber": null,
    "name": null,
    "dose1": null,
    "dose2": null,
    "validDate": null
  }

  public updatevaccination = {
    "vaccinationId": 0,
    "passportNumber": "",
    "idNumber": "",
    "name": "",
    "dose1": "",
    "dose2": "",
    "validDate": ""
  }

  paginationData = {
    page: 1,
    limit: 5,
  };
  encodeKey: string;
  paginationDetails: any;

  constructor(
    private spinner: NgxSpinnerService,
    private extraservices: ExtraService,
    private dialog: MatDialog,
    private datepipe: DatePipe,
    private router: Router
  ) { }

  PassportNumber = new FormControl('', [
    Validators.required
  ]);

  IdNumber = new FormControl('', [
    Validators.required
  ]);

  PatName = new FormControl('', [
    Validators.required
  ]);

  DoseNo1 = new FormControl('', [
    Validators.required
  ]);

  DoseNo2 = new FormControl('', [
    Validators.required
  ]);

  validDate = new FormControl('', [
    Validators.required
  ]);

  setStep(index: number) {
    this.step = index;
    this.panelOpenState = true;
  }

  ngOnInit(): void {
    this.GetVaccinationDB();
    var today = new Date();
    console.log('today', today);
  }

  onChange(data) { this.pageno = data }

  pageChanged(page): void {
    console.log('page', page);
    this.paginationData.page = page?.pageIndex + 1;
    this.paginationData.limit = page?.pageSize;
    this.GetVaccinationDB();
  }

  GetVaccinationDB() {
    // this.spinner.show();
    const params = {
      limit: this.paginationData.limit,
      page: this.paginationData.page,
      filter: this.encodeKey,
      // download: this.isDownload
    }
    this.spinner.show();
    this.extraservices.GetAllVaccinationDB(API, params).subscribe((data: any) => {
      this.paginationDetails = data;
      console.log(this.paginationDetails)
      this.spinner.hide();
      this.paginationData.limit = this.paginationDetails?.limit;
      this.paginationData.page = this.paginationDetails?.page;
      var x = this.paginationData.limit * this.paginationData.page - this.paginationData.limit + 1;

      if (x <= this.paginationDetails.totalDocs || this.paginationDetails.totalDocs == 0) {
        this.vaccinationDetails = this.paginationDetails.data;
      } else {
        this.paginator.firstPage();
      }

      this.vaccinationDetails.forEach(ele => {
        ele.dose1 = ele.dose1.slice(0, 10);
        let da = ele.dose1;
        let yy = da.substr(0, 4);
        let mm = da.substr(5, 2);
        let dd = da.substr(8, 2);
        ele.dose1 = dd + '-' + mm + '-' + yy;
        ele.dose1 = ele.dose1 == "01-01-0001" ? ele.dose1 = "N/A" : ele.dose1;
      });
      this.vaccinationDetails.forEach(ele => {
        ele.dose2 = ele.dose2.slice(0, 10);
        let da = ele.dose2;
        let yy = da.substr(0, 4);
        let mm = da.substr(5, 2);
        let dd = da.substr(8, 2);
        ele.dose2 = dd + '-' + mm + '-' + yy;
        ele.dose2 = ele.dose2 == "01-01-0001" ? ele.dose2 = "N/A" : ele.dose2;
      });
      this.vaccinationDetails.forEach(ele => {
        ele.validDate = ele.validDate.slice(0, 10);
        let da = ele.validDate;
        let yy = da.substr(0, 4);
        let mm = da.substr(5, 2);
        let dd = da.substr(8, 2);
        ele.validDate = dd + '-' + mm + '-' + yy;
        ele.validDate = ele.validDate == "01-01-0001" ? ele.validDate = "N/A" : ele.validDate;
      });
      this.spinner.hide();
    })

  }

  UpdateVaccination(data) {
    console.log(data);
    (data.dose1 == "--N/T00:00:00")
      ? data.dose1 = "0001-01-01T00:00:00"
      : data.dose1 = this.datepipe.transform(new Date(data.dose1), 'yyyy-MM-ddT00:00:00');;


    data.dose2 = this.datepipe.transform(new Date(data.dose2), 'yyyy-MM-ddT00:00:00');
    data.validDate = this.datepipe.transform(new Date(data.validDate), 'yyyy-MM-ddT00:00:00');

    if (data.vaccinationId && data.name && data.dose2 && data.validDate) {

      const datatosend = {
        "vaccinationId": data.vaccinationId,
        "idNumber": data.idNumber,
        "name": data.name,
        "dose1": data.dose1,
        "dose2": data.dose2,
        "validDate": data.validDate
      }
      console.log('datatosend', datatosend)
      this.extraservices.UpdateVaccinationDB(datatosend).subscribe((data: any) => {
        if (data.sucess) {
          Swal.fire({
            title: 'Updated',
            text: 'VaccinationDB is updated Successfully',
            icon: 'success',
            confirmButtonColor: '#ff8084',
          })
          this.GetVaccinationDB();
          this.editvac = false;
        }
      })

    } else {
      // this.PassportNumber.markAsTouched();
      this.IdNumber.markAsTouched();
      this.PatName.markAsTouched();
      this.DoseNo2.markAsTouched();
    }
  }

  DeleteVacciantionDB(id) {
    console.log('deleted id', id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
    }).then((res) => {
      if (res.value) {
        this.extraservices.DeleteVaccinationDB(id).subscribe((success) => {
          this.GetVaccinationDB();
          if (success) {
            Swal.fire('Deleted', 'Vaccination has been deleted', 'success');
          }
        });
      }
    });
  }

  DownloadTemp() {
    window.open(this.link, '_blank');
  }

  Cancel() {
    this.errormsg = "";
    this.Upload = "";
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
    let locvardose1 = null;
    let locvardose2 = null;
    let validDate = null;
    data.passportNumber = (data.passportNumber !== "") ? data.passportNumber : null;
    data.idNumber = (data.idNumber !== "") ? data.idNumber : null;
    data.name = (data.name !== "") ? data.name : null;

    if (data.dose1 != null) {
      const formatteddatetime1 = this.RegistrationTime(data.dose1);
      locvardose1 = formatteddatetime1;
    }

    if (data.dose2 != null) {
      const formatteddatetime = this.RegistrationTime(data.dose2);
      locvardose2 = formatteddatetime;
    }

    if (data.validDate != null) {
      const formatteddatetime = this.RegistrationTime(data.validDate);
      validDate = formatteddatetime;
    }

    const datatofilter = {
      "passportNumber": data.passportNumber,
      "idNumber": data.idNumber,
      "name": data.name,
      "dose1": locvardose1,
      "dose2": locvardose2,
      "validDate": validDate
    }

    this.encodeKey = encodeURIComponent(JSON.stringify(datatofilter));
    this.GetVaccinationDB();

    // this.spinner.show();
    // this.extraservices.FilterVaccination(datatofilter).subscribe((data: any) => {
    //   console.log('Response', data)
    //   this.vaccinationDetails = data.vaccinations
    //   console.log('vaccinationDetails', this.vaccinationDetails)
    //   this.vaccinationDetails.forEach(ele => {
    //     ele.dose1 = ele.dose1.slice(0, 10);
    //     let da = ele.dose1;
    //     let yy = da.substr(0, 4);
    //     let mm = da.substr(5, 2);
    //     let dd = da.substr(8, 2);
    //     ele.dose1 = dd + '-' + mm + '-' + yy;
    //     ele.dose1 = ele.dose1 == "01-01-0001" ? ele.dose1 = "N/A" : ele.dose1;
    //   });
    //   this.vaccinationDetails.forEach(ele => {
    //     ele.dose2 = ele.dose2.slice(0, 10);
    //     let da = ele.dose2;
    //     let yy = da.substr(0, 4);
    //     let mm = da.substr(5, 2);
    //     let dd = da.substr(8, 2);
    //     ele.dose2 = dd + '-' + mm + '-' + yy;
    //     ele.dose2 = ele.dose2 == "01-01-0001" ? ele.dose2 = "N/A" : ele.dose2;
    //   });
    //   this.vaccinationDetails.forEach(ele => {
    //     ele.validDate = ele.validDate.slice(0, 10);
    //     let da = ele.validDate;
    //     let yy = da.substr(0, 4);
    //     let mm = da.substr(5, 2);
    //     let dd = da.substr(8, 2);
    //     ele.validDate = dd + '-' + mm + '-' + yy;
    //     ele.validDate = ele.validDate == "01-01-0001" ? ele.validDate = "N/A" : ele.validDate;
    //   });
    //   this.spinner.hide();
    // })
  }

  ConvertDateFormat(date) {
    let da = date;
    let yy = da.substr(6, 8);
    let mm = da.substr(3, 2);
    let dd = da.substr(0, 2);
    return date = yy + '-' + mm + '-' + dd + 'T00:00:00'
  }

  EditVaccinationDB(data: any) {
    console.log('dataid', data)
    this.updatevaccination = data;
    this.editvac = true;
    this.DoseNo2.reset();
    this.DoseNo1.reset();
    this.PassportNumber.reset();
    this.IdNumber.reset();
    this.PatName.reset();
    data.dose1 = this.ConvertDateFormat(data.dose1);
    data.dose2 = this.ConvertDateFormat(data.dose2);
    data.validDate = this.ConvertDateFormat(data.validDate);
  }

  Close() {
    this.editvac = false;
    this.GetVaccinationDB();
  }

  Refresh() {
    this.filtervaccination = {
      "passportNumber": null,
      "idNumber": null,
      "name": null,
      "dose1": null,
      "dose2": null,
      "validDate": null
    }
    this.encodeKey = encodeURIComponent(JSON.stringify(this.filtervaccination));

    window.location.reload();
    this.GetVaccinationDB();
  }

  // uploadFile(files: any, templateRef: TemplateRef<any>) {
  //   this.dialog.open(templateRef, { disableClose: true });
  //   this.keshava = true;
  //   let fileToUpload = <File>files[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);
  //   this.finaldata = formData;
  // };

  uploadFile(files: any, templateRef: TemplateRef<any>) {
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.finaldata = formData;
    this.spinner.show();
    this.extraservices.UploadVaccination(this.finaldata).subscribe((data: any) => {
      this.spinner.hide();
      // this.fm = data.message
      Swal.fire({
        title: 'File Uploaded',
        text: data.message,
        icon: 'success',
        confirmButtonColor: '#ff8084',
      })
      // this.dialog.open(templateRef, { disableClose: true });
    })

  }

  Next() {
    this.dialog.open(ComparedataComponent, { disableClose: true });
  }






  //==================>>>>>>>>>>>>>Important code<<<<<<<<<<<====================

  // Confirmation(templateRef: TemplateRef<any>) {
  //   if (this.Upload == "Upload" || this.Upload == "UPLOAD" || this.Upload == "upload") {
  //     // this.router.navigateByUrl('/comparedata')
  //     this.dialog.open(ComparedataComponent, { disableClose: true });

  //     this.extraservices.UploadVaccination(this.finaldata).subscribe((data: any) => {
  //       console.log('response', data);


  //       /**  DON'T REMOVE THIS CODE THIS IMPORTANT CODE */

  //       // $('#success1').modal('show');
  //       // if (data.message == "No records Found") {
  //       //   this.errormsg = 'Empty File! ' + data.message
  //       // } else if (data.message == "Wrong Date Format") {
  //       //   this.errormsg = "Wrong Date Format"
  //       // } else {
  //       //   localStorage.setItem('msg', data.message);
  //       //   this.dialog.open(templateRef, { disableClose: true });
  //       //   this.rashid = true;
  //       //   this.spinner.show();
  //       //   setTimeout(() => {
  //       //     this.spinner.hide();
  //       //     this.rashid = false;
  //       //     this.keshava = false;
  //       //     this.dialog.open(FinalepopupComponent, { disableClose: true });
  //       //   }, 2000);
  //       // }
  //     })
  //   } else {
  //     if (this.Upload == "") {
  //       this.Upload = "Type Upload here..."
  //       this.notvalid = true;
  //     }
  //   }
  // }

  keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    var k = event ? event.which : event.keyCode;
    if (k == 32) { return false }
    if (/[a-zA-Z]/.test(inp)) { return true; }
    else { event.preventDefault(); return false; }
  }

  clicked() {
    if (this.notvalid) {
      this.notvalid = false;
      this.Upload = "";
    }
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }
}
