import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionRequest } from '../models/subscription.model';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './suscription.html',
  styleUrls: ['./suscription.css']
})
export class suscriptionComponent {
  subscriptionForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService
  ) {
    this.subscriptionForm = this.fb.group({
      amount: ['', [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/) 
      ]],
      cardNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{16}$/) 
      ]],
      expiryDate: ['', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/) // sigue validando con "/"
      ]],
      cvv: ['', [
        Validators.required,
        Validators.pattern(/^\d{3,4}$/) 
      ]]
    });
  }

  // 🔹 Formatea automáticamente la fecha como MM/YY
  formatExpiryDate(event: any): void {
    let input = event.target.value.replace(/\D/g, ''); // solo dígitos
    if (input.length > 2) {
      input = input.substring(0, 2) + '/' + input.substring(2, 4);
    }
    event.target.value = input;
    this.subscriptionForm.get('expiryDate')?.setValue(input, { emitEvent: false });
  }

  onSubmit() {
    if (this.subscriptionForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const formValues = this.subscriptionForm.value;

      const subscription: SubscriptionRequest = {
        paymentMethod: { id: 3 },
        amount: formValues.amount,
        cardNumber: formValues.cardNumber,
        cardVerification: formValues.cvv,
        expirationDate: this.convertExpiryDate(formValues.expiryDate)
      };

      this.subscriptionService.createSubscription(subscription).subscribe({
        next: (res) => {
          this.loading = false;
          alert('Donación procesada con éxito 🎉 ¡Gracias por tu aporte!');
          console.log('✅ Respuesta backend:', res);
          this.subscriptionForm.reset();
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Hubo un error al procesar el pago. Inténtalo nuevamente.';
          console.error('❌ Error backend:', err);
        }
      });
    } else {
      console.log('❌ Formulario inválido:', this.subscriptionForm.errors);
      this.markFormGroupTouched();
    }
  }

  // 🔹 Convierte "MM/YY" a "YYYY-MM-DD"
  private convertExpiryDate(expiry: string): string {
    const [month, year] = expiry.split('/');
    const fullYear = '20' + year;
    return `${fullYear}-${month}-01`;
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
        switch (fieldName) {
          case 'amount': return 'La cantidad es requerida';
          case 'cardNumber': return 'El número de tarjeta es requerido';
          case 'expiryDate': return 'La fecha de expiración es requerida';
          case 'cvv': return 'El CVV es requerido';
        }
      }
      if (field.errors['pattern']) {
        switch (fieldName) {
          case 'amount': return 'Ingrese una cantidad válida (mayor a 0)';
          case 'cardNumber': return 'Número de tarjeta inválido (16 dígitos)';
          case 'expiryDate': return 'Formato inválido (MM/AA)';
          case 'cvv': return 'CVV inválido (3 o 4 dígitos)';
        }
      }
    }
    return '';
  }
}
