import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isLoding: boolean = false;
  msgError: string = '';
  isSuccess: string = '';
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  register: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{7,}$/),
      ]),
      rePassword: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.confirmPassword }
  );
  submitForm(): void {
    if (this.register.valid) {
      this.isLoding = true;
      this.authService.sendRegisterForm(this.register.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500);
            this.isSuccess = res.message;
          }
          this.isLoding = false;
        },
        error: (err) => {
          console.log(err);
          this.msgError = err.error.message;
          this.isLoding = false;
        },
      });
    }
  }
  confirmPassword(grop: AbstractControl) {
    let password = grop.get('password')?.value;
    let rePassword = grop.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
  }
}
