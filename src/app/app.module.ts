import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { TreeviewModule } from 'ngx-treeview';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { CollapseModule, MDBBootstrapModule, WavesModule } from 'angular-bootstrap-md';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loginServices } from '../zsoonServices/loginservices';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import { OtpComponent } from './otp/otp.component';
import { TestComponent } from './modules/test/test.component';
import { RashidComponent } from './modules/rashid/rashid.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { PatientlogComponent } from './modules/patientlog/patientlog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SmtpComponent } from './modules/smtp/smtp.component';
import { ExcelPasswordComponent } from './modules/excel-password/excel-password.component';
import { EmailsComponent } from './modules/emails/emails.component';
import { MatChipsModule } from '@angular/material/chips';
import { ModulesComponent } from './countries/modules/modules.component';
import { CountriesComponent } from './modules/countries/countries.component';
import { RacesComponent } from './modules/races/races.component';
import { InsuranceComponent } from './modules/insurance/insurance.component';
import { TitlesComponent } from './modules/titles/titles.component';
import { ApitokenComponent } from './modules/apitoken/apitoken.component';
import { TokendialogueComponent } from './modules/tokendialogue/tokendialogue.component';
import { PatientprofileComponent } from './modules/patientprofile/patientprofile.component';
import { PatientdataComponent } from './modules/patientdata/patientdata.component';
import { DoctorcodeComponent } from './modules/doctorcode/doctorcode.component';
import { CliniccodeComponent } from './modules/cliniccode/cliniccode.component';
import { EOrderingComponent } from './modules/e-ordering/e-ordering.component';
import { HealthcertComponent } from './modules/healthcert/healthcert.component';
import { ReglogsComponent } from './modules/reglogs/reglogs.component';
import { EOrderComponent } from './modules/e-order/e-order.component';
import { AccridifycertificateComponent } from './modules/accridifycertificate/accridifycertificate.component';
import { SftpComponent } from './module/sftp/sftp.component';
import { RmgnotifyComponent } from './modules/rmgnotify/rmgnotify.component';
import { VacinationdbComponent } from './modules/vacinationdb/vacinationdb.component';
import { ArtdplusxComponent } from './modules/artdplusx/artdplusx.component';
import { FinalepopupComponent } from './modules/finalepopup/finalepopup.component';
import { ValidatecertificateComponent } from './modules/validatecertificate/validatecertificate.component';
import { ZoomImgComponent } from './modules/zoom-img/zoom-img.component';
import { ZoomImageComponent } from './validatecertificate/zoom-image/zoom-image.component';
import { ImageZoomComponent } from './modules/validatecertificate/image-zoom/image-zoom.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ComparedataComponent } from './modules/comparedata/comparedata.component';
import { ControllerComponent } from './modules/controller/controller.component';
import { DateFilterPipe } from './modules/authorized-device/date-filter.pipe';
import { QrReadersComponent } from './modules/qr-readers/qr-readers.component';
import { EthernetComponent } from './modules/ethernet/ethernet.component';
import { DoorsComponent } from './modules/doors/doors.component';
import { VisitScheduleComponent } from './modules/visit-schedule/visit-schedule.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ReservedDayComponent } from './modules/reserved-day/reserved-day.component';
import { VisitorRequestComponent } from './modules/visitor-request/visitor-request.component';
import { VisitorLogComponent } from './modules/visitor-log/visitor-log.component';
import { UserlogComponent } from './modules/userlog/userlog.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
// import { MomentDateModule } from '@angular/material-moment-adapter';
// import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { NgxMatDateFnsDateModule } from 'ngx-mat-datefns-date-adapter'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AcessDeniedComponent } from './acess-denied/acess-denied.component';
import { TrafficComponent } from './traffic/traffic.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    ChangepasswordComponent,
    ForgotPasswordComponent,
    OtpComponent,
    TestComponent,
    RashidComponent,
    PatientlogComponent,
    SmtpComponent,
    ExcelPasswordComponent,
    EmailsComponent,
    ModulesComponent,
    CountriesComponent,
    RacesComponent,
    InsuranceComponent,
    TitlesComponent,
    ApitokenComponent,
    TokendialogueComponent,
    PatientprofileComponent,
    PatientdataComponent,
    DoctorcodeComponent,
    CliniccodeComponent,
    EOrderingComponent,
    HealthcertComponent,
    ReglogsComponent,
    EOrderComponent,
    AccridifycertificateComponent,
    SftpComponent,
    RmgnotifyComponent,
    VacinationdbComponent,
    ArtdplusxComponent,
    FinalepopupComponent,
    ValidatecertificateComponent,
    ZoomImgComponent,
    ZoomImageComponent,
    ImageZoomComponent,
    ComparedataComponent,
    ControllerComponent,
    DateFilterPipe,
    QrReadersComponent,
    EthernetComponent,
    DoorsComponent,
    VisitScheduleComponent,
    ReservedDayComponent,
    VisitorRequestComponent,
    VisitorLogComponent,
    UserlogComponent,
    AcessDeniedComponent,
    TrafficComponent
  ],
  imports: [
    RouterModule,
    TreeviewModule.forRoot(),
    CountdownModule,
    MatChipsModule,
    MDBBootstrapModule.forRoot(),
    CollapseModule,
    WavesModule,
    BrowserModule,
    RouterModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    MatButtonModule,
    NgxSpinnerModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatTreeModule,
    MatTooltipModule,
    MatStepperModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    ChartsModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatRadioModule,
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatDateFnsDateModule
    // NgxMatMomentModule
  ],
  // exports:[DateFilterPipe],

  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
  {
    provide: MAT_DATE_LOCALE,
    useValue: "en-GB",
  },
  loginServices, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
function appRoutes(appRoutes: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

function routes(routes: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}
