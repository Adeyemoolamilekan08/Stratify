export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'supervisor' | 'manager';
  avatar?: string;
  plant?: string;
  shift?: string;
  permissions?: string[];
}
