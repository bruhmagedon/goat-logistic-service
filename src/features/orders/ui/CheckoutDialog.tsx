import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/kit/dialog';
import { useState } from 'react';
import { CartItem } from '../model/types';
import { CheckoutForm } from './CheckoutForm';

interface CheckoutDialogProps {
  children: React.ReactNode;
  items: CartItem[];
}

export function CheckoutDialog({ children, items }: CheckoutDialogProps) {
  // Компонент Dialog из shadcn сам управляет своим состоянием открытия/закрытия

  const [isOpen, setIsOpen] = useState(false);

  // 3. Создаем функцию для закрытия, которую передадим дочернему компоненту
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {/* 
        Мы добавляем проверку `isOpen`, чтобы форма рендерилась только тогда,
        когда диалог открыт. Это оптимизация и хорошая практика.
      */}
      {isOpen && (
        <DialogContent className="min-w-[900px] p-0" showCloseButton={false}>
          {/* 5. Передаем нашу функцию закрытия в форму */}
          <CheckoutForm items={items} onClose={handleClose} />
        </DialogContent>
      )}
    </Dialog>
  );
}

// ПРИМЕЧАНИЕ: Я удалил `onCheckout` из пропсов, так как логика теперь полностью
// инкапсулирована в `CheckoutForm` и вызывается из него напрямую.
// `onClose` также больше не нужен, так как `Dialog` сам себя закроет
// при клике на кнопку "Отмена" или "Заказать".
