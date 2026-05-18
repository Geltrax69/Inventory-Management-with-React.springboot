import api from "@/lib/axios";
import type { Inventory, TransactionRequest } from "@/types";

export const inventoryService = {
  getAll: () => api.get<Inventory[]>("/api/inventory"),
  getLowStock: () => api.get<Inventory[]>("/api/inventory/low-stock"),
  createTransaction: (data: TransactionRequest) =>
    api.post("/api/inventory/transaction", data),
};
