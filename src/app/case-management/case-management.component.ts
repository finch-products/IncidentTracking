import { cases, mockBranches, employees } from './../mock-data';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseDetail } from 'src/dto/case-detail.dto';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Branch } from '../model/dashboard.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-management',
  templateUrl: './case-management.component.html',
  styleUrls: ['./case-management.component.scss'],
})
export class CaseManagementComponent {
  caseForm: FormGroup;
  branches!: Branch[];

  involvedEmployeeList: FormGroup[] = []
  reportedBy!: FormGroup;

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
    'reportedOn',
    'closedOn',
    'reportedBy'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    this.caseForm = this.fb.group({
      caseNo: ['', Validators.required],
      description: ['', Validators.required],
      subject: ['', Validators.required],
      branchName: ['', Validators.required],
      departmentName: ['', Validators.required],
      reportedOn: ['', Validators.required],
      closedOn: [''],
    });
    
  }


// export interface CaseDetail {
//   reporter: Employee;
//   employeeInvolved: Employee[];
//   statusHistory?: CaseStatus[];
// }


  addNewInvolvedEmployeeList() {
    this.involvedEmployeeList.push(
      this.getEmployeeForm()
    )
  }
  getEmployeeForm() {
    return this.fb.group({
      code: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
    })
  }
  removeInvolvedEmployee(index: number){
    this.involvedEmployeeList.splice(index, 1)
  }

  ngOnInit(): void {
    this.cases = cases;
    this.branches = mockBranches;
    this.dataSource.data = this.cases;
    this.addNewInvolvedEmployeeList();
    this.reportedBy = this.getEmployeeForm();
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

  isEmployeeInvolvedValid(): boolean {
    for(let employee of this.involvedEmployeeList){
      if(!employee.valid)return false;
    }
    return true;
  }

  onSubmit(): void {
    if (this.caseForm.valid && this.isEmployeeInvolvedValid() && this.reportedBy.valid) {
      const formValue = { ...this.caseForm.value };
      let employeeInvolved = this.involvedEmployeeList.map(emp => emp.value)
      formValue.employeeInvolved = employeeInvolved;
      formValue.reporter = this.reportedBy.value;
      formValue.status = 'open';
      formValue.statusHistory = [{
        status: 'created',
        statusDesc: 'Case Reported On ' + this.formatDate(formValue.reportedOn),
        updateOn: new Date(formValue.reportedOn),
        updatedBy: employees[0],
        comment: '',
        attachment: [
          {
            filename: 'FR0001.pdf',
            fileurl: 'FR0001.pdf'
          }
        ]
      }]


      if (formValue.reportedOn) {
        formValue.reportedOn = this.formatDate(formValue.reportedOn);
      }
      if (formValue.closedOn) {
        formValue.closedOn = this.formatDate(formValue.closedOn);
      }
      console.log('Form Submitted:', formValue);
      this.openSnackBar('Form Submitted!', 'Close');
      this.cases.unshift(formValue);
      this.caseForm.reset();
      this.router.navigate(['/dashboard'])
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }else{
      this.openSnackBar('Please fill all required fields!', 'Close');
    }
  }
}
