import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { loginServices } from 'src/zsoonServices/loginservices';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  firstName: any;
  returnUrl = '/login'
  lastName: any;
  public arr: any = []
  public bindingvalue;
  elem;
  public jsonStr: string = localStorage.getItem("userDetails");
  public jsonObj = JSON.parse(this.jsonStr)
  userDetails: any = this.jsonObj
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(@Inject(DOCUMENT)
    private document: any,
    private loginservice: loginServices,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      this.elem.msRequestFullscreen();
    }
  }

  ngOnInit(): void {
    this.elem = document.documentElement;
    this.spinner.show();
    this.ScanandPrint();
    this.spinner.hide();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  signOut() {
    this.loginservice.Logout().subscribe(data => {

    })
    localStorage.clear();
    this.router.navigate([this.returnUrl])
    // window.location.reload();
  }

  ScanandPrint() {
    // this.loginservice.ScanandPrint().subscribe((data: any) => {
    //     this.arr = data.patientdata;
    //     this.bindingvalue = this.arr[6].values
    //   })
  }
}
