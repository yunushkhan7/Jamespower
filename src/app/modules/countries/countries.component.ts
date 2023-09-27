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
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  addcountries = false;
  editcountries = false;
  searchText;
  countries = []
  races = []
  pageno: any = 5;
  q: any
  matcher = new MyErrorStateMatcher();

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  constructor(
    private extraService: ExtraService,
    private spinner: NgxSpinnerService,) { }

  public insertcountry = {
    "defaultRaceId": '',
    "iso3_code": "",
    "iso2_code": "",
    "countryName": "",
    "phonePrefix": "",
    "mobileAppDesc": "",
    "eorderingDesc": "",
  }
  public updatecountry = {
    "defaultRaceId": '',
    "iso3_code": "",
    "iso2_code": "",
    "countryName": "",
    "phonePrefix": "",
    "mobileAppDesc": "",
    "eorderingDesc": "",
  }

  ISO3Code = new FormControl('', [
    Validators.required,
    // this.noWhitespaceValidator,
    // Validators.pattern('^[a-zA-Z @ -_.]*$'),
  ]);


  ISO2Code = new FormControl('', [
    Validators.required,
    // this.noWhitespaceValidator,
    // Validators.pattern('^[a-zA-Z @ -_.]*$'),
  ]);

  CountryName = new FormControl('', [
    Validators.required,
    //  this.noWhitespaceValidator,
     Validators.pattern('^[a-zA-Z @ -_.]*$'),
  ])

  PhonePrefix = new FormControl('', [
    Validators.required,
  ])

  MobileAppDesc = new FormControl('', [
    Validators.required,
  ])

  eOrderingDesc = new FormControl('', [
    Validators.required,
  ])

  DefalutRace = new FormControl('', [
    Validators.required,
  ])

  ngOnInit(): void {
    this.GetAllCountries();
    this.GetAllRaces();
  }

  keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    var k = event ? event.which : event.keyCode;
    if (k == 32) { return false }
    if (/[a-zA-Z]/.test(inp)) { return true; }
    else { event.preventDefault(); return false; }
  }

  onChange(data) { this.pageno = data }

  AddCountry() {
    this.ISO3Code.reset()
    this.ISO2Code.reset()
    this.CountryName.reset()
    this.PhonePrefix.reset()
    this.MobileAppDesc.reset()
    this.eOrderingDesc.reset()
    this.DefalutRace.reset()
    this.addcountries = true;
    this.editcountries = false;
    this.insertcountry = {
      "defaultRaceId": '',
      "iso3_code": "",
      "iso2_code": "",
      "countryName": "",
      "phonePrefix": "",
      "mobileAppDesc": "",
      "eorderingDesc": "",
    }
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  EditCountry(country) {
    this.ISO3Code.reset()
    this.ISO2Code.reset()
    this.CountryName.reset()
    this.PhonePrefix.reset()
    this.MobileAppDesc.reset()
    this.eOrderingDesc.reset()
    this.DefalutRace.reset()
    console.log("country", country)
    this.updatecountry = country
    this.addcountries = false;
    this.editcountries = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  GetAllCountries() {
    this.spinner.show();
    this.extraService.GetAllCountries().subscribe((data: any) => {
      this.countries = data.countries;
      this.spinner.hide();
    })
  }

  GetAllRaces() {
    this.extraService.GetAllRaces().subscribe((data: any) => {
      console.log(data);
      this.races = data.races
    })
  }

  SaveCountry(data) {
    if (data.iso3_code && data.iso2_code && data.countryName && data.phonePrefix && data.mobileAppDesc && data.eorderingDesc && data.defaultRaceId) {
      const datatosend = {
        iso3_code: data.iso3_code,
        iso2_code: data.iso2_code,
        countryName: data.countryName,
        phonePrefix: data.phonePrefix,
        mobileAppDesc: data.mobileAppDesc,
        eorderingDesc: data.eorderingDesc,
        defaultRaceId: data.defaultRaceId,
      }
      console.log(datatosend);
      this.extraService.InsertCountry(datatosend).subscribe((data: any) => {
        console.log(data);
        if (data.issuccessfull) {
          Swal.fire({
            title: 'Created',
            text: 'Country is  Created Successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084'
          });
          this.GetAllCountries();
          this.addcountries = false;
        } else {
          Swal.fire({
            title: 'Check your detais',
            icon: 'warning',
            confirmButtonColor: '#ff8084'
          });
        }
      })
    } else {
      this.ISO3Code.markAsTouched();
      this.ISO2Code.markAsTouched();
      this.CountryName.markAsTouched();
      this.PhonePrefix.markAsTouched();
      this.MobileAppDesc.markAsTouched();
      this.eOrderingDesc.markAsTouched();
      this.DefalutRace.markAsTouched();
    }
  }

  UpdateCountry(data) {
    if (data.iso3_code && data.iso2_code && data.countryName && data.phonePrefix && data.mobileAppDesc && data.eorderingDesc && data.defaultRaceId) {
      const datatosend = {
        id: data.id,
        iso3_code: data.iso3_code,
        iso2_code: data.iso2_code,
        countryName: data.countryName,
        phonePrefix: data.phonePrefix,
        mobileAppDesc: data.mobileAppDesc,
        eorderingDesc: data.eorderingDesc,
        defaultRaceId: Number(data.defaultRaceId),
      }
      console.log(datatosend);
      this.extraService.UpdateCountry(datatosend).subscribe((data: any) => {
        console.log(data);
        if (data.issuccessfull) {
          Swal.fire({
            title: 'Updated',
            text: 'Country is  updated Successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084'
          });
          this.GetAllCountries();
          this.editcountries = false;
        } else {
          Swal.fire({
            title: 'Check your detais',
            icon: 'warning',
            confirmButtonColor: '#ff8084'
          });
        }
      })
    } else {
      this.ISO3Code.markAsTouched();
      this.ISO2Code.markAsTouched();
      this.CountryName.markAsTouched();
      this.PhonePrefix.markAsTouched();
      this.MobileAppDesc.markAsTouched();
      this.eOrderingDesc.markAsTouched();
      this.DefalutRace.markAsTouched();
    }
  }

  DeleteCountry(countryId) {
    Swal.fire({
      title: 'Are you sure',
      text: 'You want to delete this country',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
    }).then((res) => {
      if (res.value) {
        this.extraService.DeleteCountry(countryId)
          .subscribe(success => {
            this.GetAllCountries();
            if (success) {
              Swal.fire(
                'Deleted',
                'Country was successfully deleted',
                'success'
              )
            }
          })
      }
    })
  }

  Cancel() {
    this.editcountries = false
    this.addcountries = false
    this.GetAllCountries();
  }

  key: string = 'userName'
  reverse: boolean = false
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse
  }
}
