import { create } from 'zustand';
import type { PendingProductRequest, SystemProduct } from './types';

interface ProductManagementState {
  products: SystemProduct[];
  pendingRequests: PendingProductRequest[];
  approveProductRequest: (request: PendingProductRequest) => void;
  rejectProductRequest: (requestId: string) => void;
  deleteProduct: (productId: string) => void;
}

export const useProductManagementStore = create<ProductManagementState>((set) => ({
  products: [
    {
      id: 'prod1',
      name: 'Кроссовки Nike Air Zoom Pegasus 37',
      supplier: 'Атлант-Спорт Производство',
      category: 'Мужская обувь',
      price: 8990,
      currency: '₽',
      status: 'Нужна поставка',
    },
    {
      id: 'prod2',
      name: 'Кроссовки Adidas Originals Trefoil',
      supplier: 'СпортТекс Групп',
      category: 'Мужская обувь',
      price: 2490,
      currency: '₽',
      status: 'На складе',
    },
    {
      id: 'prod3',
      name: 'Кроссовки Under Armour Hustle 5.0',
      supplier: 'Экипировка Плюс',
      category: 'Женская обувь',
      price: 4590,
      currency: '₽',
      status: 'На складе',
    },
    {
      id: 'prod4',
      name: 'Кроссовки Nike Air Zoom Pegasus 37',
      supplier: 'Атлант-Спорт Производство',
      category: 'Мужская обувь',
      price: 4590,
      currency: '₽',
      status: 'На складе',
    },
  ],
  pendingRequests: [
    {
      id: 'req_prod_1',
      name: 'Кроссовки SuperBoost X',
      supplier: 'НоваСпортТрейд',
      date: '15.05.2024',
      category: 'Мужская обувь',
      price: 12500,
      currency: '₽',
    },
    {
      id: 'req_prod_2',
      name: 'Кроссовки Addidas ZXC 137',
      supplier: 'ТекстильСпорт ООО',
      date: '14.05.2024',
      category: 'Мужская обувь',
      price: 6890,
      currency: '₽',
    },
    {
      id: 'req_prod_3',
      name: 'Кроссовки Nike Pro',
      supplier: 'ТекстильСпорт ООО',
      date: '18.05.2024',
      category: 'Мужская обувь',
      price: 8990,
      currency: '₽',
    },
    {
      id: 'req_prod_4',
      name: 'Кроссовки S-x',
      supplier: 'Атлант-Спорт Производство',
      date: '20.05.2024',
      category: 'Мужская обувь',
      price: 9990,
      currency: '₽',
    },
  ],

  approveProductRequest: (request) =>
    set((state) => {
      const newProduct: SystemProduct = {
        id: request.id,
        name: request.name,
        supplier: request.supplier,
        category: request.category,
        price: request.price,
        currency: request.currency,
        status: 'Нужна поставка',
      };
      return {
        products: [newProduct, ...state.products],
        pendingRequests: state.pendingRequests.filter((r) => r.id !== request.id),
      };
    }),

  rejectProductRequest: (requestId) =>
    set((state) => ({
      pendingRequests: state.pendingRequests.filter((r) => r.id !== requestId),
    })),

  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),
}));
