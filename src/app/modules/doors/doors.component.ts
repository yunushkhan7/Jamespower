import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.scss'],
})
export class DoorsComponent implements OnInit {
  storage: any = localStorage.getItem('roleId');
  error: string;
  adddoor = false;
  editdoor = false;
  locationarr: any = [];
  clinics = [];
  doctors = [];
  doorList = [];
  spaces = false;
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  key: string = 'userName';
  reverse: boolean = false;
  matcher = new MyErrorStateMatcher();
  qrreaders: any = [];
  ethernets: any = [];
  directions: any = [
    {
      direction: 'In',
    },
    {
      direction: 'Out',
    },
  ];

  public insertDoors: any = {
    name: '',
    locationId: '',
    direction: '',
    qrReaderId: '',
    ethernetId: '',
  };

  public updateDoors: any = {
    id: 0,
    name: '',
    locationId: '',
    direction: '',
    qrReaderId: '',
    ethernetId: '',
  };

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  DoorName = new FormControl('', [Validators.required]);
  Direction = new FormControl('', [Validators.required]);
  QrReader = new FormControl('', [Validators.required]);
  Ethernet = new FormControl('', [Validators.required]);
  Location = new FormControl('', [Validators.required]);

  constructor(
    private spinner: NgxSpinnerService,
    private adminstrationService: adminstrationServices,
    private extraservice: ExtraService
  ) {}

  ngOnInit(): void {
    (error) => {
      this.error = error;
    };
    this.getAllDoors();
  }

  onChange(data) {
    this.pageno = data;
  }

  getAllLocations() {
    this.adminstrationService.GetAllLocationData().subscribe((data: any) => {
      this.locationarr = data.data;
    });
  }

  getAllDoors() {
    this.spinner.show();
    this.adminstrationService.GetAllDoors().subscribe((data: any) => {
      this.doorList = data.data;
      console.log(this.doorList);
      this.spinner.hide();
    });
  }

  AddLocation() {
    this.insertDoors = {
      name: '',
      location: '',
      direction: '',
      qrReader: '',
      ethernetIOBox: '',
    };
    this.getAllLocations();
    this.adminstrationService.GetAllQrReaders().subscribe((res: any) => {
      this.qrreaders = res.data.filter((el) => {
        return !this.doorList.find((element) => {
          return element.qrReaderId === el.id;
        });
      });
    });
    this.adminstrationService.GetAllEthernet().subscribe((res: any) => {
      this.ethernets = res.data.filter((el) => {
        return !this.doorList.find((element) => {
          return element.ethernetId === el.id;
        });
      });
    });
    this.adddoor = true;
    this.editdoor = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    this.DoorName.reset();
    this.Direction.reset();
    this.QrReader.reset();
    this.Ethernet.reset();
    this.Location.reset();
  }

  EditDoor(doordata) {
    this.updateDoors = doordata;
    this.getAllLocations();
    this.adminstrationService.GetAllQrReaders().subscribe((res: any) => {
      this.qrreaders = res.data.filter((el) => {
        return !this.doorList.find((element) => {
          if (doordata.qrReaderId == el.id) {
            return false;
          }
          return element.qrReaderId === el.id;
        });
      });
    });

    this.adminstrationService.GetAllEthernet().subscribe((res: any) => {
      this.ethernets = res.data.filter((el) => {
        return !this.doorList.find((element) => {
          if (doordata.ethernetId == el.id) {
            return false;
          }
          return element.ethernetId === el.id;
        });
      });
    });
    this.editdoor = true;
    this.adddoor = false;
    this.spinner.show();
    this.DoorName.reset();
    this.Direction.reset();
    this.QrReader.reset();
    this.Ethernet.reset();
    this.Location.reset();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  Cancel() {
    this.getAllDoors();
    this.adddoor = false;
    this.editdoor = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  SaveDoor(data) {
    if (
      data.name != '' &&
      data.locationId != null &&
      data.direction != '' &&
      data.qrReaderId != '' &&
      data.ethernetId != ''
    ) {
      let fname = true;
      var str: string = data.name;
      if (str.startsWith(' ')) {
        fname = false;
        this.spaces = true;
      }

      const datatosend = {
        name: data.name,
        locationId: Number(data.locationId),
        direction: data.direction,
        qrReaderId: Number(data.qrReaderId),
        ethernetId: Number(data.ethernetId),
      };

      this.adminstrationService.addDoors(datatosend).subscribe((data: any) => {
        if (data.issuccessfull == true) {
          Swal.fire({
            title: 'Added',
            text: 'Doors is added successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
            backdrop: false
          });
          this.getAllDoors();
          this.adddoor = false;
        }
      });
    } else {
      this.DoorName.markAsTouched();
      this.Direction.markAsTouched();
      this.QrReader.markAsTouched();
      this.Ethernet.markAsTouched();
      this.Location.markAsTouched();
    }
  }

  UpdateDoor(data) {
    if (
      data.name != '' &&
      data.locationId != null &&
      data.direction != '' &&
      data.qrReaderId != '' &&
      data.ethernetId != ''
    ) {
      let fname = true;
      var str: string = data.name;
      if (str.startsWith(' ')) {
        fname = false;
        this.spaces = true;
      }
      const datatosend = {
        name: data.name,
        locationId: Number(data.locationId),
        direction: data.direction,
        qrReaderId: Number(data.qrReaderId),
        ethernetId: Number(data.ethernetId),
      };

      this.adminstrationService
        .updateDoors(datatosend)
        .subscribe((data: any) => {
          if (data.issuccessfull == true) {
            Swal.fire({
              title: 'Updated',
              text: 'Doors is Updated successfully!',
              icon: 'success',
              confirmButtonColor: '#ff8084',
              backdrop: false
            });
            this.getAllDoors();
            this.editdoor = false;
          }
        });
    } else {
      this.DoorName.markAsTouched();
      this.Direction.markAsTouched();
      this.QrReader.markAsTouched();
      this.Ethernet.markAsTouched();
      this.Location.markAsTouched();
    }
  }

  deleteDoors(deletedid) {
    Swal.fire({
      title: 'Are you sure',
      text: 'you want to delete this door?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
      backdrop: false
    }).then((res) => {
      if (res.value) {
        this.adminstrationService.deleteDoor(deletedid).subscribe((data) => {
          this.getAllDoors();
          Swal.fire(
            'Deleted!', 'Door was successfully deleted', 'success');

            Swal.fire({
              title:'Deleted!',
              text:'Door was successfully deleted',
              icon: 'success',
              backdrop: false
            })
        });
      }
    });
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  unlockDoor(data: any) {
    console.log(data);
    this.adminstrationService.unlockDoors(data).subscribe((result: any) => {
      console.log(result);
      if (result.deviceStatus == true) {
        Swal.fire({
          title: 'Success',
          text: 'Door opened successsfully',
          icon: 'success',
          backdrop: false
        });
      }

     else if (result.deviceStatus == false) {
        Swal.fire({
          title: 'Failed',
          text: 'The Door has not Opened',
          icon: 'warning',
          backdrop: false
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
          backdrop: false
        })
      }
    });
  }
}
