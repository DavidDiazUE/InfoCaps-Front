import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SubscriptionRequest, SubscriptionResponse } from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private apiService: ApiService) {}

createSubscription(subscription: SubscriptionRequest): Observable<SubscriptionResponse> {
  return this.apiService.post<SubscriptionResponse>('paymentcard-sav', subscription);
}

getAllSubscriptions(): Observable<SubscriptionResponse[]> {
  return this.apiService.get<SubscriptionResponse[]>('payment-all');
}

}
