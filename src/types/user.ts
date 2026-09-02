/** Users, roles and permissions (UI only — no real auth). */

export type UserRole = "customer" | "pharmacist" | "inventory-manager" | "admin";

export interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string | undefined;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: "active" | "inactive" | "blocked";
  joinedOn: string;
  addresses: Address[];
  totalOrders: number;
  lastOrderDate?: string | undefined;
}

export interface RoleDefinition {
  role: UserRole;
  label: string;
  description: string;
  permissions: string[];
}
