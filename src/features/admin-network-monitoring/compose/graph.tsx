'use client';

import type { Viewport } from '@xyflow/react';
import { Background, Controls, Node, ReactFlow } from '@xyflow/react';
import { useCallback, useMemo } from 'react';

import '@xyflow/react/dist/style.css';
import { useNetworkStore } from '../model/store';
import { NetworkNode } from '../model/types';
import { CustomNode } from './custom-node';
import { initialEdges, initialNodes } from './mock-data';

const initialViewport: Viewport = { x: 0, y: 0, zoom: 0.7 };

export function LogisticsGraph() {
  const { selectNode, filters } = useNetworkStore();

  const nodeTypes = useMemo(
    () => ({
      warehouse: CustomNode,
      factory: CustomNode,
      shop: CustomNode,
    }),
    [],
  );

  // Фильтруем узлы и связи на основе состояния в сторе
  const filteredNodes = useMemo(() => {
    return initialNodes.filter((node) => {
      if (node.type === 'factory' && !filters.showFactories) return false;
      if (node.type === 'shop' && !filters.showShops) return false;
      return true;
    });
  }, [filters]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      selectNode(node as NetworkNode);
    },
    [selectNode],
  );

  // Сброс выбора при клике на фон
  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  return (
    <div className="h-full w-full rounded-lg border bg-background">
      <ReactFlow
        nodes={filteredNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        defaultViewport={initialViewport}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
}
