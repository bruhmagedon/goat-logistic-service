export interface SystemUser {
  id: string;
  email: string;
  role: 'Поставщик' | 'Потребитель';
  organizationName: string;
  address: string;
  inn: string;
}

export interface PendingUserRequest {
  id: string;
  email: string;
  requestedRole: 'Поставщик' | 'Потребитель';
  organizationName: string;
  date: string;
  address: string;
  inn: string;
}
