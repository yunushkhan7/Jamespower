import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminstrationServices } from 'src/zsoonServices/adminstration.service';
import { operationServices } from 'src/zsoonServices/operation.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-qr-codes',
  templateUrl: './qr-codes.component.html',
  styleUrls: ['./qr-codes.component.scss']
})
export class QrCodesComponent implements OnInit {
  screen = false;
  viewstand = false;
  addstand = false;
  editstand = false;
  DeleteAgeform: FormGroup;
  submitted = false;
  error: string;
  screendays: any;
  logdays: string;

  public qrcodesetting: any = {
    "qrCodeSalt": '',
    "allowEarlier": '',
    "dailyBookings": ''
  }

  constructor(
    private spinner: NgxSpinnerService,
    private operationservice: operationServices,
    private adminstrationservice: adminstrationServices,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.get()
    this.DeleteAgeform = this.formBuilder.group({
      // patientReg: ['', Validators.required],
      userlog: ['', Validators.required],
      systemlogs: ['', Validators.required],
      Password: ['', Validators.required],
    });
   
  }

  Reset() {
    this.DeleteAgeform.reset();
    this.submitted = false;
  }
  show:any

  get() {
    this.spinner.show()
    this.adminstrationservice.GetQRcodeSettingsById(1).subscribe((data: any) => {
      console.log('gettinggg', data)
      this.show=data.issuccessfull

      this.decryptData()

      this.spinner.hide()
    })
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
      console.log('kesava');
      return
    }
    const datatosend = {
      "id": 1,
      "qrCodeSalt": data.qrCodeSalt,
      "allowEarlier": Number(data.allowEarlier),
      "dailyBookings": Number(data.dailyBookings)
    }

    this.adminstrationservice.UpdateQRcodeSettings(datatosend).subscribe((data) => {
      if (data) {
        Swal.fire({
          title: 'Updated',
          text: 'QR Code Settings successfully updated',
          icon: 'success',
          backdrop: false
        });

        this.get();
      }
    });
  }

  // SendTestEmail() {
  //   (async () => {
  //     const { value: email } = await Swal.fire({
  //       title: 'Send test email',
  //       input: 'email',
  //       inputLabel: 'Your email address',
  //       inputPlaceholder: 'Enter your email address',
  //       allowOutsideClick: false,
  //       showConfirmButton: true,
  //       confirmButtonText: 'Send mail',
  //       showCloseButton: true,
  //       closeButtonAriaLabel: 'Close',
  //     })

  //     if (email) {
  //       this.spinner.show();
  //       this.operationservice.SendTestMail(email).subscribe(data12 => {
  //         if (data12) {
  //           Swal.fire(`Email is Sent to : <br> ${email}`)
  //           this.spinner.hide();
  //         }
  //       })
  //     }
  //   })()
  // }
  decrypt
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
// this.decrypt=decrypted.substring(13);
// console.log(this.decrypt.AllowEarlier);

// console.log(typeof(this.decrypt));
// console.log(decrypted.detail.HostName);
console.log(JSON.parse(decrypted));
var  json =JSON.parse(decrypted)

this.qrcodesetting.dailyBookings=json.DailyBookings
this.qrcodesetting.allowEarlier=json.AllowEarlier
this.qrcodesetting.qrCodeSalt=json.QRCodeSalt

    } catch (e) {

    }
  }
}
