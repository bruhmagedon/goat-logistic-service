// src/components/custom-nodes/CustomNode.tsx

import { Card, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { Factory, Store, Warehouse } from 'lucide-react';

// Определяем соответствие типов узлов иконкам и стилям
const nodeConfig = {
  warehouse: {
    Icon: Warehouse,
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    borderColor: 'border-blue-500',
  },
  factory: {
    Icon: Factory,
    bgColor: 'bg-green-100 dark:bg-green-900',
    borderColor: 'border-green-500',
  },
  shop: {
    Icon: Store,
    bgColor: 'bg-red-100 dark:bg-red-900',
    borderColor: 'border-red-500',
  },
};

export const CustomNode = ({ data, type }: NodeProps) => {
  const config = nodeConfig[type] || nodeConfig.warehouse;

  return (
    <Card className={`w-48 ${config.bgColor} ${config.borderColor} border-2`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <config.Icon className="h-5 w-5" />
          {data.label}
        </CardTitle>
      </CardHeader>
      {/* Ручки для соединений. Все узлы могут быть источником и целью. */}
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="target" position={Position.Top} id="b" />
    </Card>
  );
};
