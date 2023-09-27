import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-e-ordering',
  templateUrl: './e-ordering.component.html',
  styleUrls: ['./e-ordering.component.scss']
})
export class EOrderingComponent implements OnInit {

  EOrderingForm: FormGroup;
  eorderinglogs = [];
  key: string = 'userName';
  reverse: boolean = false;
  q: any;
  searchText;
  page = 1;
  pageno: any = 5;
  submitted = false;
  public eorderform: any = {
    "tokenUrl": "",
    "gateWayUrl": "",
    "clientId": "",
    "clientSecret": "",
    "publicKey": "",
    "privateKey": "",
    "id": 0
  }
  constructor(
    private spinner: NgxSpinnerService,
    private extraservice: ExtraService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.GetEorderingDetails();
    this.GetAllEorderingLogs();
    this.EOrderingForm = this.formBuilder.group({
      TokenUrl: ['', Validators.required],
      NovisClientId: ['', Validators.required],
      NovisPrivateKey: ['', Validators.required],
      ApiGatewayUrl: ['', Validators.required],
      ClientSecret: ['', Validators.required],
      PublicKey: ['', Validators.required]
    });
  }

  get f() { return this.EOrderingForm.controls; }

  GetEorderingDetails() {
    this.spinner.show();
    this.extraservice.GetEorderingDetails(1).subscribe((data: any) => {
      this.eorderform.tokenUrl = data.eorderingDetails.tokenUrl;
      this.eorderform.gateWayUrl = data.eorderingDetails.gateWayUrl;
      this.eorderform.clientId = data.eorderingDetails.clientId;
      this.eorderform.clientSecret = data.eorderingDetails.clientSecret;
      this.eorderform.publicKey = data.eorderingDetails.publicKey;
      this.eorderform.privateKey = data.eorderingDetails.privateKey
      this.spinner.hide();
    })
  }

  GetAllEorderingLogs() {
    this.extraservice.GetAllEorderingLogs().subscribe((data: any) => {
      this.eorderinglogs = data;
    })
  }

  UpdateEorderDetais(data) {
    this.submitted = true;
    console.log(this.EOrderingForm.valid);
    if (this.EOrderingForm.valid) {
      const datatosend = {
        tokenUrl: data.tokenUrl,
        gateWayUrl: data.gateWayUrl,
        clientId: data.clientId,
        clientSecret: data.clientSecret,
        publicKey: data.publicKey,
        privateKey: data.privateKey,
        id: 1
      }

      this.extraservice.UpdateEorderingDetails(datatosend).subscribe((data: any) => {
        if (data.issuccessfull) {
          Swal.fire({
            title: 'Updated',
            text: 'e-ordering system is updated successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
          });
        }
        this.GetEorderingDetails();
      })
    } else {
      return;
    }
  }

  Reset() {
    this.eorderform = {
      "tokenUrl": "",
      "gateWayUrl": "",
      "clientId": "",
      "clientSecret": "",
      "publicKey": "",
      "privateKey": "",
      "id": 0
    }
  }

  onChange(e) {

  }

  sort(e) {

  }

}
