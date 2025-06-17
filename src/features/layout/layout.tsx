import { useAuthStore } from '@/shared/hooks/useAuth';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/kit/button';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AddProductModal } from '../factory-products/compose/add-product-modal';
import { GoatLogo } from './ui/goat-logo';
import { Header } from './ui/header';
import { ThemeSwitcher } from './ui/theme-switcher';

const LogoRoutes = {
  shop: '/shop',
  factory: '/factory/products',
  admin: '/admin',
};

export function Layout() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="container mx-auto">
      <Header>
        <Link
          to={LogoRoutes[user?.role || 'shop']}
          className="flex w-[var(--filters-width)] items-center gap-[10px] border-border border-r px-6 py-5"
        >
          <span className="text-2xl">
            <GoatLogo title="logistic" />
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-between py-5 pr-7 pl-6">
          <div />
          <div className="flex items-center justify-end gap-2">
            {user?.role === 'factory' && (
              <>
                <Button
                  size="small"
                  prefix={<CirclePlus size={20} />}
                  onClick={() => setIsAddProductModalOpen(true)}
                >
                  Добавить новый товар
                </Button>
                <AddProductModal
                  isOpen={isAddProductModalOpen}
                  onClose={() => setIsAddProductModalOpen(false)}
                />
                <Link to={ROUTES.DELIVERIES}>
                  <Button size="small" variant={'outline'}>
                    Поставки
                  </Button>
                </Link>
                <Button size="small" variant={'outline'}>
                  Профиль
                </Button>
              </>
            )}
            <Button size="small" variant={'outline'} onClick={logout}>
              Выйти
            </Button>
            <ThemeSwitcher />
          </div>
        </div>
      </Header>
      <main className="flex h-[calc(100vh-var(--header-height))] overflow-y-auto border border-border border-t-0">
        <Outlet />
      </main>
    </div>
  );
}
