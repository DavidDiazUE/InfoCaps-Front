import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CreateUserRequest } from '../../models/api-response.model';
import Swal from 'sweetalert2';
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
    private userService: UserService,
    private router: Router
  ) {
  
    this.signupForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value && confirmPassword.value) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        // Si las contraseñas coinciden, limpiar el error de passwordMismatch
        if (confirmPassword.errors) {
          delete confirmPassword.errors['passwordMismatch'];
          if (Object.keys(confirmPassword.errors).length === 0) {
            confirmPassword.setErrors(null);
          }
        }
      }
    }
    return null;
  }

  onSubmit() {
    console.log('📝 Form submission started');
    console.log('Form valid:', this.signupForm.valid);
    console.log('Form values:', this.signupForm.value);
    
    if (this.signupForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      const userData: CreateUserRequest = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      console.log('📝 Sending user data:', userData);
      
      this.userService.createUser(userData).subscribe({
        next: (user) => {
          console.log(' Signup successful:', user);
          this.loading = false;
          if (user && user.user_id) {
            Swal.fire({
            title: '¡Registro exitoso! 🎉',
            text: 'Ahora puedes iniciar sesión.',
            icon: 'success',
            confirmButtonText: 'Ir al login',
              confirmButtonColor: '#4a90e2'
            }).then(() => {
          this.router.navigate(['/login']);
          });
          }
 else {
            console.log(' Signup failed - no user_id in response');
            this.errorMessage = 'Error al crear la cuenta';
          }
        },
        error: (error) => {
          console.error(' Signup error:', error);
          this.loading = false;
          
          if (error.status === 0) {
            this.errorMessage = 'Error de conexión. Verifica que el servidor esté funcionando.';
          } else if (error.status === 400) {
            this.errorMessage = 'Datos inválidos. Verifica la información ingresada.';
          } else if (error.status === 409) {
            this.errorMessage = 'El email ya está registrado. Usa otro email.';
          } else {
            this.errorMessage = error.error?.message || 'Error al crear la cuenta. Intenta nuevamente.';
          }
        }
      });
    } else {
      console.log(' Form is invalid');
      this.logFormErrors();
      this.markFormGroupTouched();
    }
  }

  private logFormErrors() {
    console.log('Form validation errors:');
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      if (control && control.errors) {
        console.log(`${key}:`, {
          value: control.value,
          errors: control.errors,
          touched: control.touched
        });
      }
    });
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
        switch(fieldName) {
          case 'firstName': return 'Nombre es requerido';
          case 'lastName': return 'Apellido es requerido';
          case 'email': return 'Email es requerido';
          case 'password': return 'Contraseña es requerida';
          case 'confirmPassword': return 'Confirmar contraseña es requerido';
          default: return 'Campo requerido';
        }
      }
      if (field.errors['pattern']) {
        switch(fieldName) {
          case 'firstName':
          case 'lastName': return 'Solo se permiten letras y espacios';
          case 'email': return 'Email inválido';
          default: return 'Formato inválido';
        }
      }
      if (field.errors['minlength']) {
        return 'Contraseña debe tener al menos 6 caracteres';
      }
      if (field.errors['passwordMismatch']) {
        return 'Las contraseñas no coinciden';
      }
    }
    return '';
  }
}