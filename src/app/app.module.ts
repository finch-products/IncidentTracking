import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { UserFormComponent } from './user-form/user-form.component';

import {MatExpansionModule} from '@angular/material/expansion';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DepartmentComponent } from './department/department.component';
import { InvestigatorsComponent } from './investigators/investigators.component';
import { CaseManagementComponent } from './case-management/case-management.component';
import { ReportComponent } from './report/report.component';
import { SearchComponent } from './search/search.component';
import { AlertComponent } from './alert/alert.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { SidenavComponent } from './sidenav/sidenav.component';
import { TopnavComponent } from './topnav/topnav.component';
import { EmployeeInvolvedComponent } from './case-management/employee-involved/employee-involved.component';
import { CaseDetailRightbarComponent } from './case-detail-rightbar/case-detail-rightbar.component';
import { TimelineComponent } from './case-detail-rightbar/timeline/timeline.component';
@NgModule({
  declarations: [
    AuthComponent,
    AppComponent,
    UserManagementComponent,
    DashboardComponent,
    EmailTemplateComponent,
    UserFormComponent,
    DepartmentComponent,
    InvestigatorsComponent,
    CaseManagementComponent,
    ReportComponent,
    SearchComponent,
    AlertComponent,
    SafeHtmlPipe,
    SidenavComponent,
    TopnavComponent,
    EmployeeInvolvedComponent,
    CaseDetailRightbarComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    OverlayModule,
    MatBadgeModule,
    MatExpansionModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
