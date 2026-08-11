import { create } from 'zustand';

interface MachineState {
  selectedMachine: string | null;
  setSelectedMachine: (id: string | null) => void;
  filters: {
    status?: string;
    search?: string;
    plant?: string;
    shift?: string;
  };
  setFilters: (filters: any) => void;
  clearFilters: () => void;
}

export const useMachineStore = create<MachineState>((set) => ({
  selectedMachine: null,
  filters: {},
  setSelectedMachine: (id) => set({ selectedMachine: id }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  clearFilters: () => set({ filters: {} }),
}));
