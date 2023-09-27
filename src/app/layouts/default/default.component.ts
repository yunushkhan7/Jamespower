import { Component, OnInit } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
sideBarOpen = true;
timeStart = false;
  seconds = 5;

  clientX = 0;
  clientY = 0;
  constructor(private spinner: NgxSpinnerService,private userIdle: UserIdleService) { }

  ngOnInit(): void {
   // this.userIdle.startWatching();
    console.log(this.userIdle)


     // spinner
     this.spinner.show();



     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 1500);

    //  this.userIdle.onTimerStart().subscribe(count => { this.seconds = this.seconds - 2; this.timeStart = true;
      
      
    //   console.log(count)
    //  // localStorage.clear();

    // });

    // this.userIdle.onTimeout().subscribe(()  =>
    
    // Swal.fire({
    //   title: 'Session time out!!',
    //   text:'Please login again',
    //   showDenyButton: false,
    //   showCancelButton: false,
    //   allowOutsideClick:false,
    //   confirmButtonText: `login`,
    //   // denyButtonText: `Don't save`,gi
      
    // })
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     window.location.href="#/login"
    //     localStorage.clear()

    //   } 

    // })
    // );
 
  }
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  stop() {
    alert('timer is stopped');
    this.userIdle.stopTimer();
    this.seconds = 5;
    this.timeStart = false;
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();

  }

  restart() {
    this.userIdle.resetTimer();
  }


  coordinates(event: MouseEvent): void {
    this.clientX = event.clientX;
    this.clientY = event.clientY;

    console.log(this.clientX, this.clientY);

  }
}


