// src/components/logistics/mock-data.ts
// Обновлено с реалистичными названиями компаний

import { Edge, MarkerType, Node } from '@xyflow/react';

// --- Списки названий ---

const factoryNames = [
  'Атлант-Спорт Производство', // из вашей БД
  'СпортТекс Групп', // из вашей БД
  'Экипировка Плюс', // из вашей БД
  'НоваСпортТрейд', // из вашей БД
  'ТекстильСпорт ООО', // из вашей БД
  'Актив-Синтез Пром', // новое название
];

const shopNames = [
  'CitySole Retail', // из вашей БД
  "Сеть магазинов 'Спортмастер'", // из вашей БД
  'Планета Фитнес', // новое название
  'Лига Спорта', // новое название
  'ProRunners', // новое название (для бегунов)
  'Urban Move', // новое название (городской стиль)
  'Точка Старта', // новое название
  'АктивСтиль', // новое название
  'Чемпион Маркет', // новое название
];

// --- Генерация узлов ---

const centralWarehouse: Node = {
  id: 'wh-center',
  type: 'warehouse',
  position: { x: 0, y: 0 },
  data: {
    label: 'Центральный Склад',
    // address: 'г. Москва, ул. Промышленная, д. 1',
    // inn: '7701123456',
    // lowStock: ['Кроссовки "Vector-X"', 'Футболка "DryFit-L"', 'Леггинсы "Flex-M"'],
  },
};

const factories: Node[] = Array.from({ length: 6 }, (_, i) => {
  const angle = (i / 6) * 2 * Math.PI;
  return {
    id: `factory-${i + 1}`,
    type: 'factory',
    position: {
      x: 450 * Math.cos(angle),
      y: 450 * Math.sin(angle),
    },
    data: {
      // label: factoryNames[i] || `Завод №${i + 1}`, // Используем новое название
      // address: `г. Тула, Заводское ш., д. ${i + 10}`,
      // inn: `71050${Math.floor(10000 + Math.random() * 90000)}`,
      // stock: Math.floor(Math.random() * 1000) + 100,
      label: factoryNames[i] || `Завод №${i + 1}`,
    },
  };
});

const shops: Node[] = Array.from({ length: 9 }, (_, i) => {
  const angle = (i / 9) * 2 * Math.PI;
  return {
    id: `shop-${i + 1}`,
    type: 'shop',
    position: {
      x: 800 * Math.cos(angle),
      y: 800 * Math.sin(angle),
    },
    data: {
      label: shopNames[i] || `Магазин №${i + 1}`, // Используем новое название
      address: `г. Москва, ул. Торговая, д. ${i + 25}`,
      inn: `77210${Math.floor(10000 + Math.random() * 90000)}`,
      orders: Math.floor(Math.random() * 200) + 20,
    },
  };
});

export const initialNodes: Node[] = [centralWarehouse, ...factories, ...shops];

// --- Генерация связей (остается без изменений) ---

const warehouseId = centralWarehouse.id;

const factoryEdges: Edge[] = factories.map((factory) => ({
  id: `edge-${warehouseId}-${factory.id}`,
  source: warehouseId,
  target: factory.id,
  type: 'floating',
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#b1b1b7',
  },
}));

const shopEdges: Edge[] = shops.map((shop) => ({
  id: `edge-${warehouseId}-${shop.id}`,
  source: warehouseId,
  target: shop.id,
  type: 'floating',
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#b1b1b7',
  },
}));

export const initialEdges: Edge[] = [...factoryEdges, ...shopEdges];
