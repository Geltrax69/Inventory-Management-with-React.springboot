import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import type { ProductRequest } from "@/types";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAll().then((r) => r.data),
  });

export const useProduct = (id: number) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: () => productService.getById(id).then((r) => r.data),
    enabled: !!id,
  });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductRequest) =>
      productService.create(data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductRequest }) =>
      productService.update(id, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};
