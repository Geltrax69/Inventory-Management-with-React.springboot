import api from "@/lib/axios";
import type { Product, ProductRequest } from "@/types";

export const productService = {
  getAll: () => api.get<Product[]>("/api/products"),
  getById: (id: number) => api.get<Product>(`/api/products/${id}`),
  create: (data: ProductRequest) => api.post<Product>("/api/products", data),
  update: (id: number, data: ProductRequest) =>
    api.put<Product>(`/api/products/${id}`, data),
};
