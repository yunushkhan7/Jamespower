import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
import { FinalepopupComponent } from '../finalepopup/finalepopup.component';
import { VacinationdbComponent } from '../vacinationdb/vacinationdb.component';
const API = environment.baseURL;


@Component({
  selector: 'app-comparedata',
  templateUrl: './comparedata.component.html',
  styleUrls: ['./comparedata.component.scss']
})
export class ComparedataComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  records: any[] = [];
  records1: any[] = [];
  records2: any[] = [];

  paginationData = {
    page: 1,
    limit: 5,
  };
  paginationDetails: any;

  constructor(
    private dialog: MatDialog,
    private extraservice: ExtraService,
    private spinner: NgxSpinnerService
  ) { }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
  temparray = []
  ngOnInit(): void {
    this.GetComparisionData();
    console.log('this.records', this.records);

    // this.records1.forEach(subarr => {
    //   console.log(subarr)

    //   subarr.forEach(element => {
    //     element.uquid = 1;
    //     subarr.forEach(element2 => {
    //       if(element.id == element2.id){
    //         element.uquid
    //       }
    //     });
    //   });

    //   for (let i = 0; i <= subarr.length; i++) {
    //     const element1 = subarr[i];
    //     for (let j = i+1; j <= subarr.length-1; j++) {
    //       const element2 = subarr[j];
    //       if (element1.id == element2.id) {

    //         // console.log('Grouped_Array', grouped.get(element1.id));
    //         // this.records1.push(grouped.get((element1.id)));
    //         // console.log(this.records1);
    //       }
    //     }
    //   }
    // });
  }

  pageChanged(page): void {
    console.log('page', page);
    this.paginationData.page = page?.pageIndex + 1;
    this.paginationData.limit = page?.pageSize;
    this.GetComparisionData();
  }

  GetComparisionData() {
    const params = {
      limit: this.paginationData.limit,
      page: this.paginationData.page
    }
    this.spinner.show();
    this.extraservice.GetComparisionData(API, params).subscribe((data: any) => {
      this.paginationDetails = data;
      this.spinner.hide();
      this.paginationData.limit = this.paginationDetails?.limit;
      this.paginationData.page = this.paginationDetails?.page;
      var x = this.paginationData.limit * this.paginationData.page - this.paginationData.limit + 1;
      if (x <= this.paginationDetails.totalDocs || this.paginationDetails.totalDocs == 0) {
        this.records = this.paginationDetails.data;
        this.records.forEach(e => {
          e.uquid = ''
        })
        const grouped = this.groupBy(this.records, record => record.idNumber);
        for (let i = 0; i <= this.records.length; i++) {
          const element1 = this.records[i];
          for (let j = i + 1; j <= this.records.length - 1; j++) {
            const element2 = this.records[j];
            if (element1.idNumber == element2.idNumber) {
              this.records1.push(grouped.get((element1.idNumber)));
            }
          }
        }
      } else {
        this.paginator.firstPage();
      }
    }
    )
  }

  ApproveDB() {
    // this.dialog.open(FinalepopupComponent, { disableClose: true });
    const params = {
      keepDb: true,
      keepExcel: false
    }
    this.extraservice.UpdateVaccinationByComparasion(API, params).subscribe((data: any) => {
      console.log('response=====>', data)
      if (data.sucess) {
        this.GetComparisionData();
      }
    })

  }

  ApproveExcel(){
    const params = {
      keepDb: false,
      keepExcel: true
    }
    this.extraservice.UpdateVaccinationByComparasion(API, params).subscribe((data: any) => {
      console.log('response=====>', data)
      if (data.sucess) {
        this.GetComparisionData();
      }
    })
  }

  goBack() {
    // this.dialog.open(VacinationdbComponent, { disableClose: true });
  }

  isCheckedArray = [];

  yourfunc1(ischeck, record) {

    let id = record.idNumber;
    let unqid = record.uquid
    console.log(record)
    const params = {
      nric: record.idNumber,
      sourceType: record.source,
      keepDb: record.keepDb,
      keepExcel: record.keepExcel
    }
    console.log('params', params);

    this.extraservice.UpdateVaccinationByComparasion(API, params).subscribe((data: any) => {
      console.log('response=====>', data)
      if (data.sucess) {
        this.GetComparisionData();
      }
    })

    this.records1.forEach(subarray => {
      for (let e of subarray) {
        if (e.id == id) {
          this.isCheckedArray = this.records1[e.id - 1];
          console.log('ischeckedArray', this.isCheckedArray);

          this.isCheckedArray.forEach(e => {
            console.log(e, 'unqid', unqid, 'e.unqid', e.uquid);
            (unqid == e.uquid) ? e.ischecked = true : e.ischecked = false;
          })
          break;
        }
      }
    })


  }

  // yourfunc2(e, id) {

  //   if (e.target.checked) {
  //     //Manually checked
  //     this.records2.forEach(e => {
  //       if (id == e.id) {
  //         e.ischecked = true;
  //         console.log("fun2-Manually checked records2", this.records2);
  //       }
  //     });

  //     // Logically checked
  //     this.records1.forEach(e => {
  //       if (e.id == id) {
  //         if (e.ischecked) {
  //           e.ischecked = false;
  //           console.log("fun2-Logically checked records1", this.records1);
  //         }
  //       }
  //     });
  //   }
  // }

  isAllChecked() {
    return this.records1.every(_ => _.ischecked);
  }

  checkAll(ev) {
    this.records1.forEach(x => x.ischecked = ev.target.checked)

    if (ev.target.checked) {
      //Manually checked
      this.records1.forEach(e => {
        e.ischecked = true;
        console.log("CheckAll1-Manually checked records1", this.records1);
      })
      // Logically checked
      this.records2.forEach(e => {
        if (e.ischecked) {
          e.ischecked = false;
          console.log("CheckAll1-Logically checked records2", this.records2);
        }
      });
    }
  }

  isAllChecked2() {
    return this.records2.every(_ => _.ischecked);
  }

  checkAll2(ev) {
    this.records2.forEach(x => x.ischecked = ev.target.checked)

    if (ev.target.checked) {
      //Manually checked
      this.records2.forEach(e => {
        e.ischecked = true;
        console.log("CheckAll2-Manually checked records2", this.records2);
      })
      // Logically checked
      this.records1.forEach(e => {
        if (e.ischecked) {
          e.ischecked = false;
          console.log("CheckAll2-Logically checked records1", this.records1);
        }
      });
    }
  }

  sort(e) {

  }

}
