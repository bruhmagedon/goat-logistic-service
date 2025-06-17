import { create } from 'zustand';
import type { DailySalesReport, SupplierProfile } from './types';

interface SupplierProfileState {
  profile: SupplierProfile;
  reports: DailySalesReport[];
  updateProfile: (data: Partial<SupplierProfile>) => void;
}

export const useSupplierProfileStore = create<SupplierProfileState>((set) => ({
  profile: {
    companyName: 'Атлант-Спорт Производство',
    inn: '5012345678',
    address: 'г. Клин, Ленинградское шоссе, 88 км, Технопарк "Импульс", строение 5',
    email: 'sales@atlant-sport.pro',
  },
  reports: [
    {
      date: '6 мая 2024',
      totalProfit: 32800,
      currency: '₽',
      items: [
        {
          id: 'sr1',
          name: 'Кроссовки Nike Air Zoom Pegasus 37',
          color: 'Серый',
          size: 42,
          quantity: 5,
          profit: 18900,
        },
        { id: 'sr2', name: 'Кроссовки Puma RS-X3', color: 'Зеленый', size: 43, quantity: 3, profit: 13900 },
      ],
    },
    {
      date: '29 ноября 2023',
      totalProfit: 1200,
      currency: '$',
      items: [
        { id: 'sr3', name: 'Nike Air', color: 'Зеленый', size: 41, quantity: 5, profit: 1200 },
        { id: 'sr4', name: 'Nike Air', color: 'Черный', size: 42, quantity: 10, profit: 1700 },
        { id: 'sr5', name: 'Nike Jordan', color: 'Черный', size: 42, quantity: 10, profit: 1500 },
      ],
    },
  ],
  updateProfile: (data) =>
    set((state) => ({
      profile: { ...state.profile, ...data },
    })),
}));
