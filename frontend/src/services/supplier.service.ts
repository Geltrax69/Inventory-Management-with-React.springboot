import api from "@/lib/axios";
import type { Supplier } from "@/types";

export const supplierService = {
  getAll: () => api.get<Supplier[]>("/api/suppliers"),
  create: (data: Omit<Supplier, "id">) => api.post<Supplier>("/api/suppliers", data),
};
