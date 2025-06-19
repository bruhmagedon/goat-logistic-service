'use client';

// --- React и Библиотеки ---
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';

import { cn } from '@/shared/lib/css';
// --- UI Компоненты (shadcn/ui) ---
import { Button } from '@/shared/ui/kit/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/kit/select';
import { Separator } from '@/shared/ui/kit/separator';

// --- Иконки (lucide-react) ---
import { CirclePlus, Trash2, UploadCloud, X } from 'lucide-react';

// --- Состояние и Типы ---
import { useProductStore } from '../model/product-store'; // Убедитесь, что путь к стору верный
import { FactoryProduct } from '../model/types'; // Убедитесь, что путь к типам верный

// --- Схема валидации Zod ---
const variantSchema = z.object({
  color: z.string().min(1, 'Цвет обязателен'),
  size: z.coerce.number().positive('Размер должен быть положительным числом'),
  weight: z.coerce.number().positive('Вес должен быть положительным числом'),
});

const productSchema = z.object({
  name: z.string().min(3, 'Название должно быть длиннее 3 символов'),
  brand: z.string({ required_error: 'Выберите бренд' }),
  category: z.string({ required_error: 'Выберите категорию' }),
  price: z.coerce.number().positive('Цена должна быть больше 0'),
  materials: z.string().min(3, 'Укажите материалы'),
  variants: z.array(variantSchema).min(1, 'Добавьте хотя бы один вариант'),
});

type ProductFormValues = z.infer<typeof productSchema>;

// --- Основной Компонент Формы ---
export function AddProductForm({ onClose }: { onClose: () => void }) {
  const addProduct = useProductStore((state) => state.addProduct);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      materials: '',
      variants: [{ color: '', size: 42, weight: 0.7 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  // --- Логика для Drag-and-Drop ---
  const [preview, setPreview] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif'],
    },
    multiple: false, // Принимаем только один файл
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        // Создаем временный URL для отображения превью
        setPreview(URL.createObjectURL(file));
      }
    },
  });

  // Очищаем временный URL, чтобы избежать утечек памяти в браузере
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // --- Функция отправки формы ---
  function onSubmit(data: ProductFormValues) {
    const newProduct: FactoryProduct = {
      id: uuidv4(),
      name: data.name,
      brand: data.brand,
      category: data.category,
      price: data.price,
      materials: data.materials,
      status: 'На модерации',
      currency: '₽',
      // В реальном приложении здесь бы добавилась ссылка на загруженное изображение
      variants: data.variants.map((variant) => ({
        id: uuidv4(),
        ...variant,
        quantity: 0,
      })),
    };

    addProduct(newProduct);

    toast.success('Товар успешно создан!', {
      description: `Товар "${newProduct.name}" отправлен на модерацию.`,
    });

    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        {/* --- Основное содержимое формы --- */}
        <div className="space-y-6 p-6">
          <h2 className="font-semibold text-neutral-900 text-xl">Добавление нового товара</h2>

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
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Мужская обувь">Мужская обувь</SelectItem>
                        <SelectItem value="Женская обувь">Женская обувь</SelectItem>
                        <SelectItem value="Детская обувь">Детская обувь</SelectItem>
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
                      <Input type="number" {...field} />
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
                      <Input placeholder="Например, Текстиль, Резина, Кожа" {...field} />
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
                  <div
                    {...getRootProps()}
                    className={cn(
                      'relative flex h-[195px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-zinc-200 border-dashed text-center transition-colors',
                      isDragActive && 'border-primary bg-primary/10',
                    )}
                  >
                    <input {...getInputProps()} />
                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="Превью товара"
                          className="h-full w-full rounded-lg object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-7 w-7 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreview(null);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <UploadCloud className="h-10 w-10 text-zinc-400" />
                        <p className="mt-4 font-semibold text-primary text-sm">
                          Загрузите файлы{' '}
                          <span className="font-normal text-muted-foreground">или перетащите их сюда</span>
                        </p>
                        <p className="mt-1 text-muted-foreground text-xs">PNG, JPG, GIF до 10MB</p>
                      </div>
                    )}
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
        <div className="flex items-center justify-between rounded-b-lg border-t bg-muted p-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit">Отправить на модерацию</Button>
        </div>
      </form>
    </Form>
  );
}
