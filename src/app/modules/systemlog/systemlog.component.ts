import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { operationServices } from 'src/zsoonServices/operation.service';

@Component({
  selector: 'app-systemlog',
  templateUrl: './systemlog.component.html',
  styleUrls: ['./systemlog.component.scss']
})
export class   SystemlogComponent implements OnInit {
  searchText;

  addoperator = false
  editoperator = false
  q:any
  page = 1
  pageno: any=5;
  activitylogs: any = []
  constructor(private spinner: NgxSpinnerService,private operationServices: operationServices) { }

  ngOnInit(): void {
    this.spinner.show();

this.getActivityLogs()

    
  }


  getActivityLogs(){
    this.spinner.show()
    this.operationServices.getActivityLogs().subscribe((logs: any)=>{
      console.log('getactivitylogs',logs)

      this.activitylogs = logs.log
      this.spinner.hide()
    })
  }
  AddOperator() {

    this.addoperator = true
    this.editoperator = false
    this.spinner.show()
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);
  }

  EditOperator() {
    this.editoperator = true
    this.addoperator = false
    this.spinner.show()
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);
  }


  Cancel() {
    this.addoperator = false
    this.editoperator = false
    this.spinner.show()
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);
  }


  
  onChange(data){
    this.pageno=data
      }

      DownloadExcel(){
        console.log('downloadd')
        this.operationServices.downloadActivitylogExcel().subscribe((res:any)=>{
          console.log(res)

          if(res.success){
            window.location.href = res.message
          }
        })
      }
}
