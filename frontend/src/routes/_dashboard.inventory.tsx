import { createFileRoute } from "@tanstack/react-router";
import { useInventory, useInventoryTransaction } from "@/hooks/useInventory";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { TransactionRequest } from "@/types";
import { Plus, X } from "lucide-react";

export const Route = createFileRoute("/_dashboard/inventory")({
  component: InventoryPage,
});

function InventoryPage() {
  const { data: inventory, isLoading } = useInventory();
  const transaction = useInventoryTransaction();
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<TransactionRequest>();

  const onSubmit = (data: TransactionRequest) => {
    transaction.mutate(
      { ...data, productId: Number(data.productId), warehouseId: Number(data.warehouseId), quantity: Number(data.quantity) },
      { onSuccess: () => { setModalOpen(false); reset(); } }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} /> Stock Transaction
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Product</th>
              <th className="text-left px-4 py-3 font-medium">Warehouse</th>
              <th className="text-left px-4 py-3 font-medium">Quantity</th>
              <th className="text-left px-4 py-3 font-medium">Threshold</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t border-border">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              : inventory?.map((item) => (
                  <tr key={item.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{item.productName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.warehouseName}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.lowStockThreshold}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.quantity <= item.lowStockThreshold
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}>
                        {item.quantity <= item.lowStockThreshold ? "Low Stock" : "OK"}
                      </span>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Stock Transaction</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 hover:bg-accent rounded-md">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product ID</label>
                <input type="number" {...register("productId", { required: true })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Warehouse ID</label>
                <input type="number" {...register("warehouseId", { required: true })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select {...register("type", { required: true })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="IN">IN</option>
                  <option value="OUT">OUT</option>
                  <option value="ADJUST">ADJUST</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input type="number" {...register("quantity", { required: true })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)}
                  className="flex-1 py-2 border border-input rounded-md text-sm hover:bg-accent">
                  Cancel
                </button>
                <button type="submit" disabled={transaction.isPending}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50">
                  {transaction.isPending ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
