import { create } from 'zustand';
import type { NetworkNode } from './types';

type NetworkView = 'graph' | 'orders';

interface NetworkState {
  selectedNode: NetworkNode | null;
  currentView: NetworkView; // НОВОЕ: отслеживает текущий вид
  filters: {
    showFactories: boolean;
    showShops: boolean;
  };
  selectNode: (node: NetworkNode | null) => void;
  toggleFilter: (filter: keyof NetworkState['filters']) => void;
  setView: (view: NetworkView) => void; // НОВОЕ: экшен для смены вида
}

export const useNetworkStore = create<NetworkState>((set) => ({
  selectedNode: null,
  currentView: 'graph',
  filters: {
    showFactories: true,
    showShops: true,
  },
  selectNode: (node) => set({ selectedNode: node }),
  toggleFilter: (filter) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [filter]: !state.filters[filter],
      },
    })),
  setView: (view) => set({ currentView: view }),
}));
