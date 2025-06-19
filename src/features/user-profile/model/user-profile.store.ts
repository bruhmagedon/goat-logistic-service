// file: src/features/user-profile/model/user-profile.store.ts
import { create } from 'zustand';
import type {
  UserProfile,
  PurchaseDynamicsDataPoint,
  PurchaseCategoryDataPoint,
  PurchaseBrandDataPoint,
} from './types'; // Убедитесь, что типы существуют

interface UserProfileState {
  profile: UserProfile;
  purchaseDynamics: PurchaseDynamicsDataPoint[];
  purchaseCategories: PurchaseCategoryDataPoint[];
  purchaseBrands: PurchaseBrandDataPoint[];
  updateProfile: (data: Partial<UserProfile>) => void;
}

const mockUserProfile: UserProfile = {
  companyName: 'CitySole Retail',
  inn: '7701234567',
  address: 'г. Москва, ул. Примерная, д. 10, кв. 5',
  email: 'example@email.com',
};

const mockPurchaseDynamics: PurchaseDynamicsDataPoint[] = [
  { month: '2024-01', volume: 65000 },
  { month: '2024-02', volume: 130000 },
  { month: '2024-03', volume: 220000 },
  { month: '2024-04', volume: 195000 },
  { month: '2024-05', volume: 260000 },
  { month: '2024-06', volume: 240000 },
];

const mockPurchaseCategories: PurchaseCategoryDataPoint[] = [
  { category: 'Мужская обувь', volume: 220000, fill: '#C4B3FF' },
  { category: 'Женская обувь', volume: 150000, fill: '#8E51FF' },
  { category: 'Детская обувь', volume: 10000, fill: '#7F22FE' },
  { category: 'Аксессуары', volume: 80000, fill: '#7008E7' },
];

const mockPurchaseBrands: PurchaseBrandDataPoint[] = [
  { brand: 'Nike', volume: 180000 },
  { brand: 'Adidas', volume: 120000 },
  { brand: 'Puma', volume: 90000 },
  { brand: 'Reebok', volume: 60000 },
];

export const useUserProfileStore = create<UserProfileState>((set) => ({
  profile: mockUserProfile,
  purchaseDynamics: mockPurchaseDynamics,
  purchaseCategories: mockPurchaseCategories,
  purchaseBrands: mockPurchaseBrands,
  updateProfile: (data) => set((state) => ({ profile: { ...state.profile, ...data } })),
}));
