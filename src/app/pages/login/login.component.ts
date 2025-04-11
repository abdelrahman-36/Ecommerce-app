import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoding: boolean = false;
  msgError: string = '';
  isSuccess: string = '';
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });
  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoding = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            setTimeout(() => {
              // save token
              localStorage.setItem('userToken', res.token);

              // decode token
              this.authService.saveUserData();

              // navigate to home
              this.router.navigate(['/home']);
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
}
