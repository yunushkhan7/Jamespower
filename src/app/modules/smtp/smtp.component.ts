import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import { operationServices } from 'src/zsoonServices/operation.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { json } from 'd3';

@Component({
  selector: 'app-smtp',
  templateUrl: './smtp.component.html',
  styleUrls: ['./smtp.component.scss'],
})
export class SmtpComponent implements OnInit {
  screen = false;
  viewstand = false;
  addstand = false;
  editstand = false;
  DeleteAgeform: FormGroup;
  submitted = false;
  error: string;
  screendays: any;
  logdays: string;
  hide = true;

  public retention: any = {
    excelDetailsId: '',
    ssl: '',
    hostName: '',
    fromEmail: '',
    portNO: '',
    passwordMail: '',
    senderName: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private operationservice: operationServices,
    private adminstrationservice: adminstrationServices,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.get();
    this.DeleteAgeform = this.formBuilder.group({
      patientReg: ['', Validators.required],
      userlog: ['', Validators.required],
      systemlogs: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      Username: ['', Validators.required],
    });
    // setInterval(() => {
 

 
    //  }, 2000); 
  }

  Reset() {
    this.DeleteAgeform.reset();
    this.submitted = false;
  }
show:any
  get() {
    this.spinner.show();
    this.adminstrationservice.GetExcelPassword().subscribe((data: any) => {
      console.log('gettinggg', data);
this.show=data.detail
this.decryptData()

      this.spinner.hide();
    });
  }

  keyPressContact(event) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
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

  get f() {
    return this.DeleteAgeform.controls;
  }

  Submit(data) {
    this.submitted = true;
    if (this.DeleteAgeform.invalid) {
      return;
    }
    const datatosend = {
      excelDetailsId: 1,
      hostName: data.hostName,
      fromEmail: data.fromEmail,
      portNO: data.portNO,
      passwordMail: data.passwordMail,
      ssl: true,
      senderName: data.senderName,
    };
    console.log(datatosend);

    this.adminstrationservice.SmtpUpdate(datatosend).subscribe((data) => {
      if (data) {
        Swal.fire({
          title: 'Added',
          text: 'Smtp successfully added',
          icon: 'success',
          backdrop: false,
        });
      } else {
        Swal.fire({
          text: 'something went wrong',
          backdrop: false,
        });
      }
    });
  }

  Refresh() {
    this.get();
  }

  SendTestEmail() {
    (async () => {
      const { value: email } = await Swal.fire({
        title: 'Send test email',
        input: 'email',
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address',
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: 'Send mail',
        showCloseButton: true,
        closeButtonAriaLabel: 'Close',
        backdrop: false,
      });

      if (email) {
        // this.spinner.show();
        this.operationservice.SendTestMail(email).subscribe((data12) => {
          if (data12) {
            Swal.fire({
              title: 'Email is Sent to  <br>' +  email,
              backdrop: false,
            });
            // this.spinner.hide();
          }
        });
      }
    })();
  }
  decrypt:any
  decryptData() {
    try {
      function decryptData(key, ciphertextB64) {
        // Base64 encoded ciphertext, 32 bytes string as key
        var key = CryptoJS.enc.Utf8.parse(key); // Convert into WordArray (using Utf8)
        var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]); // Use zero vector as IV
        var decrypted = CryptoJS.AES.decrypt(ciphertextB64, key, { iv: iv }); // By default: CBC, PKCS7
        return decrypted.toString(CryptoJS.enc.Utf8); // Convert into string (using Utf8)
      }
      var ciphertextB64 = this.show;
      var key = '01234567890123456789012345678901';
      var decrypted = decryptData(key, ciphertextB64);
      var  json =JSON.parse(decrypted)
// this.decrypt=decrypted.substring(13);
// console.log(typeof(this.decrypt));
console.log(JSON.parse(decrypted));

// console.log(decrypted.);
// console.log(JSON.parse(decrypted).HostName);

this.retention.hostName = json.HostName;
this.retention.fromEmail = json.FromEmail;
this.retention.portNO = json.PortNO;
this.retention.passwordMail = json.PasswordMail;
this.retention.senderName = json.SenderName;



    } catch (e) {

    }
  }
}
