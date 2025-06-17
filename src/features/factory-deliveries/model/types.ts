export interface DeliveryItem {
  productId: string;
  variantId: string;
  productName: string;
  color: string;
  size: number | string;
  stockCount: number;
  deliveryAmount: number;
}
