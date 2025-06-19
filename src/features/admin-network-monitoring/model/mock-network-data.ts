import { Edge, MarkerType } from '@xyflow/react';
import type { LogisticsNode } from './types';

const factoryNames = [
  'Атлант-Спорт',
  'СпортТекс',
  'Экипировка Плюс',
  'НоваСпорт',
  'ТекстильСпорт',
  'Актив-Синтез',
];
const shopNames = [
  'CitySole',
  'Спортмастер',
  'Планета Фитнес',
  'Лига Спорта',
  'ProRunners',
  'Urban Move',
  'Точка Старта',
  'Чемпион',
];

const centralWarehouse: LogisticsNode = {
  id: 'wh-center',
  type: 'warehouse',
  position: { x: 0, y: 0 },
  data: {
    id: '2621234',
    label: 'Центральный Склад',
    address: 'г. Москва, ул. Промышленная, д. 1',
    inn: '7701123456',
    totalStock: 36,
    lowStockCount: 3,
  },
};

const factories: LogisticsNode[] = factoryNames.map((name, i) => ({
  id: `factory-${i + 1}`,
  type: 'factory',
  position: {
    x: 350 * Math.cos(i * ((2 * Math.PI) / factoryNames.length)),
    y: 350 * Math.sin(i * ((2 * Math.PI) / factoryNames.length)),
  },
  data: {
    id: `F-00${i + 1}`,
    label: name,
    address: `г. Тула, Заводское ш., д. ${i + 10}`,
    inn: `71050${Math.floor(10000 + Math.random() * 90000)}`,
    activeDeliveries: Math.floor(Math.random() * 10) + 1,
  },
}));

const shops: LogisticsNode[] = shopNames.map((name, i) => ({
  id: `shop-${i + 1}`,
  type: 'shop',
  position: {
    x: 700 * Math.cos(i * ((2 * Math.PI) / shopNames.length)),
    y: 700 * Math.sin(i * ((2 * Math.PI) / shopNames.length)),
  },
  data: {
    id: `S-00${i + 1}`,
    label: name,
    address: `г. Москва, ул. Торговая, д. ${i + 25}`,
    inn: `77210${Math.floor(10000 + Math.random() * 90000)}`,
    activeOrders: Math.floor(Math.random() * 50) + 5,
  },
}));

export const initialNodes: LogisticsNode[] = [centralWarehouse, ...factories, ...shops];

const createEdges = (sourceId: string, targets: LogisticsNode[]): Edge[] => {
  return targets.map((target) => ({
    id: `edge-${sourceId}-${target.id}`,
    source: sourceId,
    target: target.id,
    type: 'straight',
    animated: false,
    style: { strokeDasharray: '5,5', stroke: '#a1a1aa' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#a1a1aa', width: 15, height: 15 },
  }));
};

export const initialEdges: Edge[] = [
  ...createEdges(centralWarehouse.id, factories),
  ...createEdges(centralWarehouse.id, shops),
];
