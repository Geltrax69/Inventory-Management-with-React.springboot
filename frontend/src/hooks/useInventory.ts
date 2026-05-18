import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { inventoryService } from "@/services/inventory.service";
import type { TransactionRequest } from "@/types";

export const useInventory = () =>
  useQuery({
    queryKey: ["inventory"],
    queryFn: () => inventoryService.getAll().then((r) => r.data),
  });

export const useLowStock = () =>
  useQuery({
    queryKey: ["inventory", "low-stock"],
    queryFn: () => inventoryService.getLowStock().then((r) => r.data),
  });

export const useInventoryTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: TransactionRequest) =>
      inventoryService.createTransaction(data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
  });
};
