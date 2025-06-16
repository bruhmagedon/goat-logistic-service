import { Button } from '@/shared/ui/kit/button';
import { Link, Outlet } from 'react-router-dom';
import { GoatLogo } from './ui/goat-logo';
import { Header } from './ui/header';

export function Layout() {
  return (
    <div className="container mx-auto">
      <Header>
        <Link
          to="/shop"
          className="flex w-[var(--filters-width)] items-center gap-[10px] border-border border-r px-6 py-5"
        >
          <span className="text-2xl">
            <GoatLogo title="market" />
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-between py-5 pr-7 pl-6">
          {/* <SeachInput className="flex-1" /> */}
          <div className="flex items-center gap-2">
            {/* <CartDrawer />
            <Link
              href="/shop/profile"
              className="inline-flex h-8 w-auto items-center justify-center whitespace-nowrap rounded-md border border-border bg-secondary px-1.5 font-medium text-secondary-foreground text-sm shadow-sm transition-colors hover:bg-secondary-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Профиль
            </Link>
            <ThemeSwitcher /> */}
            <Button size="small" variant={'outline'} onClick={() => {}}>
              Выйти
            </Button>
          </div>
        </div>
      </Header>
      <main className="flex min-h-[calc(100vh-var(--header-height))] border border-border border-t-0">
        <Outlet />
      </main>
    </div>
  );
}
