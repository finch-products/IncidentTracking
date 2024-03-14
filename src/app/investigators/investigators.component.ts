import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Investigator {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
}

@Component({
  selector: 'app-investigators',
  templateUrl: './investigators.component.html',
  styleUrls: ['./investigators.component.scss']
})
export class InvestigatorsComponent {
  investigatorForm: FormGroup;

  invsts: Investigator[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: 1234567890,
      address: '123 Main St'
    },
    {
      firstName: 'Shyam',
      lastName: 'Roy',
      email: 'shyam.roy@example.com',
      phone: 1234567890,
      address: '123 Main St'
    },
    {
      firstName: 'Shewtha',
      lastName: 'Rao',
      email: 'shewtha.rao@example.com',
      phone: 1234567890,
      address: '123 Main St'
    },
  ];
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.investigatorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
    if (this.investigatorForm.valid) {
      console.log('Form Submitted:', this.investigatorForm.value);
      this.openSnackBar('Form Submitted!', 'Close');
      this.invsts.push(this.investigatorForm.value);
      this.investigatorForm.reset();
    }
  }
}
