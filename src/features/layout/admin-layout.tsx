import { useAuthStore } from '@/shared/hooks/useAuth';
import { cn } from '@/shared/lib/css';
import { Button } from '@/shared/ui/kit/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/kit/tooltip';
import { Home, LogOut, LucideProps, Network, Package, Route, Users } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { GoatLogo } from './ui/goat-logo';
import { ThemeSwitcher } from './ui/theme-switcher';

// Для большей надежности, явно типизируем наши ссылки
interface NavLinkItem {
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  label: string;
}

const navLinks: NavLinkItem[] = [
  { href: '/admin', icon: Home, label: 'Главная' },
  { href: '/admin/users', icon: Users, label: 'Управление пользователями' },
  { href: '/admin/products', icon: Package, label: 'Управление товарами' },
  { href: '/admin/network-monitoring', icon: Network, label: 'Мониторинг сети' },
  { href: '/admin/route-finder', icon: Route, label: 'Поиск маршрута' },
];

export default function AdminLayout() {
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  return (
    <div className="container mx-auto flex min-h-screen w-full bg-muted/40">
      {/* Левый сайдбар */}
      <aside className="flex w-[48px] flex-col border-r border-l bg-background">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === '/admin'
                  ? location.pathname === link.href
                  : location.pathname.startsWith(link.href);

              return (
                <Tooltip key={link.href}>
                  <TooltipTrigger asChild>
                    <Link
                      to={link.href}
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                        isActive && 'bg-[#d5b9fb] text-black',
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{link.label}</TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Button size="icon" variant={'outline'} onClick={logout}>
            <LogOut size={18} />
          </Button>
          <ThemeSwitcher />
        </nav>
      </aside>

      <div className="flex w-full flex-col">
        <header className="flex items-center gap-3 border border-b border-l-0 bg-background px-6 py-4">
          <GoatLogo title="logistic" />
          <span className="text-2xl">{'/'}</span>
          <h1 className="font-semibold text-2xl"> Панель администратора</h1>
        </header>
        <main className="grid max-h-[90vh] flex-1 items-start overflow-y-auto border-r px-6 py-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
