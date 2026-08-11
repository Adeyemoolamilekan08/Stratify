// Base entity with common fields
export interface BaseEntity {
  id: string;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Machine
export interface Machine extends BaseEntity {
  type: 'production' | 'assembly' | 'packaging' | 'quality';
  plantId: string;
  plantName?: string;
  model: string;
  serialNumber: string;
  installationDate: Date;
  lastMaintenanceDate?: Date;
  status: 'active' | 'maintenance' | 'idle' | 'retired';
  specifications?: Record<string, any>;
}

// Product
export interface Product extends BaseEntity {
  category: 'raw' | 'wip' | 'finished' | 'consumable';
  unit: 'pcs' | 'kg' | 'liters' | 'meters' | 'hours';
  weight?: number;
  dimensions?: string;
  material?: string;
  supplierId?: string;
  supplierName?: string;
  reorderLevel?: number;
}

// Operator
export interface Operator extends BaseEntity {
  employeeId: string;
  department: 'production' | 'quality' | 'maintenance' | 'logistics';
  position: string;
  shiftPreference?: 'A' | 'B' | 'C';
  skills: string[];
  certifications: string[];
  contactNumber: string;
  email: string;
  joinDate: Date;
}

// Plant
export interface Plant extends BaseEntity {
  location: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  manager: string;
  timezone: string;
}

// Shift
export interface Shift extends BaseEntity {
  timeStart: string;
  timeEnd: string;
  code: 'A' | 'B' | 'C';
  supervisors: string[];
  maxOperators: number;
}

// Reason Code
export interface ReasonCode extends BaseEntity {
  category: 'downtime' | 'quality' | 'rejection' | 'rework' | 'scrap';
  priority: 'low' | 'medium' | 'high' | 'critical';
  requiresApproval: boolean;
  responsibleDepartment?: string;
}

// Entity Types for the UI
export type EntityType = 'machines' | 'products' | 'operators' | 'plants' | 'shifts' | 'reason-codes';

export const entityConfigs: Record<EntityType, {
  label: string;
  icon: any;
  fields: string[];
}> = {
  machines: {
    label: 'Machines',
    icon: 'Cog6ToothIcon',
    fields: ['code', 'name', 'type', 'model', 'status', 'plantId']
  },
  products: {
    label: 'Products',
    icon: 'CubeIcon',
    fields: ['code', 'name', 'category', 'unit', 'weight', 'supplierId']
  },
  operators: {
    label: 'Operators',
    icon: 'UsersIcon',
    fields: ['code', 'name', 'employeeId', 'department', 'position', 'shiftPreference']
  },
  plants: {
    label: 'Plants',
    icon: 'BuildingOfficeIcon',
    fields: ['code', 'name', 'location', 'city', 'state', 'country']
  },
  shifts: {
    label: 'Shifts',
    icon: 'ClockIcon',
    fields: ['code', 'name', 'timeStart', 'timeEnd', 'maxOperators']
  },
  'reason-codes': {
    label: 'Reason Codes',
    icon: 'DocumentTextIcon',
    fields: ['code', 'name', 'category', 'priority', 'requiresApproval']
  }
};

export interface MasterDataFilters {
  search?: string;
  isActive?: boolean;
  type?: string;
  category?: string;
  status?: string;
  department?: string;
}