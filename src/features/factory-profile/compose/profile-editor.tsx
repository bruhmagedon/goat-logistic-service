import { Button } from '@/shared/ui/kit/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/kit/form'; // FormMessage убран, т.к. не используется
import { Input } from '@/shared/ui/kit/input';
// ИЗМЕНЕНИЕ: Импортируем обычный Label, а не FormLabel
import { Label } from '@/shared/ui/kit/label';
import { Separator } from '@/shared/ui/kit/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useSupplierProfileStore } from '../model/supplier-profile.store';

const companySchema = z.object({
  companyName: z.string().min(1, 'Название компании обязательно'),
  inn: z
    .string()
    .refine((val) => /^\d{10}$|^\d{12}$/.test(val), { message: 'ИНН должен состоять из 10 или 12 цифр' }),
  address: z.string().min(1, 'Адрес обязателен'),
});

export function ProfileEditor() {
  const { profile, updateProfile } = useSupplierProfileStore();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: profile.companyName,
      inn: profile.inn,
      address: profile.address,
    },
  });

  function onCompanySubmit(data: z.infer<typeof companySchema>) {
    updateProfile(data);
    toast.success('Информация о компании успешно обновлена!');
  }

  return (
    <Card className="flex h-full flex-col rounded-none border-y-0 border-r-0 border-l-0">
      <CardHeader>
        <CardTitle className="text-xl">Профиль пользователя</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-8">
        {/* Форма информации о компании */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCompanySubmit)} className="space-y-6">
            <h3 className="font-semibold">Информация о вашей компании</h3>
            <div className="space-y-4">
              <FormField
                name="companyName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название компании</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="inn"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ИНН</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адрес</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Изменить информацию о вас
            </Button>
          </form>
        </Form>

        <Separator />

        {/* ИСПРАВЛЕНИЕ: Блок "Данные для входа" теперь использует обычные div и Label */}
        <div className="space-y-6">
          <h3 className="font-semibold">Данные для входа</h3>
          <div className="space-y-4">
            {/* Используем div + Label вместо FormItem + FormLabel */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" readOnly value={profile.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" readOnly type="password" value="••••••••••" />
            </div>
          </div>
          <Button
            className="w-full"
            onClick={() => toast.info('Редактирование данных для входа в разработке')}
          >
            Изменить данные для входа
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
