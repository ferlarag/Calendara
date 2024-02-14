export interface PaymentOption {
  id: string;
}

export interface EventPayments {
  isPayedEvent: boolean;
  requireOnlinePayment: boolean;
  showPricing: boolean;
  price?: number;
  paymentOptions?: PaymentOption;
}
