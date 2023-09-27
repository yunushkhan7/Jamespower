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
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-ethernet',
  templateUrl: './ethernet.component.html',
  styleUrls: ['./ethernet.component.scss']
})
export class EthernetComponent implements OnInit {
  error: string;
  addlocation = false;
  editlocation = false;
  locationarr = [];
  clinics = [];
  ethernetList = []
  doctors = [];
  spaces = false;
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  key: string = 'userName';
  reverse: boolean = false;
  matcher = new MyErrorStateMatcher();

  public insertEthernet: any = {

    "name": "",
    "hostName": "",
    "port": '',
    "delaySeconds": '',
    "channel": '',
    "status": ''
  };

  public updateEthernet: any = {
    "id": '',
    "name": "",
    "hostName": "",
    "port": '',
    "delaySeconds": '',
    "channel": '',
    "status": ''
  };

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  Name = new FormControl('', [
    Validators.required
  ]);
  HostName = new FormControl('', [
    Validators.required
  ]);
  Port = new FormControl('', [
    Validators.required
  ]);
  DelaySeconds = new FormControl('', [
    Validators.required
  ]);
  Channel = new FormControl('', [
    Validators.required
  ]);
  Status = new FormControl('', [
    Validators.required
  ]);


  constructor(
    private spinner: NgxSpinnerService,
    private adminstrationService: adminstrationServices,
    private extraservice: ExtraService
  ) { }

  ngOnInit(): void {
    (error) => { this.error = error };
    this.getAllEthernet();
  }
  onChange(data) { this.pageno = data; }

  getAllEthernet() {
    this.spinner.show();
    this.adminstrationService.GetAllEthernet().subscribe((data: any) => {
      this.ethernetList = data.data;
      console.log(this.ethernetList);
      this.spinner.hide();
    });
  }

  AddEithernet() {
    this.insertEthernet = {
      "name": "",
      "hostName": "",
      "port": '',
      "delaySeconds": '',
      "channel": '',
      "status": ''
    };
    this.addlocation = true;
    this.editlocation = false;
    this.spinner.show();
    setTimeout(() => { this.spinner.hide() }, 500);
    this.Name.reset();
    this.HostName.reset();
    this.Port.reset();
    this.DelaySeconds.reset()
    this.Channel.reset();
    this.Status.reset();
  }

  EditEithernet(data) {
    console.log(data);
    data.channel = String(data.channel);
    data.status = (data.status == true) ? "true" : "false"
    this.updateEthernet = data;
    this.editlocation = true;
    this.addlocation = false;
    this.spinner.show();
    setTimeout(() => { this.spinner.hide() }, 500);
  }

  Cancel() {
    this.getAllEthernet();
    this.addlocation = false;
    this.editlocation = false;
    this.spinner.show();
    setTimeout(() => { this.spinner.hide() }, 500);
  }

  SaveEthernet(data) {
    data.status = (data.status == "true") ? true : false;

    if (data.name != '' && data.hostName != '' && data.port != '' && data.delaySeconds != '' && data.outPUtAction != '') {
      const datatosend = {
        name: data.name,
        port: Number(data.port),
        hostName: data.hostName,
        delaySeconds: Number(data.delaySeconds),
        channel: Number(data.channel),
        status: data.status
      };
      console.log(datatosend);

      this.adminstrationService.addEthernet(datatosend).subscribe((data: any) => {
        if (data.device) {
          if (data.issuccessfull) {
            Swal.fire({
              title: 'Updated',
              text: 'Ethernet is updated successfully!',
              icon: 'success',
              confirmButtonColor: '#ff8084',
              backdrop: false
            })
            this.addlocation = false;
            this.getAllEthernet();
          } else {
            Swal.fire({
              text: 'Device connected',
              title: 'unable to add the data',
              icon: 'warning',
              backdrop: false
            })
          }
        } else {
          Swal.fire({
            text: 'Device not Connected',
            icon: 'error',
            backdrop: false
          })
        }
      });
    }
    else {
      this.Name.markAsTouched();
      this.HostName.markAsTouched();
      this.Port.markAsTouched();
      this.DelaySeconds.markAsTouched();
      this.Channel.markAsTouched();
      this.Status.markAsTouched();
    }
  }

  UpdateEthernet(data) {
    data.status = (data.status == "true") ? true : false;
    if (data.name != '' && data.hostName != '' && data.port != '' && data.delaySeconds != '' && data.outPUtAction != '') {
      const datatosend = {
        id: data.id,
        name: data.name,
        port: Number(data.port),
        hostName: data.hostName,
        delaySeconds: Number(data.delaySeconds),
        outPUtAction: data.outPUtAction,
        channel: Number(data.channel),
        status: data.status
      };
      console.log(datatosend);

      this.adminstrationService.updateEthernet(datatosend).subscribe((data: any) => {
        if (data.device) {
          if (data.issuccessfull) {
            Swal.fire({
              title: 'Updated',
              text: 'Ethernet is updated successfully!',
              icon: 'success',
              confirmButtonColor: '#ff8084',
              backdrop: false
            })
            this.editlocation = false;
            this.getAllEthernet();
          } else {
            Swal.fire({
              text: 'Device connected',
              title: 'unable to add the data',
              icon: 'warning',
              backdrop: false
            })
          }
        } else {
          Swal.fire({
            text: 'Device not Connected',
            icon: 'error',
            backdrop: false
          })
        }
      });
    } else {
      this.Name.markAsTouched();
      this.HostName.markAsTouched();
      this.Port.markAsTouched();
      this.DelaySeconds.markAsTouched();
      this.Channel.markAsTouched();
      this.Status.markAsTouched();
    }
  }

  DeleteEthernet(deletedid) {
    Swal.fire({
      title: 'Are you sure',
      text: 'you want to delete this Ethernet?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
      backdrop: false
    }).then((res) => {
      if (res.value) {
        this.adminstrationService.deleteEthernet(deletedid).subscribe((data: any) => {
          this.getAllEthernet();
          Swal.fire({
            title:'Deleted!',
            text: 'Ethernet was successfully deleted',
            icon: 'success',
            backdrop: false
          }
            
          );
          

          if (data.message == "Not able to Delete") {
            Swal.fire({
              title: 'Not Able to Delete',
              text: 'Eitherenet is link with Door module',
              icon: 'warning',
              backdrop: false
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
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else if (/[1-9]{1}[0-9]{9}/.test(event.keyCode)) {
      event.preventDefault(); return true;
    } else { return true; }
  }

  keyPressContacts(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else if (/[1-9]{1}[0-9]{9}/.test(event.keyCode)) {
      event.preventDefault(); return true;
    } else { return true; }
  }

  CheckDeviceStatus(eth) {
    console.log(eth);
    this.adminstrationService.TestDevice(eth.hostName, eth.port).subscribe((res: any) => {
      console.log(res);
      if (res.device) {
        Swal.fire({
          title: 'Device is connected Successfully',
          // text: 'I will close in 2 seconds.',
          icon: 'success',
          backdrop: false
        })
      }else{
        Swal.fire({
          title: 'Device is not connected',
          // text: 'I will close in 2 seconds.',
          icon: 'error',
          backdrop: false
        })
      }

    })
  }
}
