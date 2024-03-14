// user-management.component.ts
import { Component } from '@angular/core';
import { BranchManagementService } from '../branch-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Branch } from 'src/app/model/dashboard.model';
import { mockBranches } from 'src/app/mock-data';

@Component({
  selector: 'app-user-management',
  styleUrls: ['./user-management.component.scss'],
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent {
  branchForm: FormGroup;
  branches: Branch[] = mockBranches;

  constructor(
    private branchService: BranchManagementService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.branchForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'custom-snackbar',
    });
  }

  onSubmit(): void {
    if (this.branchForm.valid) {
      console.log('Form Submitted:', this.branchForm.value);
      this.openSnackBar('Form Submitted!', 'Close');
      this.branches.push(this.branchForm.value);
      this.branchForm.reset();
    }
  }
}
