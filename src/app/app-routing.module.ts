import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DocumentUploadComponent } from './admin/document-upload/document-upload.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { NoticeDetailComponent } from './branch-admin/notice-detail/notice-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { UserFormComponent } from './branch-admin/user-form/user-form.component';
import { DepartmentComponent } from './department/department.component';
import { InvestigatorsComponent } from './investigators/investigators.component';
import { CaseManagementComponent } from './case-management/case-management.component';
import { ReportComponent } from './report/report.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'search', component: SearchComponent },
  { path: 'departments', component: DepartmentComponent },
  { path: 'investigators', component: InvestigatorsComponent },
  { path: 'user-management', component: UserFormComponent },
  { path: 'cases', component: CaseManagementComponent },
  { path: 'reminders', component: EmailTemplateComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
