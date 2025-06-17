// file: src/widgets/profile/ProfileEditor.tsx

import { Button } from "@/shared/ui/kit/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { Separator } from "@/shared/ui/kit/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useUserProfileStore } from "@/features/user-profile/model/user-profile.store";

// Схемы валидации
const companySchema = z.object({
  companyName: z.string().min(1, "Название компании обязательно"),
  inn: z
    .string()
    .refine((val) => /^\d{10}$|^\d{12}$/.test(val), {
      message: "ИНН должен состоять из 10 или 12 цифр",
    }),
  address: z.string().min(1, "Адрес обязателен"),
});

const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().optional(), // Пароль опционален для смены
});

export function ProfileEditor() {
  const { profile, updateProfile } = useUserProfileStore();

  const companyForm = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: profile,
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: profile.email, password: "" },
  });

  function onCompanySubmit(data: z.infer<typeof companySchema>) {
    updateProfile(data);
    toast.success("Информация о компании обновлена!");
  }

  function onLoginSubmit(data: z.infer<typeof loginSchema>) {
    updateProfile({ email: data.email });
    toast.success("Данные для входа обновлены!");
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-neutral-900 mb-6">
        Профиль пользователя
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-neutral-900">
            Информация о вашей компании
          </h3>
          <Form {...companyForm}>
            <form
              onSubmit={companyForm.handleSubmit(onCompanySubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={companyForm.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название компании</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={companyForm.control}
                name="inn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ИНН</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={companyForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адрес</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Изменить информацию о вас
              </Button>
            </form>
          </Form>
        </div>

        <Separator />

        <div>
          <h3 className="text-base font-medium text-neutral-900">
            Данные для входа
          </h3>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onLoginSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Изменить данные для входа
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
