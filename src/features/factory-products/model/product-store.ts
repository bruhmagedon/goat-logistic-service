import { create } from 'zustand';
import { FactoryProduct } from './types';

interface ProductState {
  products: FactoryProduct[];
  addProduct: (product: FactoryProduct) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [
    {
      id: 'nike-pegasus-37',
      name: 'Кроссовки Nike Air Zoom Pegasus 37',
      status: 'На складе',
      price: 8990,
      brand: 'Nike',
      currency: '₽',
      materials: 'Нейлон, Кожа, Синтетическая ткань, Резина',
      variants: [
        { id: 'v1', color: 'Серый', size: 42, quantity: 15, weight: 0.82 },
        { id: 'v2', color: 'Серый', size: 43, quantity: 10, weight: 0.6 },
        { id: 'v3', color: 'Зеленый', size: 41, quantity: 20, weight: 0.8 },
      ],
      category: 'Мужская обувь',
    },
    {
      id: 'puma-rs-x3',
      name: 'Кроссовки Adidas Ultraboost 21',
      status: 'На модерации',
      price: 11990,
      currency: '₽',
      brand: 'Addidas',
      materials: 'Текстиль Primeknit, Резина Continental',
      variants: [
        { id: 'v6', color: 'Белый/Красный', size: 42.5, quantity: 0, weight: 0.8 },
        { id: 'v7', color: 'Черный/Зеленый', size: 44, quantity: 0, weight: 0.8 },
      ],
      category: 'Мужская обувь',
    },
    {
      id: 'puma-rs-x3-2',
      name: 'Кроссовки Puma RS-X3',
      status: 'Нужна поставка',
      price: 7490,
      brand: 'Puma',
      currency: '₽',
      materials: 'Текстиль, Резина',
      variants: [
        { id: 'v6', color: 'Зеленый', size: 43, quantity: 6, weight: 0.8 },
        { id: 'v7', color: 'Красный', size: 42, quantity: 2, weight: 0.8 },
        { id: 'v8', color: 'Красный', size: 43, quantity: 10, weight: 0.8 },
        { id: 'v9', color: 'Черный', size: 41, quantity: 0, weight: 0.8 },
      ],
      category: 'Мужская обувь',
    },
    {
      id: 'asics-gel-kayano-27',
      name: 'Кроссовки Asics Gel-Kayano 27',
      status: 'На складе',
      price: 13990,
      brand: 'Asics',
      currency: '₽',
      materials: 'Сетчатый верх, Гелевые вставки, Резина AHAR+',
      variants: [
        { id: 'v10', color: 'Серебристый/Синий', size: 39, quantity: 7, weight: 0.8 },
        { id: 'v11', color: 'Черный/Лайм', size: 38, quantity: 8, weight: 0.8 },
        { id: 'v12', color: 'Синий', size: 37, quantity: 1, weight: 0.8 },
      ],
      category: 'Женская обувь', // Исправлено на "Женская обувь" согласно скриншоту
    },
  ],
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
}));
