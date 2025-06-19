'use client';

import { Button } from '@/shared/ui/kit/button';
// --- UI Components ---
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Checkbox } from '@/shared/ui/kit/checkbox';
import { Label } from '@/shared/ui/kit/label';
import { Separator } from '@/shared/ui/kit/separator';

// --- Icons ---
import { Factory, Info, Minus, Store, Warehouse } from 'lucide-react';
import { useNetworkStore } from '../model/store';
import { NetworkNode } from '../model/types';

// 1. Статические моковые метаданные для каждого типа узла
const mockNodeDataByType = {
  warehouse: {
    id: 'WH-2621234',
    totalProducts: 20,
    lowStockCount: 2,
  },
  factory: {
    id: 'FAC-587291',
    productsSupplied: 5,
  },
  shop: {
    id: 'SH-910238',
    activeOrders: 6,
  },
};

// --- ДОЧЕРНИЕ КОМПОНЕНТЫ САЙДБАРА ---

/**
 * Карточка, отображающая информацию о выбранном узле
 * или заглушку, если узел не выбран.
 */
function InfoCard({ node }: { node: NetworkNode | null }) {
  const setView = useNetworkStore((state) => state.setView);

  const renderContent = () => {
    // Сценарий 1: Узел не выбран
    if (!node) {
      return (
        <div className="flex h-[200px] flex-col items-center justify-center p-4 text-center text-muted-foreground">
          <Info className="mb-4 h-8 w-8" />
          <p className="font-medium">Элемент не выбран</p>
          <p className="text-sm">Нажмите на узел на графе, чтобы посмотреть информацию.</p>
        </div>
      );
    }

    // Сценарий 2: Узел выбран. Получаем данные по его типу.
    const specificData = mockNodeDataByType[node.type];

    let specificFields;
    switch (node.type) {
      case 'warehouse':
        specificFields = (
          <>
            <div className="flex justify-between">
              <span>ID:</span> <span className="font-medium">{specificData.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Общее кол-во товаров:</span>{' '}
              <span className="font-medium">{specificData.totalProducts} шт.</span>
            </div>
            <div className="flex justify-between">
              <span>Товаров с низким остатком:</span>{' '}
              <span className="font-medium text-orange-600">{specificData.lowStockCount} шт.</span>
            </div>
          </>
        );
        break;
      case 'factory':
        specificFields = (
          <>
            <div className="flex justify-between">
              <span>ID:</span> <span className="font-medium">{specificData.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Поставляемых товаров:</span>{' '}
              <span className="font-medium">{specificData.productsSupplied} шт.</span>
            </div>
          </>
        );
        break;
      case 'shop':
        specificFields = (
          <>
            <div className="flex justify-between">
              <span>ID:</span> <span className="font-medium">{specificData.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Активных заказов:</span>{' '}
              <span className="font-medium">{specificData.activeOrders} шт.</span>
            </div>
          </>
        );
        break;
    }

    return (
      <div className="p-4">
        <h3 className="font-semibold text-base">{node.data.label}</h3>
        <div className="mt-3 space-y-2">{specificFields}</div>
        <Separator className="my-4" />
        <Button
          variant="outline"
          className="w-full"
          // Кнопка активна только если выбран узел типа "shop"
          disabled={node.type !== 'shop'}
          onClick={() => setView('orders')}
        >
          Перейти к списку заказов
        </Button>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Информация о выбранном элементе</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0 text-sm">{renderContent()}</CardContent>
    </Card>
  );
}

/**
 * Карточка с легендой для графа.
 */
function LegendCard() {
  const legendItems = [
    { icon: <Warehouse className="h-5 w-5 text-blue-500" />, label: 'Склад' },
    { icon: <Factory className="h-5 w-5 text-green-500" />, label: 'Завод (Поставщик)' },
    { icon: <Store className="h-5 w-5 text-red-500" />, label: 'Магазин (Потребитель)' },
    { icon: <Minus className="h-5 w-5 text-gray-400" />, label: 'Связь/Маршрут' },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Легенда</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            {item.icon}
            <span className="text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/**
 * Карточка с фильтрами для управления видимостью узлов.
 */
function ControlsCard() {
  const { filters, toggleFilter } = useNetworkStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Управление отображением</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <h4 className="font-medium">Фильтры отображения</h4>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showFactories"
            checked={filters.showFactories}
            onCheckedChange={() => toggleFilter('showFactories')}
          />
          <Label htmlFor="showFactories" className="cursor-pointer">
            Показать Заводы
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showShops"
            checked={filters.showShops}
            onCheckedChange={() => toggleFilter('showShops')}
          />
          <Label htmlFor="showShops" className="cursor-pointer">
            Показать Магазины
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}

// --- ОСНОВНОЙ КОМПОНЕНТ САЙДБАРА ---

export function NodeSidebar() {
  const selectedNode = useNetworkStore((state) => state.selectedNode);

  return (
    <aside className="w-80 space-y-6">
      <InfoCard node={selectedNode} />
      <LegendCard />
      <ControlsCard />
    </aside>
  );
}
