export interface SalesReportItem {
  id: string;
  name: string;
  color: string;
  size: number | string;
  quantity: number;
  profit: number;
}

export interface DailySalesReport {
  date: string;
  totalProfit: number;
  currency: '₽' | '$';
  items: SalesReportItem[];
}

export interface SupplierProfile {
  companyName: string;
  inn: string;
  address: string;
  email: string;
}
