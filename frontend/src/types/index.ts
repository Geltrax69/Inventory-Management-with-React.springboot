export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  role: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  categoryName: string;
  price: number;
  status: string;
  createdAt: string;
}

export interface ProductRequest {
  name: string;
  sku?: string;
  barcode?: string;
  categoryId?: number;
  price: number;
  status?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Inventory {
  id: number;
  productId: number;
  productName: string;
  warehouseId: number;
  warehouseName: string;
  quantity: number;
  lowStockThreshold: number;
}

export interface TransactionRequest {
  productId: number;
  warehouseId: number;
  type: "IN" | "OUT" | "ADJUST";
  quantity: number;
}

export interface Supplier {
  id: number;
  name: string;
  contactInfo?: string;
}

export interface SalesOrder {
  id: number;
  customerName: string;
  totalAmount: number;
  date: string;
}

export interface PurchaseOrder {
  id: number;
  supplierName: string;
  status: string;
  totalAmount: number;
  date: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalRevenue: number;
  lowStockCount: number;
  activeOrders: number;
}
