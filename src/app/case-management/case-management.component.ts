import { cases } from './../mock-data';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseDetail } from 'src/dto/case-detail.dto';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-case-management',
  templateUrl: './case-management.component.html',
  styleUrls: ['./case-management.component.scss'],
})
export class CaseManagementComponent {
  caseForm: FormGroup;

  involvedEmployeeList: FormGroup[] = []

  cases: CaseDetail[] = [];

  departments: any[] = [
    { name: 'Department A' },
    { name: 'Department B' },
    { name: 'Department C' },
    { name: 'Department D' },
    { name: 'Department E' },
    { name: 'Department F' },
    { name: 'Department G' },
  ];

  selectedDepartment: string = 'Department A';
  searchInput: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'caseNo',
    'desc',
    'empNo',
    'name',
    'department',
    'city',
    'building',
    // 'details',
    'reportedDate',
    'closedDate',
    'reportedBy'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.caseForm = this.fb.group({
      caseNo: ['', Validators.required],
      desc: ['', Validators.required],
      subject: ['', Validators.required],
      department: ['', Validators.required],
      city: ['', Validators.required],
      building: ['', Validators.required],
      details: ['', Validators.required],
      reportedDate: ['', Validators.required],
      closedDate: [''],
      reportedBy: ['', Validators.required]
    });
    
  }

  addNewInvolvedEmployeeList() {
    this.involvedEmployeeList.push(
      this.fb.group({
        empNo: ['', Validators.required],
        email: ['', Validators.required],
      })
    )
  }
  removeInvolvedEmployee(index: number){
    this.involvedEmployeeList.splice(index, 1)
  }

  ngOnInit(): void {
    this.cases = cases;
    this.dataSource.data = this.cases;
    this.addNewInvolvedEmployeeList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'custom-snackbar',
    });
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2); // Add leading 0 and get month
    const day = ('0' + d.getDate()).slice(-2); // Add leading 0 and get day
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.caseForm.valid) {
      const formValue = { ...this.caseForm.value };

      if (formValue.reportedDate) {
        formValue.reportedDate = this.formatDate(formValue.reportedDate);
      }
      if (formValue.closedDate) {
        formValue.closedDate = this.formatDate(formValue.closedDate);
      }
      console.log('Form Submitted:', formValue);
      this.openSnackBar('Form Submitted!', 'Close');
      this.cases.unshift(formValue);
      this.caseForm.reset();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
}
