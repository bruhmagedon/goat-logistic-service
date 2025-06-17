import { zodResolver } from '@hookform/resolvers/zod';
// Используем react-hook-form и zod для управления формой и валидации
import { useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';

// UI компоненты из shadcn/ui
import { Button } from '@/shared/ui/kit/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/kit/select';
import { Separator } from '@/shared/ui/kit/separator';

// Иконки
import { CirclePlus, Trash2, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import { useProductStore } from '../model/product-store';
import { FactoryProduct } from '../model/types';

// Схема валидации Zod
const variantSchema = z.object({
  color: z.string().min(1, 'Цвет обязателен'),
  size: z.coerce.number().min(1, 'Размер обязателен'),
  weight: z.coerce.number().min(0.1, 'Вес обязателен'),
});

const productSchema = z.object({
  name: z.string().min(3, 'Название должно быть длиннее 3 символов'),
  brand: z.string({ required_error: 'Выберите бренд' }),
  category: z.string({ required_error: 'Выберите категорию' }),
  price: z.coerce.number().min(1, 'Цена должна быть больше 0'),
  materials: z.string().min(3, 'Укажите материалы'),
  variants: z.array(variantSchema).min(1, 'Добавьте хотя бы один вариант'),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function AddProductForm({ onClose }: { onClose: () => void }) {
  const addProduct = useProductStore((state) => state.addProduct);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      materials: '',
      variants: [{ color: '', size: 0, weight: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  function onSubmit(data: ProductFormValues) {
    console.log('Данные из формы:', data);

    // 3. Преобразуем данные из формы в формат FactoryProduct
    const newProduct: FactoryProduct = {
      id: uuidv4(), // Генерируем уникальный ID для продукта
      name: data.name,
      brand: data.brand,
      category: data.category,
      price: data.price,
      materials: data.materials,
      status: 'На модерации',
      currency: '₽',
      variants: data.variants.map((variant) => ({
        id: uuidv4(),
        color: variant.color,
        size: variant.size,
        weight: variant.weight,
        quantity: 0,
      })),
    };

    console.log('Новый продукт для добавления в стор:', newProduct);

    addProduct(newProduct);

    toast.success('Товар успешно создан!', {
      description: `Товар "${newProduct.name}" отправлен на модерацию.`,
    });

    // 5. Закрываем модальное окно
    onClose();
  }

  return (
    // Используем компонент <Form> от shadcn
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        {/* --- Основное содержимое формы --- */}
        <div className="space-y-6 p-6">
          <h2 className="font-semibold text-neutral-900 text-xl">Добавление нового товара</h2>

          {/* --- Верхний блок полей (2 колонки) --- */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {/* Левая колонка */}
            <div className="space-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название товара</FormLabel>
                    <FormControl>
                      <Input placeholder="Например, Кроссовки SuperFlex" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категория</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Мужская обувь">Мужская обувь</SelectItem>
                        <SelectItem value="Женская обувь">Женская обувь</SelectItem>
                        <SelectItem value="Женская обувь">Детская обувь</SelectItem>
                        <SelectItem value="Аксессуары и уход">Аксессуары и уход</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена (₽)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="materials"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Основные материалы</FormLabel>
                    <FormControl>
                      <Input placeholder="Например, Текстиль, Резина, Кожа" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Правая колонка */}
            <div className="space-y-4">
              <FormField
                name="brand"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Бренд</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выберите бренд" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nike">Nike</SelectItem>
                        <SelectItem value="Adidas">Adidas</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Изображения товара</FormLabel>
                <FormControl>
                  <div className="flex h-[195px] w-full flex-col items-center justify-center rounded-lg border-2 border-zinc-200 border-dashed text-center">
                    <UploadCloud className="h-10 w-10 text-zinc-400" />
                    <p className="mt-4 font-semibold text-primary text-sm">
                      Загрузите файлы{' '}
                      <span className="font-normal text-muted-foreground">или перетащите их сюда</span>
                    </p>
                    <p className="mt-1 text-muted-foreground text-xs">PNG, JPG, GIF до 10MB</p>
                  </div>
                </FormControl>
              </FormItem>
            </div>
          </div>

          <Separator />

          {/* --- Блок вариантов товара --- */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-zinc-950">Варианты товара</h3>
              <Button
                type="button"
                variant="outline"
                size="small"
                onClick={() => append({ color: '', size: 0, weight: 0 })}
              >
                <CirclePlus className="mr-2 h-4 w-4" /> Добавить вариант
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-[1fr_1fr_0.5fr_auto] items-start gap-4 rounded-lg border bg-zinc-50/50 p-4"
              >
                <FormField
                  name={`variants.${index}.color`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Цвет</FormLabel>
                      <FormControl>
                        <Input placeholder="Черный" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`variants.${index}.size`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Размер</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="42" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`variants.${index}.weight`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Вес (кг)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="0.7" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex h-full items-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => remove(index)}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Футер с кнопками --- */}
        <div className="flex items-center justify-between rounded-b-lg border-t bg-neutral-50 p-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit">Отправить на модерацию</Button>
        </div>
      </form>
    </Form>
  );
}
