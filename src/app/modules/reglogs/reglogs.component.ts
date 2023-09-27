import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';

@Component({
  selector: 'app-reglogs',
  templateUrl: './reglogs.component.html',
  styleUrls: ['./reglogs.component.scss']
})
export class ReglogsComponent implements OnInit {
  public viewId: any;
  searchText;
  pageno: any = 5;
  q: any
  key: string = 'userName'
  reverse: boolean = false;
  public patientReg:any = [];

  constructor(
    private routes: ActivatedRoute,
    private extraservice : ExtraService
  ) {
    if (this.routes.snapshot.params['id']) {
      this.viewId = this.routes.snapshot.params['id'];
      this.GetAllPatientprofilesById();
    }
  }

  ngOnInit(): void {
    this.GetAllPatientprofilesById();
  }

  PAGE(event){
    this.q = event;
  }

  onChange(data) { this.pageno = data; }

  GetAllPatientprofilesById(){
    this.extraservice.GetAllPatientprofilesById(this.viewId).subscribe((data:any)=>{
      this.patientReg = data.data;
      this.patientReg.forEach(elearr => {
        let newarr = [];
        elearr.testNames.forEach(object => {
          newarr.push(object.testname);
        });
        elearr.dateofbirth = elearr.dateofbirth.slice(0, 10);
        let da = elearr.dateofbirth;
        let yy = da.substr(0,4);
        let mm = da.substr(5,2);
        let dd = da.substr(8,2);
        elearr.dateofbirth = dd+'-'+mm+'-'+yy;
        elearr.dateofbirth === "0001-01-01" ? elearr.dateofbirth = "N/A" : elearr.dateofbirth
        var testnames = newarr.toString();
        elearr.testresults = testnames;
      });

      this.patientReg.forEach(ele => {
        // ele.registrationTime = ele.registrationTime.slice(0, 10);
        let da = ele.registrationTime;
        let yy = da.substr(0, 4);
        let mm = da.substr(5, 2);
        let dd = da.substr(8, 2);
        let tt = da.substr(11,5)
        ele.registrationTime = dd + '-' + mm + '-' + yy+ ' ' + tt;
        ele.registrationTime = ele.registrationTime == "01-01-0001 00:00" ? ele.registrationTime = "N/A" : ele.registrationTime;
      });
    })
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
