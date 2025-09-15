import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionService, PaymentData } from '../subscription.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subscription-form.html',
  styleUrl: './subscription-form.css'
})
export class SubscriptionFormComponent {
  subscriptionForm: FormGroup;
  loading = false;
  errorMessage = '';

  plans = [
    {
      id: 1,
      name: 'Plan Mensual',
      price: 29.99,
      period: 'mes',
      features: [
        'Acceso a todos los cursos',
        'Certificados de finalización',
        'Soporte 24/7',
        'Sin permanencia'
      ]
    },
    {
      id: 2,
      name: 'Plan Anual',
      price: 299.99,
      period: 'año',
      originalPrice: 359.88,
      features: [
        'Acceso a todos los cursos',
        'Certificados de finalización',
        'Soporte prioritario 24/7',
        'Descuento del 17%',
        'Acceso anticipado a nuevos cursos'
      ]
    }
  ];

  selectedPlan = this.plans[0];

  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
    private authService: AuthService,
    private router: Router
  ) {
    this.subscriptionForm = this.fb.group({
      planId: [this.selectedPlan.id, Validators.required],
      cardNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{16}$/)
      ]],
      expiryDate: ['', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
      ]],
      cvv: ['', [
        Validators.required,
        Validators.pattern(/^\d{3,4}$/)
      ]],
      cardholderName: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]]
    });
  }

  selectPlan(plan: any) {
    this.selectedPlan = plan;
    this.subscriptionForm.patchValue({ planId: plan.id });
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '').replace(/\D/g, '');
    value = value.substring(0, 16);
    value = value.replace(/(.{4})/g, '$1 ');
    event.target.value = value.trim();
    this.subscriptionForm.patchValue({ cardNumber: value.replace(/\s/g, '') });
  }

  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    event.target.value = value;
    this.subscriptionForm.patchValue({ expiryDate: value });
  }

  onSubmit() {
    if (this.subscriptionForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const paymentData: PaymentData = {
        cardNumber: this.subscriptionForm.value.cardNumber,
        expiryDate: this.subscriptionForm.value.expiryDate,
        cvv: this.subscriptionForm.value.cvv,
        cardholderName: this.subscriptionForm.value.cardholderName,
        planId: this.subscriptionForm.value.planId
      };

      this.subscriptionService.processPayment(paymentData).subscribe({
        next: (success) => {
          if (success) {
            // Update user subscription status
            this.authService.updateSubscriptionStatus(true);
            
            // Create subscription record
            const currentUser = this.authService.getCurrentUser();
            if (currentUser) {
              this.subscriptionService.createSubscription(currentUser.id, paymentData.planId).subscribe(() => {
                this.loading = false;
                alert('¡Pago procesado exitosamente! Ahora tienes acceso a todos los cursos.');
                this.router.navigate(['/courses']);
              });
            }
          } else {
            this.loading = false;
            this.errorMessage = 'Error al procesar el pago';
          }
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Error al procesar el pago';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.subscriptionForm.controls).forEach(key => {
      const control = this.subscriptionForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.subscriptionForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        switch(fieldName) {
          case 'cardNumber': return 'Número de tarjeta es requerido';
          case 'expiryDate': return 'Fecha de vencimiento es requerida';
          case 'cvv': return 'CVV es requerido';
          case 'cardholderName': return 'Nombre del titular es requerido';
          default: return 'Campo requerido';
        }
      }
      if (field.errors['pattern']) {
        switch(fieldName) {
          case 'cardNumber': return 'Número de tarjeta inválido (16 dígitos)';
          case 'expiryDate': return 'Formato inválido (MM/YY)';
          case 'cvv': return 'CVV inválido (3-4 dígitos)';
          case 'cardholderName': return 'Solo se permiten letras y espacios';
          default: return 'Formato inválido';
        }
      }
    }
    return '';
  }
}