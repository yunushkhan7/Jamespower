import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExtraService } from 'src/zsoonServices/newrequirement.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-apitoken',
  templateUrl: './apitoken.component.html',
  styleUrls: ['./apitoken.component.scss']
})
export class ApitokenComponent implements OnInit {
  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  addToken = false;
  search;
  testingname = "Rashid"
  tokens = []
  apiTokenValue;
  pageno: any = 5;
  q: any
  key: string = 'userName'
  reverse: boolean = false
  msg = "copy to clipboard";
  matcher = new MyErrorStateMatcher();
  public insertapi = {
    "appName": "",
    "remarks": ""
  }

  constructor(
    private extraservice: ExtraService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    // private snackBar: MatSnackBar
  ) { }

  AppName = new FormControl('', [
    Validators.required,
  ])

  Remarks = new FormControl('', [
    Validators.required,
  ])

  ngOnInit(): void {
    this.GetAllApiTokens();
  }

  onChange(data) { this.pageno = data }
  GetAllApiTokens() {
    this.spinner.show();
    this.extraservice.GetAllAPITokens().subscribe((data: any) => {
      this.tokens = data.tokenGeneration
      this.spinner.hide();
    })
  }

  AddToken() {
    this.AppName.reset();
    this.Remarks.reset();
    this.insertapi = {
      "appName": "",
      "remarks": ""
    }
    this.addToken = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  openDialogWithTemplateRef(data, templateRef: TemplateRef<any>) {
    if (data.appName && data.remarks) {
      const datatosend = {
        lastUpdatedBy: localStorage.getItem('userId'),
        appName: data.appName,
        remarks: data.remarks
      }
      this.extraservice.InsertApi(datatosend).subscribe((data: any) => {
        console.log(data);
        if (data.issuccessfull) {
          this.apiTokenValue = data.token;
          this.addToken = false;
          this.dialog.open(templateRef, { disableClose: true });
          this.GetAllApiTokens();
        } else {
          Swal.fire({
            title: 'Something went wrong'
          })
        }
      })
    } else {
      this.AppName.markAsTouched();
      this.Remarks.markAsTouched();
    }
  }

  copyInputMessage(inputElement, tooltip) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
      this.msg = "copied"
      tooltip.show();
  }

  over(){
    this.msg = "copy to clipboard"
  }

  DeleteToken(tokenId) {
    Swal.fire({
      title: 'Are you sure',
      text: 'You want to delete this Api',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
    }).then((res) => {
      if (res.value) {
        this.extraservice.DeleteApiToken(tokenId)
          .subscribe(success => {
            this.GetAllApiTokens();
            if (success) {
              Swal.fire(
                'Deleted',
                'Api Token was successfully deleted',
                'success'
              )
            }
          })
      }
    })
  }

  Cancel() {
    this.addToken = false;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }


}
