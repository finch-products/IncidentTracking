import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Case } from '../model/dashboard.model';
import { cases } from '../mock-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  cases: Case[] = [];
  searchForm: FormGroup;
  private filteredDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.cases);
  filteredData$: Observable<any[]> = this.filteredDataSubject.asObservable();

  filteredData = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['caseNo', 'desc', 'empNo', 'name', 'department', 'city', 'building', 'reportedDate', 'closedDate', 'status'];

  departments: any[] = [
    { name: 'Department A' },
    { name: 'Department B' },
    { name: 'Department C' },
    { name: 'Department D' },
    { name: 'Department E' },
    { name: 'Department F' },
    { name: 'Department G' },
  ];

  constructor(private fb: FormBuilder) {
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

  }

  ngOnInit(): void {
    this.cases = cases;
    this.onSearch();
  }

  onSearch(): void {
    const formValue = this.searchForm.value;

    this.filteredData.data = this.cases.filter(record => {
      const reportedDate = new Date(record.reportedDate);
      const quickDateFilter = formValue.quickDate ? new Date(Date.now() - parseInt(formValue.quickDate) * 24 * 60 * 60 * 1000) : null;
      const dateFromFilter = formValue.dateFrom ? new Date(formValue.dateFrom) : null;
      const dateToFilter = formValue.dateTo ? new Date(formValue.dateTo) : null;

      return (
        (formValue.caseNo ? record.caseNo.includes(formValue.caseNo) : true) &&
        (formValue.investigator ? record.name.includes(formValue.investigator) : true) &&
        (formValue.location ? record.building.includes(formValue.location) : true) &&
        (formValue.status ? record.status === formValue.status : true) &&
        (formValue.department ? record.department === formValue.department : true) &&
        (formValue.department ? record.department === formValue.department : true) &&
        (formValue.city ? record.city === formValue.city : true) &&
        (!quickDateFilter || reportedDate >= quickDateFilter) &&
        (!dateFromFilter || reportedDate >= dateFromFilter) &&
        (!dateToFilter || reportedDate <= dateToFilter)
      );
    });
  }

  applyFilter(filterValue: string): void {
    this.filteredData.filter = filterValue.trim().toLowerCase();
  }
}
