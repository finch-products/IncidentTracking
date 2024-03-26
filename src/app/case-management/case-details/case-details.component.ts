import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss'],
})
export class CaseDetailsComponent {
  caseDetailsForm!: FormGroup;
  statusOptions: any[] = [
    { name: 'Open' },
    { name: 'Closed' },
    { name: 'Work In Progress' },
    { name: 'Investigating' },
    { name: 'Closed-Decision-Type' },
    { name: 'Closed' },
  ];
  investigators: any[] = [
    { name: 'Investigator A' },
    { name: 'Investigator B' },
    { name: 'Investigator C' },
  ];

  caseNo = 'abc123';

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.caseDetailsForm = this.fb.group({
      desc: ['Detailed Description of the CaseDetail', Validators.required],
      empNo: ['743210', Validators.required],
      name: ['Sharath V G', Validators.required],
      department: ['Department A', Validators.required],
      city: ['Bengaluru', Validators.required],
      building: ['Phenix', Validators.required],
      details: ['Breief detail for the case', Validators.required],
      reportedDate: ['2023-01-05', Validators.required],
      closedDate: ['2023-03-05'],
      reportedBy: ['Naveen', Validators.required],
      status: ['Open', Validators.required],
      investigator: [''],
      comments: [''],
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'custom-snackbar',
    });
  }

  onSubmit() {
    if (this.caseDetailsForm.valid) {
      this.openSnackBar('Form Updated!', 'Close');
      console.log(this.caseDetailsForm.value);
      // Here you would handle form submission, like sending data to a backend
    } else {
      console.log('Form is not valid');
    }
  }
}
