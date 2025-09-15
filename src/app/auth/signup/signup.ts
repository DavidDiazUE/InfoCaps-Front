import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // ✅ Ahora solo pedimos username y password
    this.signupForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const userData = {
        username: this.signupForm.value.username,
        password: this.signupForm.value.password
      };

      this.authService.signup(userData).subscribe({
        next: (success) => {
          this.loading = false;
          if (success) {
            this.router.navigate(['/login']); // 🔹 redirige al login tras registrarse
          } else {
            this.errorMessage = 'Error al crear la cuenta';
          }
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Error al registrarse';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return fieldName === 'username' ? 'Usuario es requerido' : 'Contraseña es requerida';
      }
      if (field.errors['minlength']) {
        const req = field.errors['minlength'].requiredLength;
        return `Debe tener al menos ${req} caracteres`;
      }
    }
    return '';
  }
}
