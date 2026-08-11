import { MachineStatus, ShopfloorStats } from '../types/live-shopfloor.types';

// Generate 49 machines
const machineNames = [
  'LI-43-OM-910', 'LI-44-OM-920', 'LI-45-OM-930', 'LI-46-OM-940', 'LI-47-OM-950',
  'LI-48-OM-960', 'LI-49-OM-970', 'LI-50-OM-980', 'LI-51-OM-990', 'LI-52-OM-1000',
  'LI-53-OM-1010', 'LI-54-OM-1020', 'LI-55-OM-1030', 'LI-56-OM-1040', 'LI-57-OM-1050',
  'LI-58-OM-1060', 'LI-59-OM-1070', 'LI-60-OM-1080', 'LI-61-OM-1090', 'LI-62-OM-1100',
  'LI-63-OM-1110', 'LI-64-OM-1120', 'LI-65-OM-1130', 'LI-66-OM-1140', 'LI-67-OM-1150',
  'LI-68-OM-1160', 'LI-69-OM-1170', 'LI-70-OM-1180', 'LI-71-OM-1190', 'LI-72-OM-1200',
  'LI-73-OM-1210', 'LI-74-OM-1220', 'LI-75-OM-1230', 'LI-76-OM-1240', 'LI-77-OM-1250',
  'LI-78-OM-1260', 'LI-79-OM-1270', 'LI-80-OM-1280', 'LI-81-OM-1290', 'LI-82-OM-1300',
  'LI-83-OM-1310', 'LI-84-OM-1320', 'LI-85-OM-1330', 'LI-86-OM-1340', 'LI-87-OM-1350',
  'LI-88-OM-1360', 'LI-89-OM-1370', 'LI-90-OM-1380', 'LI-91-OM-1390'
];

const products = ['Widget A', 'Widget B', 'Widget C', 'Widget D', 'Widget E', 'Widget F', 'Widget G', 'Widget H'];
const operators = ['Mike Johnson', 'Sarah Smith', 'Tom Wilson', 'Emma Davis', 'James Brown', 'Lisa Anderson', 'Robert Taylor', 'Maria Garcia'];

export const generateMachines = (): MachineStatus[] => {
  return machineNames.map((name, index) => {
    // All machines start as idle (hatch color)
    const status = 'idle';
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomOperator = operators[Math.floor(Math.random() * operators.length)];
    
    return {
      id: `M-${String(index + 1).padStart(3, '0')}`,
      name: name,
      status: status as 'operating' | 'stopped' | 'idle' | 'maintenance' | 'setup',
      currentProduct: status === 'idle' ? undefined : randomProduct,
      operator: status === 'idle' ? undefined : randomOperator,
      efficiency: status === 'idle' ? undefined : 85 + Math.floor(Math.random() * 15),
      productionRate: status === 'idle' ? undefined : 100 + Math.floor(Math.random() * 200),
      lastUpdate: new Date(),
      shift: ['A', 'B', 'C'][Math.floor(Math.random() * 3)] as 'A' | 'B' | 'C',
      color: '#000000', // Black background for all cards
    };
  });
};

export const mockShopfloorStats: ShopfloorStats = {
  totalMachines: 49,
  operating: 0,
  stopped: 0,
  idle: 49,
  maintenance: 0,
  setup: 0,
  overallEfficiency: 0,
  productionRate: 0,
  activeOperators: 0,
  shift: 'A',
  lastUpdated: new Date(),
};

// Initial mock data - all idle
export const initialMachines = generateMachines();

// Function to simulate random status changes
export const simulateStatusChange = (machines: MachineStatus[]): MachineStatus[] => {
  return machines.map(machine => {
    // 10% chance of status change
    if (Math.random() < 0.1) {
      const statuses: ('operating' | 'stopped' | 'idle' | 'maintenance' | 'setup')[] = 
        ['operating', 'stopped', 'idle', 'maintenance', 'setup'];
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      const products = ['Widget A', 'Widget B', 'Widget C', 'Widget D', 'Widget E'];
      const operators = ['Mike Johnson', 'Sarah Smith', 'Tom Wilson', 'Emma Davis', 'James Brown'];
      
      return {
        ...machine,
        status: newStatus,
        currentProduct: newStatus === 'idle' ? undefined : products[Math.floor(Math.random() * products.length)],
        operator: newStatus === 'idle' ? undefined : operators[Math.floor(Math.random() * operators.length)],
        efficiency: newStatus === 'idle' ? undefined : 85 + Math.floor(Math.random() * 15),
        productionRate: newStatus === 'idle' ? undefined : 100 + Math.floor(Math.random() * 200),
        lastUpdate: new Date(),
      };
    }
    return machine;
  });
};