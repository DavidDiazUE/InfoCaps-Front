// src/app/models/subscription.model.ts
export interface SubscriptionRequest {
  paymentMethod: { id: number }; // relación con PaymentMethod
  amount: number;
  cardNumber: string;
  cardVerification: string;
  expirationDate: string; // formato: YYYY-MM-DD
}

export interface SubscriptionResponse {
  id: number;
  amount: number;
  cardNumber: string;
  cardVerification: string;
  expirationDate: string;
  paymentMethod: {
    paymentMethod_id: number;
    name?: string; // opcional si tu backend devuelve el nombre
  };
}
