import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CaseDetail } from 'src/dto/case-detail.dto';

import { cases } from '../mock-data';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ObserverDTOService } from 'src/services/observer-dto.service';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit, AfterViewInit {
  cases: CaseDetail[]  = [];
  filteredCases: CaseDetail[] = [];
  selectedCase!: CaseDetail | null;
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filteredData = new MatTableDataSource<any>([]);

  columnHeaders: { [key: string]: string } = {
    caseNo: 'Case No.',
    subject: 'Subject',
    name: 'Name',
    departmentName: 'Department',
    reportedOn: 'Reported Date',
    closedOn: 'Closed Date',
    status: 'Status',
  };

  displayedColumns: string[] = [
    'caseNo',
    'subject',
    'name',
    'departmentName',
    'reportedOn',
    'closedOn',
    'status',
  ];

  ngOnInit(): void {
    this.cases = cases.map(caseDetail => {
      caseDetail.name = caseDetail.employeeInvolved.map(obj => obj.name).join('\n');
      return caseDetail
    });

    this.observerDTOService.closeSidenav.subscribe(res=>{
      if(res){
        this.selectedCase = null;
      }
    })
    // this.selectedCase = cases[0]
    this.filteredDepartments = this.departments;
    this.selectedDepartment = null;
    this.filterCasesByDepartment();
  }

  constructor( private router: Router,  private paginatorIntl: MatPaginatorIntl, public observerDTOService: ObserverDTOService){
    this.paginatorIntl.itemsPerPageLabel = 'Items per page:';
    this.paginatorIntl.nextPageLabel = 'Next page';
    this.paginatorIntl.previousPageLabel = 'Previous page';
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
      this.filteredCases = this.cases.filter(
        (c) => c.departmentName === this.selectedDepartment
      );
    } else {
      this.filteredCases = [...this.cases];
    }
    this.filteredData.data = this.filteredCases; // Update filteredData with filtered cases
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
      (c) => c.departmentName === this.selectedDepartment
    );

    if (status) {
      filteredCases = filteredCases.filter((c) => c.status === status);
    }
    this.filteredCases = filteredCases;
    this.filteredData.data = this.filteredCases;
    this.calculateCaseCounts();
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

  navigateToCaseDetail(row: any): void {
    // this.router.navigate(['/case-details']);
    this.observerDTOService.closeSidenav.next(false);
    this.selectedCase = row;
  }

  ngAfterViewInit() {
    this.filteredData.paginator = this.paginator; // Assign paginator to your filtered data source
  }
}
