import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
import Swal from 'sweetalert2';
import { FinalepopupComponent } from '../finalepopup/finalepopup.component';

@Component({
  selector: 'app-validatecertificate',
  templateUrl: './validatecertificate.component.html',
  styleUrls: ['./validatecertificate.component.scss']
})
export class ValidatecertificateComponent implements OnInit {
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  key: string = 'userName';
  reverse: boolean = false;
  ImageSrc= ""
  vaccinationRecords = [];
  approvearr = [];
  showImg = "";

  constructor(
    private extraservices: ExtraService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.GetAllVaccinationRecords();
  }

  GetAllVaccinationRecords() {
    this.spinner.show();
    this.extraservices.GetAllVaccinationRecords().subscribe((data: any) => {
      this.vaccinationRecords = data.detail;
      this.vaccinationRecords.forEach(ele => {
        let da = ele.vaccinationOn;
        let yy = da.substr(0, 4);
        let mm = da.substr(5, 2);
        let dd = da.substr(8, 2);
        let tt = da.substr(11, 5);
        ele.vaccinationOn = dd + '-' + mm + '-' + yy;
        ele.vaccinationOn = ele.vaccinationOn == "01-01-0001 00:00" ? ele.vaccinationOn = "N/A" : ele.vaccinationOn;
      });
      this.vaccinationRecords.forEach(ele => {
        let da = ele.uploadedAt;
        let yy = da.substr(0, 4);
        let mm = da.substr(5, 2);
        let dd = da.substr(8, 2);
        let tt = da.substr(11, 5);
        ele.uploadedAt = dd + '-' + mm + '-' + yy + ' ' + tt;
        ele.uploadedAt = ele.uploadedAt == "01-01-0001 00:00" ? ele.uploadedAt = "N/A" : ele.uploadedAt;
      });
      this.spinner.hide();
    })
  }

  yourfunc(e, id) {
    if (e.target.checked) {
      this.approvearr.push(id);
    } else {
      this.approvearr.forEach((ele, i) => {
        if (id == ele) {
          this.approvearr.splice(i, 1);
        }
      });
    }
  }

  checkAll(ev) {
    this.vaccinationRecords.forEach(x => x.state = ev.target.checked);
    if (ev.target.checked) {
      this.vaccinationRecords.forEach(e => {
        this.approvearr.push(e.id);
      });
    } else {
      this.approvearr = [];
    }
  }

  isAllChecked() {
    return this.vaccinationRecords.every(_ => _.state);
  }

  Approve() {
    console.log(this.approvearr)
    if(this.approvearr.length){
      this.spinner.show()
      this.extraservices.ApproveVaccinationcertificates(this.approvearr).subscribe((res: any) => {
        if (res) {
          Swal.fire({
            title: 'Approved',
            text: 'Vaccination Certificate(s) Verified',
            icon: 'success',
            confirmButtonColor: '#ff8084'
          });
          this.GetAllVaccinationRecords();
          this.approvearr = [];
        }
      })
      this.spinner.hide();
    }
  }

  onChange(data) { this.pageno = data; }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  addItem(record, templateRef: TemplateRef<any>){
    this.dialog.open(templateRef, { disableClose: true });
    this.ImageSrc = record.vaccinationImg;
  }
}
