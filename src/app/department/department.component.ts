import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Department {
  departmentName: string;
  location: string;
  city: string;
  pincode: number;
  address: string;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})

export class DepartmentComponent {
  deptForm: FormGroup;
  displayDepartmentForm: boolean = false;

  depts: Department[] = [
    {
      departmentName: 'Bengaluru',
      location: 'Marathhalli',
      city: 'Bengaluru',
      pincode: 560012,
      address: '123 Main St'
    },
    {
      departmentName: 'Chennai',
      location: 'Indiranagar',
      city: 'Chennai',
      pincode: 560011,
      address: '123 Church St'
    },
    {
      departmentName: 'Mumbai',
      location: 'Kalyan',
      city: 'Mumbai',
      pincode: 660012,
      address: '123 Main St Kalyan Road'
    },
  ];
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.deptForm = this.fb.group({
      departmentName: ['', Validators.required],
      location: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      address: ['', Validators.required],
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
    if (this.deptForm.valid) {
      console.log('Form Submitted:', this.deptForm.value);
      this.openSnackBar('Form Submitted!', 'Close');
      this.depts.push(this.deptForm.value);
      this.deptForm.reset();
    }
  }

}
