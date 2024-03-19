import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Case } from '../model/dashboard.model';
import { cases } from '../mock-data';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit, AfterViewInit {
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filteredData = new MatTableDataSource<any>([]);

  columnHeaders: { [key: string]: string } = {
    caseNo: 'Unique Case No',
    empNo: 'Emp No',
    name: 'Name',
    department: 'Department',
    reportedDate: 'Reported Date',
    closedDate: 'Closed Date',
    status: 'Status',
  };

  displayedColumns: string[] = [
    'caseNo',
    'empNo',
    'name',
    'department',
    'reportedDate',
    'closedDate',
    'status',
  ];

  ngOnInit(): void {
    this.cases = cases;
    this.filteredDepartments = this.departments;
    this.selectedDepartment = null;
    this.filterCasesByDepartment();
  }

  constructor( private router: Router,  private paginatorIntl: MatPaginatorIntl){
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
        (c) => c.department === this.selectedDepartment
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
      (c) => c.department === this.selectedDepartment
    );

    if (status) {
      filteredCases = filteredCases.filter((c) => c.status === status);
    }
    this.filteredCases = filteredCases;
    this.filteredData.data = this.filteredCases;
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
    this.router.navigate(['/case-details']);
  }

  ngAfterViewInit() {
    this.filteredData.paginator = this.paginator; // Assign paginator to your filtered data source
  }
}
