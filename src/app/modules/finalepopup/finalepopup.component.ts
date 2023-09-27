import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finalepopup',
  templateUrl: './finalepopup.component.html',
  styleUrls: ['./finalepopup.component.scss']
})
export class FinalepopupComponent implements OnInit {
  @Input() hero: any
  test: any
  failedRes: any;
  successRes: any;
  constructor(private spinner: NgxSpinnerService) { }
  arr = [];


  Confirm
  notvalid: boolean = false;
  errormsg;

  ngOnInit(): void {
    this.test = localStorage.getItem('msg');
    this.arr = this.test.split('-');
    this.successRes = this.arr[1];
    this.failedRes = this.arr[0] - this.arr[1];
  }

  Confirmation(){
    if (this.Confirm == "Confirm" || this.Confirm == "CONFIRM" || this.Confirm == "confirm") {

      Swal.fire({
        title: 'Uploaded',
        text: 'your Excel sheet is Updated successfully!',
        icon: 'success',
        confirmButtonColor: '#ff8084',
      });

    } else {
      if (this.Confirm == "") {
        this.Confirm = "Type Confirm here..."
        this.notvalid = true;
      }
    }
  }

  Cancel() {
    this.errormsg = "";
    this.Confirm = "";
  }

  Close() {
    window.location.reload();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

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
      this.Confirm = "";
    }
  }

}
