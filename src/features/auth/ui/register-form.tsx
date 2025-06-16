import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/kit/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/kit/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const registerSchema = z
  .object({
    username: z
      .string({
        required_error: 'Email обязателен',
      })
      .email('Неверный email'),
    password: z
      .string({
        required_error: 'Пароль обязателен',
      })
      .min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: z.string(),
    role: z.enum(['shop', 'factory']),
    address: z.string({
      required_error: 'Адрес обязателен',
    }),
    name: z.string({
      required_error: 'Название организации обязательно',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });

export function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
  });

  // const { errorMessage, isPending, register } = useRegister();

  const onSubmit = form.handleSubmit(() => {});

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Tabs defaultValue="credentials" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="credentials">Данные для входа</TabsTrigger>
            <TabsTrigger value="organization">Информация о вас</TabsTrigger>
          </TabsList>
          <TabsContent value="credentials">
            <div className="flex flex-col gap-6 py-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input placeholder="******" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Подтвердите пароль</FormLabel>
                    <FormControl>
                      <Input placeholder="******" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          <TabsContent value="organization">
            <div className="flex flex-col gap-6 py-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ваша роль</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выберите роль" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="shop">Потребитель (Магазин)</SelectItem>
                        <SelectItem value="factory">Поставщик (Завод)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название организации</FormLabel>
                    <FormControl>
                      <Input placeholder="ООО 'Кроссовки Плюс'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адрес организации</FormLabel>
                    <FormControl>
                      <Input placeholder="г. Москва, ул. Логистическая, д. 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          <Button disabled={false} type="submit">
            Зарегистрироваться
          </Button>
          <Button asChild variant="outline">
            <Link to={ROUTES.LOGIN}>Уже есть аккаунт? Войти</Link>
          </Button>
        </Tabs>
      </form>
    </Form>
  );
}

// export function RegisterForm() {
//   return (
//     <form /* onSubmit={handleSubmit(onSubmit)} */>

//         {/* Таб 1: Данные для входа */}
//         <TabsContent value="credentials">
//           <div className="flex flex-col gap-6 py-4">
//             <div className="grid gap-3">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="example@company.com"
//                 required
//                 // {...register("email")} // Пример для react-hook-form
//               />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="password">Пароль</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="********"
//                 required
//                 // {...register("password")}
//               />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="********"
//                 required
//                 // {...register("confirmPassword")}
//               />
//             </div>
//           </div>
//         </TabsContent>

//         {/* Таб 2: Информация о пользователе/организации */}
//         <TabsContent value="organization">
//           <div className="flex flex-col gap-6 py-4">
//             <div className="grid gap-3">
//               <Label htmlFor="role">Ваша роль</Label>
//               <Select /* onValueChange={(value) => field.onChange(value)} defaultValue={field.value} */>
//                 <SelectTrigger id="role" className="w-full">
//                   <SelectValue placeholder="Выберите роль в системе" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="consumer">Потребитель (Магазин)</SelectItem>
//                   <SelectItem value="supplier">Поставщик (Завод)</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="organizationName">Название организации</Label>
//               <Input
//                 id="organizationName"
//                 type="text"
//                 placeholder="ООО 'Кроссовки Плюс'"
//                 required
//                 // {...register("organizationName")}
//               />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="organizationAddress">Адрес организации</Label>
//               <Input
//                 id="organizationAddress"
//                 type="text"
//                 placeholder="г. Москва, ул. Логистическая, д. 1"
//                 required
//                 // {...register("organizationAddress")}
//               />
//             </div>
//           </div>
//         </TabsContent>
//       </Tabs>

//       <div className=<Button type="submit" className="w-full">
//           Зарегистрироваться
//         </Button><
//         "mt-6 flex flex-col gap-3"
//         <Button asChild variant=<Link to={APP_ROUTES.LOGIN}>Уже есть аккаунт? Войти</Link><
//           "outline"
//         </Button>
//       </div>
//     </form>
//   );
// }
