import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.scss']
})
export class TitlesComponent implements OnInit {

  addtitle = false;
  edittitle = false;
  searchText;
  titles = [];
  pageno: any = 5;
  q: any
  key: string = 'userName'
  reverse: boolean = false
  matcher = new MyErrorStateMatcher();
  public inserttitle = {
    "titleCode": "",
    "titleDescripiton": ""
  }
  public updatetitle = {
    "titleCode": "",
    "titleDescripiton": ""
  }

  constructor(
    private extraservice: ExtraService,
    private spinner: NgxSpinnerService) { }

    TitleCode = new FormControl('', [
      Validators.required,
    ])

    TitleDesc = new FormControl('', [
      Validators.required,
    ])

  ngOnInit(): void {
    this.GetAllTitle();
  }
  onChange(data) { this.pageno = data }

  GetAllTitle() {
    this.spinner.show();
    this.extraservice.GetAllTittles().subscribe((data: any) => {
      console.log('Title', data)
      this.titles = data.titles;
      this.spinner.hide();
    })
  }
  AddTitle() {
    this.TitleCode.reset();
    this.TitleDesc.reset();
    this.inserttitle = {
      "titleCode": "",
      "titleDescripiton": ""
    }
    this.addtitle = true;
    this.edittitle = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  EditTitle(title) {
    this.TitleCode.reset();
    this.TitleDesc.reset();
    this.updatetitle = title;
    this.addtitle = false;
    this.edittitle = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  SaveTitle(data) {

    if(data.titleCode && data.titleDescripiton){
      const datatosend = {
        titleCode: data.titleCode,
        titleDescripiton: data.titleDescripiton,
        lastUpdatedBy: localStorage.getItem('userId')
      }
      this.extraservice.InsertTitles(datatosend).subscribe((data: any) => {
        console.log(data);
        if (data.issuccessfull) {
          Swal.fire({
            title: 'Created',
            text: 'Title is created successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
          });
          this.addtitle = false;
          this.GetAllTitle();
        } else {
          Swal.fire({
            title: 'Check your details',
            icon: 'warning',
            confirmButtonColor: '#ff8084',
          });
        }
      })
    }else{
      this.TitleCode.markAsTouched();
      this.TitleDesc.markAsTouched();
    }
  }

  UpdateTitle(data) {
    if(data.titleCode && data.titleDescripiton){
      const datatosend = {
        id: data.id,
        titleCode: data.titleCode,
        titleDescripiton: data.titleDescripiton,
        lastUpdatedBy: localStorage.getItem('userId')
      }
      this.extraservice.UpdateTitle(datatosend).subscribe((data: any) => {
        console.log(data);
        if (data.issuccessfull) {
          Swal.fire({
            title: 'Updated',
            text: 'Title is updated successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
          });
          this.edittitle = false;
          this.GetAllTitle();
        } else {
          Swal.fire({
            title: 'Check your details',
            icon: 'warning',
            confirmButtonColor: '#ff8084',
          });
        }
      })
    }else{
      this.TitleCode.markAsTouched();
      this.TitleDesc.markAsTouched();
    }
  }

  DeleteTitle(titleId) {
    Swal.fire({
      title: 'Are you sure',
      text: 'You want to delete this title',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
    }).then((res) => {
      if (res.value) {
        this.extraservice.DeleteTitle(titleId)
          .subscribe(success => {
            this.GetAllTitle();
            if (success) {
              Swal.fire(
                'Deleted',
                'title was successfully deleted',
                'success'
              )
            }
          })
      }
    })
  }

  Cancel() {
    this.GetAllTitle();
    this.addtitle = false;
    this.edittitle = false;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }
}
