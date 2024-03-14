import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.scss'],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  title: string = '';
  authForm: FormGroup;
  otpSent = false;
  userType: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.authForm = this.fb.group({
      phone: ['', Validators.pattern(/^[0-9]{10}$/)],
      otp: [{ value: '', disabled: false }],
    });
    this.route.paramMap.subscribe((params) => {
      this.userType = params.get('userType');
      // this.title =
      //   this.userType === 'fcu'
      //     ? 'Login as FCU/LEC'
      //     : 'Login as EC Members';
    });
  }

  ngOnInit(): void {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'custom-snackbar',
    });
  }
  sendOtp() {
    const phone = this.authForm.get('phone')!.value;
    this.otpSent = true;
  }

  submit() {
    const otp = '1156';
    this.authService.authenticate(otp).then((isAuthenticated) => {
      this.openSnackBar('Logged in successfully', 'Close');
      console.log(this.userType);
      // if (this.userType === 'fcu') {
      //   localStorage.setItem('role', 'fcu');
      // } else {
      //   localStorage.setItem('role', 'ecMembers');
      // }
      this.router.navigate(['/dashboard']);
      // }
      setTimeout(() => {
        location.reload();
      }, 500);
    });
  }

  showOTPButton(): boolean {
    return !this.otpSent;
  }

  showSubmitButton(): boolean {
    return this.otpSent;
  }
}
