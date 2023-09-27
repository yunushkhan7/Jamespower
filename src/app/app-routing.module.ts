import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './login/login.component';
import { UserlogComponent } from './modules/userlog/userlog.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LocationComponent } from './modules/location/location.component';
import { AuthorizedComponent } from './modules/authorizedphoneno/authorized.component';
import { EventComponent } from './modules/event/event.component';
import { ManageroleComponent } from './modules/managerole/managerole.component';
import { DataRetentionComponent } from './modules/data-retentation/data-retention.component';
import { ManageuserComponent } from './modules/manageuser/manageuser.component';
import { PatientComponent } from './modules/patient-registration/patient.component';
import { SystemlogComponent } from './modules/systemlog/systemlog.component';
import { PostsComponent } from './modules/posts/posts.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthorizeddevicesComponent } from './modules/authorized-device/authorized-device.component';
import { OtpComponent } from './otp/otp.component';
import { TestComponent } from './modules/test/test.component';
import { RashidComponent } from './modules/rashid/rashid.component';
import { PatientlogComponent } from './modules/patientlog/patientlog.component';
import { SmtpComponent } from './modules/smtp/smtp.component';
import { ExcelPasswordComponent } from './modules/excel-password/excel-password.component';
import { EmailsComponent } from './modules/emails/emails.component';
import { CountriesComponent } from './modules/countries/countries.component';
import { path } from 'd3-path';
import { RacesComponent } from './modules/races/races.component';
import { InsuranceComponent } from './modules/insurance/insurance.component';
import { TitlesComponent } from './modules/titles/titles.component';
import { ApitokenComponent } from './modules/apitoken/apitoken.component';
import { PatientprofileComponent } from './modules/patientprofile/patientprofile.component';
import { PatientdataComponent } from './modules/patientdata/patientdata.component';
import { DoctorcodeComponent } from './modules/doctorcode/doctorcode.component';
import { CliniccodeComponent } from './modules/cliniccode/cliniccode.component';
import { EOrderingComponent } from './modules/e-ordering/e-ordering.component';
import { ReglogsComponent } from './modules/reglogs/reglogs.component';
import { HealthcertComponent } from './modules/healthcert/healthcert.component';
import { AccridifycertificateComponent } from './modules/accridifycertificate/accridifycertificate.component';
import { SftpComponent } from './module/sftp/sftp.component';
import { VacinationdbComponent } from './modules/vacinationdb/vacinationdb.component';
import { ArtdplusxComponent } from './modules/artdplusx/artdplusx.component';
import { ValidatecertificateComponent } from './modules/validatecertificate/validatecertificate.component';
import { ComparedataComponent } from './modules/comparedata/comparedata.component';
import { ControllerComponent } from './modules/controller/controller.component';
import { QrCodesComponent } from './modules/qr-codes/qr-codes.component';
import { VisitorLogComponent } from './modules/visitor-log/visitor-log.component';
import { VisitorRequestComponent } from './modules/visitor-request/visitor-request.component';
import { DataFieldsComponent } from './modules/data-fields/data-fields.component';
import { VisitScheduleComponent } from './modules/visit-schedule/visit-schedule.component';
import { ReservedDayComponent } from './modules/reserved-day/reserved-day.component';
import { QrReadersComponent } from './modules/qr-readers/qr-readers.component';
import { EthernetComponent } from './modules/ethernet/ethernet.component';
import { DoorsComponent } from './modules/doors/doors.component';
import { UpdateSettingsComponent } from './modules/update-settings/update-settings.component';
import { AcessDeniedComponent } from './acess-denied/acess-denied.component';
import { TrafficComponent } from './traffic/traffic.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: DefaultComponent,
      // canActivate: [AuthGuard],

    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },

      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'controller',
        component: ControllerComponent,
      },
      {
        path: 'update-settings',
        component: UpdateSettingsComponent,
      },
      {
        path: 'vacinationdb',
        component: VacinationdbComponent,
      },
      {
        path: 'artdplusx',
        component: ArtdplusxComponent,
      },
      {
        path: 'location',
        component: LocationComponent,
      },
      {
        path: 'patient-log',
        component: PatientlogComponent,
      },
      {
        path: 'smtp',
        component: SmtpComponent,
      },
      {
        path: 'patientprofile/:id',
        component: PatientprofileComponent
      },
      {
        path: 'patientdata',
        component: PatientdataComponent
      },
      {
        path: 'sftp',
        component: SftpComponent
      },

      {
        path: 'excel-password',
        component: ExcelPasswordComponent,
      },
      {
        path: 'emails',
        component: EmailsComponent,
      },

      {
        path: 'manageuser',
        component: ManageuserComponent,
      },

      {
        path: 'authorized-phone-no',
        component: AuthorizedComponent,
      },

      {
        path: 'profile',
        component: ProfileComponent,
      },

      {
        path: 'patient-registration',
        component: PatientComponent,
      },

      {
        path: 'test',
        component: TestComponent,
      },

      {
        path: 'rashid',
        component: RashidComponent,
      },

      {
        path: 'data-retention',
        component: DataRetentionComponent,
      },

      {
        path: 'managerole',
        component: ManageroleComponent,
      },

      {
        path: 'validatecertificate',
        component: ValidatecertificateComponent,
      },

      {
        path: 'event',
        component: EventComponent,
      },

      {
        path: 'controller/comparedata',
        component: ComparedataComponent,
      },

      {
        path: 'authorized-devices',
        component: AuthorizeddevicesComponent,
      },
      {
        path: 'systemlog',
        component: SystemlogComponent,
      },

      {
        path: 'userlog',
        component: UserlogComponent,
      },
      {
        path: 'qr-codes',
        component: QrCodesComponent,
      },
      {
        path: 'visitor-log',
        component: VisitorLogComponent,
      },
      {
        path: 'visitor-request',
        component: VisitorRequestComponent,
      },
      {
        path: 'data-fields',
        component: DataFieldsComponent,
      },
      {
        path: 'visit-schedules',
        component: VisitScheduleComponent,
      },
      {
        path: 'reserved-days',
        component: ReservedDayComponent,
      },
      {
        path: 'doors',
        component: DoorsComponent,
      }, {
        path: 'ethernet',
        component: EthernetComponent,
      },
      {
        path: 'qr-readers',
        component: QrReadersComponent,
      },  {
        path: 'ethernet',
        component: EthernetComponent,
      },
      {
        path: 'countries',
        component: CountriesComponent
      },
      {
        path: 'races',
        component: RacesComponent
      },
      {
        path: 'insurance',
        component: InsuranceComponent
      },
      {
        path: 'titles',
        component: TitlesComponent
      },
      {
        path: 'apitoken',
        component: ApitokenComponent
      },
      {
        path: 'doctorcode',
        component: DoctorcodeComponent
      },
      {
        path: 'cliniccode',
        component: CliniccodeComponent
      },
      {
        path: 'eorder',
        component: EOrderingComponent
      },
      {
        path: 'monthly-traffic',
        component: TrafficComponent
      },

    ],
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'otp',
    component: OtpComponent,
  },
  {
    path: 'access',
    component: AcessDeniedComponent,
  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent,
  },
  { path: 'default', component: DefaultComponent },



  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
