import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CaseDetail } from 'src/dto/case-detail.dto';

import { cases } from '../mock-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  cases: CaseDetail[] = [];
  searchForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private filteredDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >(this.cases);
  filteredData$: Observable<any[]> = this.filteredDataSubject.asObservable();

  filteredData = new MatTableDataSource<any>([]);
   columnHeaders: { [key: string]: string } = {
    caseNo: 'Unique CaseDetail No',
    name: 'Name',
    department: 'Department',
    building: 'Building',
    reportedDate: 'Reported Date',
    closedDate: 'Closed Date',
    status: 'Status',
  };

  displayedColumns: string[] = [
    'caseNo',
    'name',
    'department',
    'building',
    'reportedDate',
    'closedDate',
    'status',
  ];


  departments: any[] = [
    { name: 'Department A' },
    { name: 'Department B' },
    { name: 'Department C' },
    { name: 'Department D' },
    { name: 'Department E' },
    { name: 'Department F' },
    { name: 'Department G' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paginatorIntl: MatPaginatorIntl
  ) {
    this.searchForm = this.fb.group({
      caseNo: [''],
      investigator: [''],
      location: [''],
      quickDate: [''],
      dateFrom: [''],
      dateTo: [''],
      status: [''],
      department: [''],
      city: [''],
    });

    this.paginatorIntl.itemsPerPageLabel = 'Items per page:';
    this.paginatorIntl.nextPageLabel = 'Next page';
    this.paginatorIntl.previousPageLabel = 'Previous page';
  }

  ngOnInit(): void {
    this.cases = cases;
    this.onSearch();
  }

  onSearch(): void {
    const formValue = this.searchForm.value;

    this.filteredData.data = this.cases.filter((record) => {
      const reportedDate = new Date(record.reportedOn);
      const quickDateFilter = formValue.quickDate
        ? new Date(
            Date.now() - parseInt(formValue.quickDate) * 24 * 60 * 60 * 1000
          )
        : null;
      const dateFromFilter = formValue.dateFrom
        ? new Date(formValue.dateFrom)
        : null;
      const dateToFilter = formValue.dateTo ? new Date(formValue.dateTo) : null;

      return (
        (formValue.caseNo ? record.caseNo.includes(formValue.caseNo) : true) &&
        (formValue.investigator
          ? record.reporter.name.includes(formValue.investigator)
          : true) &&
        // (formValue.location
        //   ? record.building.includes(formValue.location)
        //   : true) &&
        // (formValue.status ? record.status === formValue.status : true) &&
        // (formValue.department
        //   ? record.department === formValue.department
        //   : true) &&
        // (formValue.city ? record.city === formValue.city : true) &&
        (!quickDateFilter || reportedDate >= quickDateFilter) &&
        (!dateFromFilter || reportedDate >= dateFromFilter) &&
        (!dateToFilter || reportedDate <= dateToFilter)
      );
    });
  }

  ngAfterViewInit() {
    this.filteredData.paginator = this.paginator; // Assign paginator to your filtered data source
  }

  applyFilter(filterValue: string): void {
    this.filteredData.filter = filterValue.trim().toLowerCase();
  }

  navigateToCaseDetail(row: any): void {
    this.router.navigate(['/case-details']);
  }
}
