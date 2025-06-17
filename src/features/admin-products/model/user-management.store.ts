import { create } from 'zustand';
import type { PendingUserRequest, SystemUser } from './types';

interface UserManagementState {
  users: SystemUser[];
  pendingRequests: PendingUserRequest[];
  approveRequest: (request: PendingUserRequest) => void;
  rejectRequest: (requestId: string) => void;
  deleteUser: (userId: string) => void;
}

export const useUserManagementStore = create<UserManagementState>((set) => ({
  users: [
    {
      id: 'user1',
      email: 'factory@yandex.ru',
      role: 'Поставщик',
      organizationName: 'Атлант-Спорт Производство',
      address: "г. Клин, Ленинградское шоссе, 88 км, Технопарк 'Импульс', строение 5",
      inn: '123123123',
    },
    {
      id: 'user2',
      email: 'example@email.com',
      role: 'Потребитель',
      organizationName: 'CitySole Retail',
      address: 'г. Москва, ул. Примерная, д. 10, кв. 5',
      inn: '7701234567',
    },
    {
      id: 'user3',
      email: 'supplier@example.com',
      role: 'Поставщик',
      organizationName: 'ООО СпортТовары',
      address: 'г. Москва, ул. Ленина, 42',
      inn: '7701234567',
    },
    {
      id: 'user4',
      email: 'customer@retail.ru',
      role: 'Потребитель',
      organizationName: "Сеть магазинов 'Спортмастер'",
      address: 'г. Санкт-Петербург, пр. Невский, 78',
      inn: '7802345678',
    },
  ],
  pendingRequests: [
    {
      id: 'req1',
      email: 'newuser@example.com',
      requestedRole: 'Поставщик',
      organizationName: "ООО 'Перспектива'",
      date: '16.05.2024',
      address: 'г. Подольск, ул. Заводская, 1',
      inn: '5011122233',
    },
    {
      id: 'req2',
      email: 'retail@sportshop.ru',
      requestedRole: 'Потребитель',
      organizationName: "ИП 'Спортивный Мир'",
      date: '15.05.2024',
      address: 'г. Самара, ул. Победы, 100',
      inn: '6309876543',
    },
  ],

  approveRequest: (request) =>
    set((state) => {
      const newUser: SystemUser = {
        id: request.id,
        email: request.email,
        role: request.requestedRole,
        organizationName: request.organizationName,
        address: request.address,
        inn: request.inn,
      };
      return {
        users: [newUser, ...state.users],
        pendingRequests: state.pendingRequests.filter((r) => r.id !== request.id),
      };
    }),

  rejectRequest: (requestId) =>
    set((state) => ({
      pendingRequests: state.pendingRequests.filter((r) => r.id !== requestId),
    })),

  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== userId),
    })),
}));
