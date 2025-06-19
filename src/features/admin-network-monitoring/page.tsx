import { AnimatePresence, motion } from 'framer-motion';
import { NodeOrdersList } from './compose/NodeOrdersList';
import { LogisticsGraph } from './compose/graph';
import { NodeSidebar } from './compose/info-sidebar';
import { useNetworkStore } from './model/store';

function NetworkMonitoringPage() {
  const currentView = useNetworkStore((state) => state.currentView);

  return (
    <>
      <div className="border-b pb-3">
        <h1 className="font-bold text-2xl text-foreground">Мониторинг логистической сети</h1>
      </div>
      <div className="grid h-[calc(100vh-120px)] grid-cols-[320px_1fr] gap-6 pt-4">
        {/* Левая колонка - Сайдбар (без изменений) */}
        <div className="sticky top-0 h-full">
          <NodeSidebar />
        </div>

        {/* Правая колонка - Анимированная область */}
        <div className="relative h-full">
          {/* AnimatePresence отслеживает появление и исчезновение дочерних элементов */}
          <AnimatePresence mode="wait">
            {currentView === 'graph' && (
              <motion.div
                key="graph" // Уникальный ключ обязателен для AnimatePresence
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="h-full w-full"
              >
                <LogisticsGraph />
              </motion.div>
            )}

            {currentView === 'orders' && (
              <motion.div
                key="orders" // Уникальный ключ обязателен для AnimatePresence
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="h-full w-full"
              >
                <NodeOrdersList />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export const Component = NetworkMonitoringPage;
