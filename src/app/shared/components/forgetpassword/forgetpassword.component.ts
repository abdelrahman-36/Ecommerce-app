import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { networkInterfaces } from 'os';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  step: number = 1;
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  verifycode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });
  veriyfyEmailSubmit() {
    let emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);
    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  veriyfyCodeSubmit() {
    this._AuthService.setCodeVerify(this.verifycode.value).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  resetPasswordSubmit() {
    this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token);
        this._Router.navigate(['/home']);
        this._AuthService.saveUserData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
