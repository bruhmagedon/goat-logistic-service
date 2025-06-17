import { create } from 'zustand';
import type { AdminDashboardData } from './types';

interface AdminDashboardState {
  data: AdminDashboardData;
}

export const useAdminDashboardStore = create<AdminDashboardState>(() => ({
  data: {
    activeUsers: 16,
    lowStockItems: 3,
    recentOrders: 32,
    pendingProductRequests: 4,
    pendingUserRequests: 2,
    recentDeliveries: 8,
  },
}));
