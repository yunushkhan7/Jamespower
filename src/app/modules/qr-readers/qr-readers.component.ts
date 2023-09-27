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
  selector: 'app-qr-readers',
  templateUrl: './qr-readers.component.html',
  styleUrls: ['./qr-readers.component.scss'],
})
export class QrReadersComponent implements OnInit {
  error: string;
  addlocation = false;
  editlocation = false;
  locationarr = [];
  qrList = [];
  clinics = [];
  doctors = [];
  spaces = false;
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  key: string = 'userName';
  reverse: boolean = false;
  matcher = new MyErrorStateMatcher();

  public insertQR: any = {
    name: '',
    hostName: '',
    port: '',
  };

  public update: any = {
    id: '',
    name: '',
    hostName: '',
    port: '',
  };

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  Name = new FormControl('', [Validators.required]);
  HostName = new FormControl('', [Validators.required]);
  Port = new FormControl('', [Validators.required]);

  constructor(
    private spinner: NgxSpinnerService,
    private adminstrationService: adminstrationServices,
    private extraservice: ExtraService
  ) {}

  ngOnInit(): void {
    (error) => {
      this.error = error;
    };
    this.getAllQr();
  }
  onChange(data) {
    this.pageno = data;
  }

  getAllQr() {
    this.spinner.show();
    this.adminstrationService.GetAllQrReaders().subscribe((data: any) => {
      this.qrList = data.data;
      console.log(this.qrList);

      this.spinner.hide();
    });
  }

  AddLocation() {
    this.insertQR = {
      name: '',
      hostName: '',
      port: '',
    };
    this.addlocation = true;
    this.editlocation = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    this.Name.reset();
    this.HostName.reset();
    this.Port.reset();
  }

  EditQr(data) {
    console.log(data);
    this.update = data;
    this.editlocation = true;
    this.addlocation = false;
    this.spinner.show();
    this.Name.reset();
    this.HostName.reset();
    this.Port.reset();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  Cancel() {
    this.getAllQr();
    this.addlocation = false;
    this.editlocation = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  saveQr(data) {
    if (data.name != '' && data.hostName != '' && data.port != '') {
      let fname = true;
      var str: string = data.name;
      if (str.startsWith(' ')) {
        fname = false;
        this.spaces = true;
      }
      const datatosend = {
        name: data.name,
        port: Number(data.port),
        hostName: data.hostName,
      };
      console.log(datatosend);

      this.adminstrationService.addQr(datatosend).subscribe((data: any) => {
        console.log(data);

        if (data.device) {
          if (data.issuccessfull) {
            Swal.fire({
              title: 'Added',
              text: 'Qr Reader is added successfully!',
              icon: 'success',
              confirmButtonColor: '#ff8084',
              backdrop: false,
            });
            this.addlocation = false;
            this.getAllQr();
          } else {
            Swal.fire({
              text: 'Device connected',
              title: 'unable to add the data',
              icon: 'warning',
              backdrop: false,
            });
          }
        } else {
          Swal.fire({
            text: 'Device not Connected',
            icon: 'error',
            backdrop: false,
          });
        }
      });
    } else {
      this.Name.markAsTouched();
      this.HostName.markAsTouched();
      this.Port.markAsTouched();
    }
  }

  updateQr(data) {
    if (data.name != '' && data.hostName != '' && data.port != '') {
      const datatosend = {
        id: data.id,
        name: data.name,
        port: Number(data.port),
        hostName: data.hostName,
      };
      console.log(datatosend);

      this.adminstrationService.updateQr(datatosend).subscribe((data: any) => {
        console.log(data);
        if (data.device) {
          if (data.issuccessfull) {
            Swal.fire({
              title: 'Updated',
              text: 'Qr Reader is updated successfully!',
              icon: 'success',
              confirmButtonColor: '#ff8084',
              backdrop: false,
            });
            this.editlocation = false;
            this.getAllQr();
          } else {
            Swal.fire({
              text: 'Device connected',
              title: 'unable to add the data',
              icon: 'warning',
              backdrop: false,
            });
          }
        } else {
          Swal.fire({
            text: 'Device not Connected',
            icon: 'error',
            backdrop: false,
          });
        }
      });
    } else {
      this.Name.markAllAsTouched();
      this.Port.markAllAsTouched();
      this.HostName.markAllAsTouched();
    }
  }

  DeleteQr(deletedid) {
    Swal.fire({
      title: 'Are you sure',
      text: 'you want to delete this Qr Reader?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
      backdrop: false,
    }).then((res) => {
      if (res.value) {
        this.adminstrationService.DeleteQr(deletedid).subscribe((data: any) => {
          this.getAllQr();
          Swal.fire({
            title: 'Deleted!',
            text: 'Qr Reader was successfully deleted',
            icon: 'success',
            backdrop: false,
          });

          if (data.message == 'Not able to Delete') {
            Swal.fire({
              title: 'Not Able to Delete',
              text: 'QR Reader is link with Door module',
              icon: 'warning',
              backdrop: false,
            });
          }
        });
      }
    });
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  keyPressContact(event) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else if (/[1-9]{1}[0-9]{9}/.test(event.keyCode)) {
      event.preventDefault();
      return true;
    } else {
      return true;
    }
  }

  CheckDeviceStatus(qr) {
    console.log(qr);
    this.adminstrationService
      .TestDevice(qr.hostName, qr.port)
      .subscribe((res: any) => {
        console.log(res);
        if (res.device) {
          Swal.fire({
            title: 'Device is connected Successfully',
            // text: 'I will close in 2 seconds.',
            icon: 'success',
            backdrop: false,
          });
        } else {
          Swal.fire({
            title: 'Device is not connected',
            // text: 'I will close in 2 seconds.',
            icon: 'error',
            backdrop: false,
          });
        }
      });
  }
}
