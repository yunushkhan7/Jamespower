import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';

@Component({
  selector: 'app-healthcert',
  templateUrl: './healthcert.component.html',
  styleUrls: ['./healthcert.component.scss']
})
export class HealthcertComponent implements OnInit {
  viewId: any;
  p: any;
  searchText;
  page = 1;
  pageno: any = 5;
  pageSize = 5;
  key: string = 'userName';
  reverse: boolean = false;
  healthcerts:any =[];

  constructor(
    private routes: ActivatedRoute,
    private extraservice : ExtraService
  ) {
    if (this.routes.snapshot.params['id']) {
      this.viewId = this.routes.snapshot.params['id'];
      this.GetallHealthCertificates();
    }
  }
  ngOnInit(): void {
    this.GetallHealthCertificates();
  }
  // onChange(data) { this.pageno1 = data; }
  onChange(data) { this.pageno = data; }

  GetallHealthCertificates() {
    this.extraservice.GetallHealthCertificates(this.viewId).subscribe((data:any)=>{
      this.healthcerts = data.data.accredify;
      console.log('HealthCertData',this.healthcerts);
      this.healthcerts.forEach(elearr => {
        let newarr = [];
        elearr.ccl.forEach(cclname => {
          newarr.push(cclname);
        });
        // elearr.dateofbirth = elearr.dateofbirth.slice(0, 10);
        // elearr.dateofbirth === "0001-01-01" ? elearr.dateofbirth = "N/A" : elearr.dateofbirth
        var cclnames = newarr.toString();
        elearr.cclresults = cclnames;
        console.log('===>',elearr.cclresults)
      });
    })
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  // Page2(event){
  //   this.q = event;
  // }
}
