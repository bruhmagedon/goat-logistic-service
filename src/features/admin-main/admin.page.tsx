import {
  ClipboardList,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
  Map,
  Network,
  PackageCheck,
  ShoppingCart,
  TriangleAlert,
  Truck,
  UserPlus,
  Users,
} from 'lucide-react';
import { useAdminDashboardStore } from './model/store';
import { ActionCard } from './ui/action-card';
import { StatCard } from './ui/stat-card';

function AdminDashboardPage() {
  const { data } = useAdminDashboardStore();

  return (
    <div className="space-y-8">
      {/* Секция ключевых показателей */}
      <div>
        <h2 className="mb-4 font-semibold text-xl">Ключевые показатели</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Активные пользователи"
            value={data.activeUsers}
            description="Потребители и Поставщики"
            icon={<Users />}
            color="blue"
          />
          <StatCard
            title="Товары с низким остатком"
            value={data.lowStockItems}
            description="Требуют пополнения"
            icon={<TriangleAlert />}
            color="orange"
          />
          <StatCard
            title="Заказы"
            value={data.recentOrders}
            description="За последнее время"
            icon={<ShoppingCart />}
            color="green"
          />
          <StatCard
            title="Новые заявки (Товары)"
            value={data.pendingProductRequests}
            description="Ожидают модерации"
            icon={<ClipboardList />}
            color="purple"
          />
          <StatCard
            title="Новые заявки (Пользователи)"
            value={data.pendingUserRequests}
            description="Ожидают модерации"
            icon={<UserPlus />}
            color="red"
          />
          <StatCard
            title="Поставки"
            value={data.recentDeliveries}
            description="За последнее время"
            icon={<Truck />}
            color="indigo"
          />
        </div>
      </div>

      {/* Секция быстрых действий */}
      <div>
        <h2 className="mb-4 font-semibold text-xl">Быстрые действия</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ActionCard
            to="/admin/products"
            title="Управление товарами"
            description="Просмотреть и модерировать новые товары"
            icon={<PackageCheck className="h-full w-full" />}
            color="purple"
          />
          <ActionCard
            to="/admin/users"
            title="Управление пользователями"
            description="Просмотр и редактирование учетных записей"
            icon={<Users className="h-full w-full" />}
            color="green"
          />
          <ActionCard
            to="/admin/network-monitoring"
            title="Мониторинг сети"
            description="Перейти к визуализации логистической сети"
            icon={<Network className="h-full w-full" />}
            color="blue"
          />
          <ActionCard
            to="/admin/route-finder"
            title="Кратчайший маршрут"
            description="Построить маршрут по последним заказам"
            icon={<Map className="h-full w-full" />}
            color="gray"
          />
        </div>
      </div>
    </div>
  );
}

export const Component = AdminDashboardPage;
