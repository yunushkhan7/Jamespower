import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { environment } from 'src/environments/environment';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
const API = environment.baseURL;
@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {
  key: string = 'userName';
  reverse: boolean = false;
  searchText;
  paginationDetails: any;
  @ViewChild('paginator') paginator: MatPaginator;

  controllers: any = []

  paginationData = {
    page: 1,
    limit: 5,
  };

  constructor(
    private router: Router,
    private extraservice: ExtraService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.GetVaccinationControl();
  }
  downloadbool;
  GetVaccinationControl() {
    const params = {
      limit: this.paginationData.limit,
      page: this.paginationData.page,
    }
    this.spinner.show();
    this.extraservice.GetVaccinationControl(API, params).subscribe((data: any) => {
      this.paginationDetails = data;
      this.spinner.hide();
      this.paginationData.limit = this.paginationDetails?.limit;
      this.paginationData.page = this.paginationDetails?.page;
      var x = this.paginationData.limit * this.paginationData.page - this.paginationData.limit + 1;
      if (x <= this.paginationDetails.totalDocs || this.paginationDetails.totalDocs == 0) {
        this.controllers = this.paginationDetails.data;
        this.controllers.forEach(elearr => {
          elearr.uploadedAt = elearr.uploadedAt.slice(0, 10);
          let da = elearr.uploadedAt;
          let yy = da.substr(0, 4);
          let mm = da.substr(5, 2);
          let dd = da.substr(8, 2);
          let tt = da.substr(11, 5);
          elearr.uploadedAt = dd + '-' + mm + '-' + yy + ' ' + tt;
          elearr.uploadedAt === "01-01-0001 00:00" ? elearr.uploadedAt = "N/A" : elearr.uploadedAt;
          console.log(elearr.errorStatus, 'typeof errorStatus', typeof elearr.errorStatus);
          let x = elearr.errorStatus;
         if(elearr.errorStatus == null){
           console.log("keshava null")
         }
          console.log(x.includes("https:"));

          if (x.includes("https:")) {
            this.downloadbool = true;
          } else {
            this.downloadbool = false;
          }



          if (typeof x == null) {
            console.log('Hey.. Null')
          }
          // let x = elearr.errorStatus.includes("https");
          // if (x) {
          //   console.log(true);
          // } else {
          //   console.log(false);
          // }
          // JSON.stringify(elearr.errorStatus)
          // if(typeof elearr.errorStatus == "string"){

          // }
        });
      } else {
        this.paginator.firstPage();
      }
    })
  }

  pageChanged(page): void {
    console.log('page', page);
    this.paginationData.page = page?.pageIndex + 1;
    this.paginationData.limit = page?.pageSize;
    this.GetVaccinationControl();
  }

  ReadyForReview() {
    this.router.navigateByUrl('/controller/comparedata');
  }

  downloadStatus(link) {
    console.log(link);
    window.location.href = link;
  }

  sort(e) {

  }
  Refresh() {
    // Reload the api
    // const paginationData = {
    //   page: 1,
    //   limit: 5,
    // };

    window.location.reload();

  }

}
