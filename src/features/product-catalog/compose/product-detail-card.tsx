import React, { useState } from "react";
import { Button } from "@/shared/ui/kit/button";
import { Product } from "../model/types";
import { Plus, Minus } from "lucide-react";

// --- Типы и Моковые данные (для примера) ---

interface ProductVariant {
  id: string;
  color: string;
  size: string | number;
  stock: number;
}

interface ProductDetail extends Product {
  brand: string;
  weight?: string;
  manufacturer?: string;
  variants?: ProductVariant[];
  characteristics?: Array<{
    name: string;
    value: string; // В Figma это 'Цвет'
    size?: string | number;
  }>;
}

interface ProductDetailCardProps {
  product: ProductDetail;
}

const mockVariants: ProductVariant[] = [
  { id: "v1", color: "Зеленый", size: 43, stock: 6 },
  { id: "v2", color: "Красный", size: 42, stock: 2 },
  { id: "v3", color: "Красный", size: 43, stock: 10 },
  { id: "v4", color: "Черный", size: 41, stock: 0 },
];

const mockCharacteristics = [
  { name: "Текстиль", value: "Зеленый", size: 41 },
  { name: "Резина", value: "Красный", size: 42 },
  { name: "Кожа", value: "Черный", size: 42 },
];

// --- Компонент-хелпер: Счётчик количества товара ---

interface VariantQuantityStepperProps {
  stock: number;
  initialQuantity?: number;
  onQuantityChange: (quantity: number) => void;
}

function VariantQuantityStepper({
  stock,
  initialQuantity = 0,
  onQuantityChange,
}: VariantQuantityStepperProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleSetQuantity = (newQuantity: number) => {
    const clampedQuantity = Math.max(0, Math.min(newQuantity, stock));
    setQuantity(clampedQuantity);
    onQuantityChange(clampedQuantity);
  };

  const isOutOfStock = stock === 0;
  const isMinusDisabled = quantity === 0;
  const isPlusDisabled = quantity === stock;

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-12 items-center justify-center rounded-md bg-violet-600 text-sm font-bold text-white shadow">
        {quantity}
      </div>
      <Button
        size="icon"
        className="h-6 w-6 rounded-md bg-violet-600 shadow hover:bg-violet-700 disabled:bg-purple-400 disabled:opacity-50"
        onClick={() => handleSetQuantity(quantity - 1)}
        disabled={isOutOfStock || isMinusDisabled}
      >
        <Minus className="h-4 w-4 text-white" />
      </Button>
      <Button
        size="icon"
        className="h-6 w-6 rounded-md bg-violet-600 shadow hover:bg-violet-700 disabled:bg-purple-400 disabled:opacity-50"
        onClick={() => handleSetQuantity(quantity + 1)}
        disabled={isOutOfStock || isPlusDisabled}
      >
        <Plus className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
}

// --- Основной компонент карточки товара ---

export function ProductDetailCard({ product }: ProductDetailCardProps) {
  const currentProductVariants = product.variants || mockVariants;
  const currentCharacteristics = product.characteristics || mockCharacteristics;

  return (
    <div className="border-l border-r border-b border-stone-300 ">
      {/* Верхняя плашка с заголовком и хлебными крошками */}
      <div className="flex items-center justify-between  px-6 py-4">
        <h2 className="text-xl font-semibold text-neutral-900">Товар</h2>
        <div className="text-base">
          <span className="text-neutral-400">
            Кроссовки &gt; Мужские кроссовки &gt;{" "}
          </span>
          <span className="font-semibold text-neutral-900">{product.name}</span>
        </div>
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[524px_1fr]">
        {/* Левая колонка */}
        <div className="flex flex-col gap-6">
          <div className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-6">
            <img
              src={product.imageUrl || "https://i.imgur.com/gSmC47V.png"}
              alt={product.name}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-2.5 font-semibold text-neutral-900">
                    Название товара
                  </th>
                  <th className="px-3 py-2.5 font-semibold text-neutral-900">
                    Цвет
                  </th>
                  <th className="px-3 py-2.5 text-right font-semibold text-neutral-900">
                    Размер
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentCharacteristics.map((char, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2.5">{char.name}</td>
                    <td className="px-3 py-2.5">{char.value}</td>
                    <td className="px-3 py-2.5 text-right">{char.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h1 className="text-3xl font-semibold">{product.brand}</h1>
            <p className="mt-1 text-xl">
              <span className="font-normal">Кроссовки</span>{" "}
              <span className="font-medium">{product.name}</span>
            </p>
            <p className="my-3.5 text-3xl font-semibold">
              {product.price.toLocaleString("ru-RU")} {product.currency}
            </p>
            <Button
              size="large"
              className="h-10 bg-violet-600 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
            >
              Добавить в заказ
            </Button>
            <div className="mt-3.5 space-y-1 text-sm">
              <p className="text-neutral-900">
                Вес товара:{" "}
                <span className="text-neutral-400">
                  {product.weight || "725г"}
                </span>
              </p>
              <p className="text-neutral-900">
                Изготовитель:{" "}
                <span className="text-neutral-400">
                  {product.manufacturer || "Puma Performance Factory"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex-1 rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-xl font-medium">Доступные варианты товара</h3>
            <div className="mt-3.5 space-y-3.5">
              {currentProductVariants.map((variant) => (
                <div
                  key={variant.id}
                  className="border-b border-gray-200 pb-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-sm font-medium">
                      <p>
                        <span className="text-neutral-400">Цвет:</span>{" "}
                        <span className="text-neutral-900">
                          {variant.color}
                        </span>
                      </p>
                      <p>
                        <span className="text-neutral-400">Размер:</span>{" "}
                        <span className="text-neutral-900">{variant.size}</span>
                      </p>
                    </div>
                    <VariantQuantityStepper
                      stock={variant.stock}
                      onQuantityChange={() => {}}
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">
                    Доступно на складе: {variant.stock}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
