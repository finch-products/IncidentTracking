import { Component, OnInit } from '@angular/core';
import { Case } from '../model/dashboard.model';
import { cases } from '../mock-data';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  // documents: Document[] = [
  //   /* ... */
  // ];
  // notices: Notice[] = notices;
  // branches: Branch[] = mockBranches;
  // pendingReportData: { title: string; url: string }[] = [];
  // branchesNotPosted: Branch[] = [];
  // unacknowledgedNotices: { branch: Branch; notice: Notice }[] = [];
  // noticeCount = noticeCount;

  // confirmationReport: {
  //   branchName: string;
  //   totalNotices: number;
  //   seenNotAcknowledged: number;
  //   acknowledged: number;
  //   notSeen: number;
  // }[] = [];

  // reportData: { date: string; documents: string[] }[] = [];

  // constructor(public dialog: MatDialog, public authService: AuthService) {}

  // ngOnInit(): void {
  //   this.generateReport();
  //   this.generatePendingReport();
  //   this.generateConfirmationReport();
  // }

  // generateReport(): void {
  //   const grouped: { [key: string]: { date: string; documents: string[] } } =
  //     {};

  //   this.documents.forEach((doc) => {
  //     const key = doc.sentOn;
  //     grouped[key] = grouped[key] || { date: doc.sentOn, documents: [] };
  //   });

  //   this.reportData = Object.values(grouped);
  // }

  // generatePendingReport(): void {
  //   console.log('generatePendingReport called');

  //   this.notices.forEach((notice) => {
  //     if (notice.status === 'pending') {
  //       // Push the title and url of the notice
  //       this.pendingReportData.push({ title: notice.title, url: notice.url });
  //     }
  //   });
  // }

  // generateConfirmationReport(): void {
  //   this.confirmationReport = this.branches.map((branch) => {
  //     const branchNotices = this.notices.filter(
  //       (notice) => notice.branchId === branch.id
  //     );
  //     const seenNotAcknowledged = branchNotices.filter(
  //       (notice) =>
  //         notice.seen === true &&
  //         notice.confirmed === false &&
  //         notice.status === 'pending'
  //     ).length;
  //     const acknowledged = branchNotices.filter(
  //       (notice) =>
  //         notice.seen === true &&
  //         notice.confirmed === true &&
  //         notice.status === 'confirmed'
  //     ).length;
  //     const notSeen = branchNotices.filter(
  //       (notice) =>
  //         notice.seen === false &&
  //         notice.status === 'pending' &&
  //         notice.confirmed === false
  //     ).length;

  //     return {
  //       branchName: branch.name,
  //       totalNotices: branchNotices.length,
  //       seenNotAcknowledged,
  //       acknowledged,
  //       notSeen,
  //     };
  //   });
  // }

  // sendReminder() {
  //   this.dialog.open(EmailTemplateComponent, {
  //     width: '400px',
  //   });
  // }

  // inident tracking

  cases: Case[] = [];
  filteredCases: Case[] = [];
  departments: any[] = [
    { name: 'Department A' },
    { name: 'Department B' },
    { name: 'Department C' },
    { name: 'Department D' },
    { name: 'Department E' },
    { name: 'Department F' },
    { name: 'Department G' },
  ];
  selectedDepartment: string | null = null;
  filteredDepartments: any[] = this.departments;
  searchText: string = '';
  openCases: number = 0;
  closedCases: number = 0;
  totalCases: number = 0;
  displayedColumns: string[] = [
    'caseNo',
    'desc',
    'empNo',
    'name',
    'department',
    'city',
    'building',
    'details',
    'dateReported',
    'dateClosed',
    'status',
  ];

  ngOnInit(): void {
    this.cases = cases;
    this.filteredDepartments = this.departments;
    this.selectedDepartment = null; // Indicate 'All Departments' are selected by default
    this.filterCasesByDepartment();
  }

  filterDepartments(): void {
    this.filteredDepartments = this.departments.filter((department) =>
      department.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectDepartment(department: { name: string } | null): void {
    this.selectedDepartment = department ? department.name : null;
    this.filterCasesByDepartment();
  }

  filterCasesByDepartment(): void {
    if (this.selectedDepartment && this.selectedDepartment !== 'all') {
      this.filteredCases = this.cases.filter(c => c.department === this.selectedDepartment);
    } else {
      // If 'All Departments' is selected, do not filter by department
      this.filteredCases = [...this.cases];
    }
    // After updating filteredCases, recalculate counts
    this.calculateCaseCounts();
  }
  showTotalCases(): void {
    this.filterCases();
    this.totalCases = this.filteredCases.length;
  }

  showOpenCases(): void {
    this.filterCases('open');
    this.openCases = this.filteredCases.filter(
      (c) => c.status === 'open'
    ).length;
  }

  showClosedCases(): void {
    this.filterCases('closed');
    this.closedCases = this.filteredCases.filter(
      (c) => c.status === 'closed'
    ).length;
  }

  filterCases(status?: 'open' | 'closed'): void {
    let filteredCases = this.cases.filter(
      (c) => c.department === this.selectedDepartment
    );

    if (status) {
      filteredCases = filteredCases.filter((c) => c.status === status);
    }
    this.filteredCases = filteredCases;
  }

  calculateCaseCounts(): void {
    this.totalCases = this.filteredCases.length;
    this.openCases = this.filteredCases.filter(
      (c) => c.status === 'open'
    ).length;
    this.closedCases = this.filteredCases.filter(
      (c) => c.status === 'closed'
    ).length;
  }
}
