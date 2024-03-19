import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  role: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  userForm: FormGroup;

  departments: any[] = [
    { name: 'Department A' },
    { name: 'Department B' },
    { name: 'Department C' },
    { name: 'Department D' },
    { name: 'Department E' },
    { name: 'Department F' },
    { name: 'Department G' },
  ];

  roles: any[] = [
    { name: 'Role 1' },
    { name: 'Role 2' },
    { name: 'Role 3' },
    { name: 'Role 4' },
    { name: 'Role 5' },
    { name: 'Role 6' },
    { name: 'Role 7' },
  ];


  users: User[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      department: 'Department A',
      role: 'Role 1',
    },
    {
      firstName: 'Shyam',
      lastName: 'Roy',
      email: 'shyam.roy@example.com',
      phone: '1234567890',
      address: '123 Main St',
      department: 'Department B',
      role: 'Role 2',
    },
    {
      firstName: 'Shewtha',
      lastName: 'Rao',
      email: 'shewtha.rao@example.com',
      phone: '1234567890',
      address: '123 Main St',
      department: 'Department C',
      role: 'Role 3',
    },
  ];
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required]
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
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
      this.openSnackBar('Form Submitted!', 'Close');
      this.users.push(this.userForm.value);
      this.userForm.reset();
    }
  }
}
