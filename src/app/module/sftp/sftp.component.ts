import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sftp',
  templateUrl: './sftp.component.html',
  styleUrls: ['./sftp.component.scss']
})
export class SftpComponent implements OnInit {

  sftpserversubmitted = false;
  healthprovidersubmitted = false;
  SftpForm:FormGroup;
  HealthProviderForm: FormGroup
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.SftpForm = this.formBuilder.group({
      Host: ['', Validators.required],
      UserName: ['', Validators.required],
      PollInterval: ['', Validators.required],
      Port: ['', Validators.required],
      PrivateKey: ['', Validators.required],
      PrivateKey_Passphrase: ['', Validators.required]
    });

    this.HealthProviderForm = this.formBuilder.group({
      HealthProviderName: ['', Validators.required],
      SFTPToProccess: ['', Validators.required],
      PGPPublicKey: ['', Validators.required],
      PGPKeyIssuer: ['', Validators.required],
      SFTPToAchive: ['', Validators.required],
      PGPPasspharse: ['', Validators.required]
    });
  }

  get f() { return this.SftpForm.controls; }
  get g() { return this.HealthProviderForm.controls; }


  onChange(event){

  }

  sort(k){

  }

  UpdateEorderDetais(){
    this.sftpserversubmitted = true;
    console.log("this.SftpForm.valid", this.SftpForm.value)
    if(this.SftpForm.valid){

    }else{
      return;
    }
  }

  UpdateHealthProvider(){
    this.healthprovidersubmitted = true;
    console.log("this.HealthProviderForm.valid", this.HealthProviderForm.value)
    if(this.HealthProviderForm.valid){

    }else{
      return;
    }
  }

  Reset(){

  }

}
