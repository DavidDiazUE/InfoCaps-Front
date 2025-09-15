import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Subscription {
  id: number;
  userId: number;
  planName: string;
  price: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  planId: number;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  processPayment(paymentData: PaymentData): Observable<boolean> {
    return new Observable(observer => {
      // Simulate payment processing
      setTimeout(() => {
        // In a real app, this would make an API call to process payment
        console.log('Processing payment:', paymentData);
        observer.next(true);
        observer.complete();
      }, 2000);
    });
  }

  createSubscription(userId: number, planId: number): Observable<Subscription> {
    return new Observable(observer => {
      setTimeout(() => {
        const subscription: Subscription = {
          id: Date.now(),
          userId: userId,
          planName: 'Plan Premium',
          price: 29.99,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          isActive: true
        };
        observer.next(subscription);
        observer.complete();
      }, 1000);
    });
  }
}