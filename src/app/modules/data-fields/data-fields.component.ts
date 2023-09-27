import { DatePipe } from '@angular/common';
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

export interface data {
  name: string;

  value: string;
}

@Component({
  selector: 'app-data-fields',
  templateUrl: './data-fields.component.html',
  styleUrls: ['./data-fields.component.scss'],
})
export class DataFieldsComponent implements OnInit {
  // date=new Date();
  // latest_date =this.datepipe.transform(this.date, 'dd/MM/yyyy');
  error: string;
  addlocation = false;
  mandatory: any;
  visible: any;
  editlocation = false;
  dataList = [];
  locationarr = [];
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

  public insertlocation: any = {
    dataField: '',
    isMandatory: '',
    isVisible: '',
    lastEditedBy: '',
    lastEditedOn: '',
  };

  public updatelocatiion: any = {
    dataField: '',
    isMandatory: '',
    isVisible: '',
    lastEditedBy: '',
    lastEditedOn: '',
  };

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  Name = new FormControl('', [Validators.required]);
  Remarks = new FormControl('', [Validators.required]);
  Address = new FormControl('', [Validators.required]);
  booleanList: data[] = [
    {
      name: 'Yes',
      value: 'Y',
    },
    {
      name: 'No',
      value: 'N',
    },
  ];
  constructor(
    private spinner: NgxSpinnerService,
    private adminstrationService: adminstrationServices,
    private extraservice: ExtraService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    (error) => {
      this.error = error;
    };
    this.getAllDataFields();
  }
  onChange(data) {
    this.pageno = data;
  }

  getAllDataFields() {
    this.adminstrationService.GetAllDataFields().subscribe((data: any) => {
      console.log(data);
      this.dataList = data.issuccessfull;
      console.log(this.dataList);
    });
    // this.spinner.show();
    // this.adminstrationService.GetAllLocationData().subscribe((data: any) => {
    // this.locationarr = data.locations;
    // this.spinner.hide();
    // });
  }

  AddLocation() {
    this.insertlocation = {
      name: '',
      address: '',
      remarks: '',
    };
    this.addlocation = true;
    this.editlocation = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    this.Name.reset();
    this.Remarks.reset();
    this.Address.reset();
  }
  Mandatory: any;
  EditLocation(data) {
    //  this.updatelocatiion.isMandatory = data.isMandatory == true
    //   this.updatelocatiion.isVisible = data.isVisible ==
    this.updatelocatiion = data;
    this.Mandatory = data.isMandatory;
    console.log(data);

    this.editlocation = true;
    this.addlocation = false;
    this.Name.reset();
    this.Remarks.reset();
    this.Address.reset();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  Cancel() {
    this.getAllDataFields();
    this.addlocation = false;
    this.editlocation = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
  mandatoryChange(data) {
    console.log(data);
    this.mandatory = Boolean(data);
  }
  visibleChange(data) {
    console.log(data);
    this.visible = Boolean(data);
  }
  SaveLocation(data) {
    console.log(data);
    let Mandatory = data.isMandatory == 'Y' ? true : false;
    let Visible = data.isVisible == 'Y' ? true : false;

    if (
      data.dataField != '' &&
      data.isMandatory != '' &&
      data.isVisible != '' &&
      data.lastEditedBy != '' &&
      data.lastEditedOn != ''
    ) {
      // let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      let fname = true;
      var str: string = data.name;
      // if (str.startsWith(' ')) { fname = false; this.spaces = true; }
      // const datatosend = {
      //   name: data.name,
      //   address: data.address,
      //   remarks: data.remarks,
      //   createdBy: localStorage.getItem('userId'),
      // };

      const datatoSend = {
        dataField: data.dataField,
        isMandatory: Mandatory,
        isVisible: Visible,
        lastEditedBy: data.lastEditedBy,
        lastEditedOn: data.lastEditedOn,
      };
      console.log(datatoSend);

      this.adminstrationService.addDataFileds(datatoSend).subscribe((data) => {
        if (data) {
          Swal.fire({
            title: 'Added',
            text: 'Data Filed is added successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
            backdrop: false,
          });
          this.addlocation = false;
          this.getAllDataFields();
        }
      });
    } else {
      this.Name.markAsTouched();
      this.Address.markAsTouched();
      this.Remarks.markAsTouched();
    }
  }

  UpdateLocation(data) {
    console.log(data);
    let Mandatory = data.isMandatory == 'Y' ? true : false;
    let Visible = data.isVisible == 'Y' ? true : false;
    // if (data.name != '' && data.address != '' && data.remarks != '') {
    // let fname = true;
    // var str: string = data.name;
    // if (str.startsWith(' ')) { fname = false; this.spaces = true; }
    const datatosend = {
      id: data.id,
      dataField: data.dataField,
      isMandatory: data.isMandatory,
      isVisible: data.isVisible,
      lastEditedBy: data.lastEditedBy,
      lastEditedOn: data.lastEditedOn,
    };
    console.log(datatosend);

    this.adminstrationService
      .updateDataFileds(datatosend)
      .subscribe((data: any) => {
        if (data.issuccessfull == true) {
          Swal.fire({
            title: 'Updated',
            text: 'Data Filed is Updated successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
            backdrop: false,
          });
          this.getAllDataFields();
          this.editlocation = false;
        }
      });
    // }

    // else {
    //   this.Name.markAllAsTouched();
    //   this.Address.markAllAsTouched();
    //   this.Remarks.markAllAsTouched();
    // }
  }

  deleteDataFeild(deletedid) {
    Swal.fire({
      title: 'Are you sure',
      text: 'you want to delete this Data Field?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
      backdrop: false,
    }).then((res) => {
      if (res.value) {
        this.adminstrationService
          .deleteDataField(deletedid)
          .subscribe((data) => {
            this.getAllDataFields();
            Swal.fire({
              title: 'Deleted!',
              text: 'Data Field was successfully deleted',
              icon: 'success',
              backdrop: false,
            });
          });
      }
    });
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
