// ... другие типы

// Тип для узла в React Flow
import { Node } from '@xyflow/react';

export interface NetworkNode extends Node {
  type: 'warehouse' | 'factory' | 'shop';
  data: {
    label: string;
    // Общие поля
    id: string | number;
    // Поля склада
    totalProducts?: number;
    lowStockCount?: number;
    // Поля завода
    productsSupplied?: number;
    // Поля магазина
    activeOrders?: number;
  };
}
